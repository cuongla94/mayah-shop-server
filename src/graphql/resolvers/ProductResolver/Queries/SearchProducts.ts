import { Document } from 'mongodb';
import Logger from '../../../../loaders/logger'; // Adjust the import path for your Logger
import { redisClient } from '../../../../services';

export const searchProducts = async (_, { searchTerm, filter, limit, offset }, { db }) => {
  const query: Document = { $and: [] };

  if (filter) {
    const { productType, gender } = filter;

    if (productType) {
      query.$and.push({ "productDetails.productType": productType });
    }

    if (gender && gender !== "All") {
      query.$and.push({ "productDetails.productGender": gender });
    }
  }

  if (searchTerm) {
    query.$and.push({
      $or: [
        { "productDetails.productBrand": { $regex: searchTerm, $options: 'i' } },
        { "productDetails.productName": { $regex: searchTerm, $options: 'i' } },
        { "productDetails.productGender": { $regex: searchTerm, $options: 'i' } }
      ]
    });
  }

  if (query.$and.length === 0) {
    delete query.$and;
  }

  const cacheKey = `search:${searchTerm}:${JSON.stringify(filter)}:${limit}:${offset}`;

  try {
    const cachedProducts = await redisClient.get(cacheKey);
    if (cachedProducts) {
      Logger.info('Serving search results from cache');
      return JSON.parse(cachedProducts);
    }
  } catch (error: any) {
    Logger.error('Error retrieving search results from Redis:', error.message);
  }

  const totalCount = await db.collection('products').countDocuments(query);
  const products = await db.collection('products')
    .find(query, {
      projection: {
        _id: 1,
        uniqueId: 1,
        productSourceUrl: 1,
        productDetails: {
          productName: 1,
          productBrand: 1,
          productGender: 1,
          productType: 1,
          productImage: 1,
          productSizeAvailable: 1,
          productRetailPrice: 1,
          productDiscountPrice: 1,
          productSubType: 1,
          productSKU: 1,
          productUPC: 1,
          productStockQuantity: 1,
          productInStock: 1,
          productCurrency: 1,
          productShippingCost: 1,
          productPriceHistory: 1
        }
      }
    })
    .skip(offset || 0)
    .limit(limit || 10)
    .toArray();

  const productBrandCounts = await db.collection('products').aggregate([
    { $match: query },
    { $group: { _id: "$productDetails.productBrand", count: { $sum: 1 } } },
    { $project: { productBrand: "$_id", count: 1, _id: 0 } }
  ]).toArray();

  const result = {
    products: products.map(product => ({
      id: product._id.toString(),
      uniqueId: product.uniqueId,
      productSourceUrl: product.productSourceUrl,
      productDetails: product.productDetails,
    })),
    totalCount,
    productBrandCounts: productBrandCounts.map(brand => ({ count: brand.count }))
  };

  try {
    await redisClient.set(cacheKey, JSON.stringify(result), {
      EX: 300,
    });
    Logger.info('Search results cached successfully');
  } catch (error: any) {
    Logger.error('Error caching search results in Redis:', error.message);
  }

  return result;
};

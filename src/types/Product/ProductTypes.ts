import { IProductGender, IProductType, IProductSubType, IProductCurrency } from './ProductEnums';

export interface IProductPriceHistory {
    price: string;
    date: Date;
}

export interface IProductDetails {
    productName: string;
    productBrand: string;
    productSizeAvailable?: string;
    productDiscountPrice?: string;
    productRetailPrice: string;
    productLink?: string;
    productImage?: string;
    productGender: IProductGender;
    productType: IProductType;
    productSubType?: IProductSubType;
    productSKU: string;
    productUPC: string;
    productStockQuantity: number;
    productInStock: boolean;
    productCurrency: IProductCurrency;
    productShippingCost?: string;
    productRetailer: string;
    priceHistory: IProductPriceHistory[];
}

export interface IProduct {
    uniqueId: string;
    productSourceUrl: string;
    productDetails: IProductDetails;
}

export interface IProductBrandCount {
    productBrand: string;
    count: number;
}

export interface IProductSourceCount {
    productRetailer: string;
    count: number;
}

export interface IProductResponse {
    products: IProduct[];
    totalCount: number;
    brandCounts: IProductBrandCount[];
    sourceCounts: IProductSourceCount[];
}

export interface IProductDetailsDocument extends IProductDetails, Document {}
export interface IProductDocument extends IProduct, Document {}

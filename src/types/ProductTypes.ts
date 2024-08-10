// enums
export enum IProductGender {
    male = 'male',
    female = 'female',
    unisex = 'unisex'
}

export enum IProductType {
    haircare = 'haircare',
    fragrances = 'fragrances',
    makeup = 'makeup',
    skincare = 'skincare',
    body_and_bath = 'body_and_bath'
}

export enum IProductSubType {
    // Haircare
    shampoo = 'shampoo',
    conditioner = 'conditioner',
    hairOil = 'hair_oil',
    hairMask = 'hair_mask',
    hairSerum = 'hair_serum',
    hairStyling = 'hair_styling',

    // Fragrances
    perfume = 'perfume',
    eauDeParfum = 'eau_de_parfum',
    eauDeToilette = 'eau_de_toilette',
    eauDeCologne = 'eau_de_cologne',
    bodyMist = 'body_mist',

    // Makeup
    foundation = 'foundation',
    concealer = 'concealer',
    blush = 'blush',
    bronzer = 'bronzer',
    highlighter = 'highlighter',
    mascara = 'mascara',
    eyeshadow = 'eyeshadow',
    lipstick = 'lipstick',
    lipGloss = 'lip_gloss',
    eyeliner = 'eyeliner',

    // Skincare
    facialCleanser = 'facial_cleanser',
    facialMoisturizer = 'facial_moisturizer',
    facialSerum = 'facial_serum',
    facialToner = 'facial_toner',
    facialMask = 'facial_mask',
    eyeCream = 'eye_cream',
    sunscreen = 'sunscreen',

    // Body and Bath (Bodycare)
    bodyLotion = 'body_lotion',
    bodyWash = 'body_wash',
    bodyScrub = 'body_scrub',
    bodyButter = 'body_butter',
    deodorant = 'deodorant',
    bathOil = 'bath_oil',
    bathSalt = 'bath_salt',
    bathBomb = 'bath_bomb',
    bubbleBath = 'bubble_bath',
    handCream = 'hand_cream',
    footCream = 'foot_cream'
}

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
    priceHistory: IProductPriceHistory[]; 
}

export interface IProduct {
    uniqueId: string;
    productSource: string;
    productSourceUrl: string;
    productDetails: IProductDetails;
}

export interface IProductBrandCount {
    productBrand: string;
    count: number;
}

export interface IProductSourceCount {
    productSource: string;
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

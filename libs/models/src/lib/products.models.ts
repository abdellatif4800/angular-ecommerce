export interface IProduct {
  _id: string;
  productName: string;
  price: number;
  stock: number;
  subCategoryID: string;
  imageUrl: string,
  subCategoryName: string;
  publish: boolean;
  creatdAt: string; // or Date if you convert it
}

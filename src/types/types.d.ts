interface ProductType {
  brand: string;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  photo: string;
  price: string;
  updatedAt: string;
}

interface ProductData {
  amount: number;
  productInfo: ProductType;
}

interface ProductsInCart {
  [key: string]: ProductData;
}

interface CartType {
  count: number;
  total: number;
  products: ProductsInCart;
}

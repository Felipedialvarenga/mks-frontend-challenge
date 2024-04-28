import React from "react";
import styles from "./Product.module.scss";
import Image from "next/image";
import PriceTag from "../PriceTag/PriceTag";

type Props = {
  productData: ProductType;
  addToCart: (product: ProductType) => void;
};

export default function Product({ productData, addToCart }: Props) {
  const addProductToCart = () => {
    addToCart(productData);
  };
  return (
    <div className={styles.productBox} data-testid="product">
      <div className={styles.container}>
        <div className={styles.productImage}>
          <Image
            src={productData.photo}
            alt="picture of the product"
            fill={true}
            objectFit="contain"
          />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productName}>{productData.name}</div>
          <PriceTag productPrice={productData.price} />
        </div>
        <div className={styles.productDescription}>
          <p>{productData.description}</p>
        </div>
      </div>

      <div className={styles.buyButton} onClick={addProductToCart}>
        <div className={styles.shoppingBagIcon}>
          <Image src="/shoppingBag.svg" alt="shopping bag icon" fill={true} />
        </div>
        <p>COMPRAR</p>
      </div>
    </div>
  );
}

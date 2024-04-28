import React from "react";
import styles from "./PriceTag.module.scss";

type Props = {
  productPrice: string;
  cartTag?: boolean;
};

export default function PriceTag({ productPrice, cartTag }: Props) {
  if (cartTag) {
    return (
      <div className={styles.cartProductPrice}>
        <p>R${productPrice.slice(0, -3)}</p>
      </div>
    );
  }

  return (
    <div className={styles.productPrice}>
      <p>R${productPrice.slice(0, -3)}</p>
    </div>
  );
}

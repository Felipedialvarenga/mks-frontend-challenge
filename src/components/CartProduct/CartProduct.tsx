import React from "react";
import styles from "./CartProduct.module.scss";
import Image from "next/image";
import CloseIcon from "../CloseIcon/CloseIcon";
import PriceTag from "../PriceTag/PriceTag";

type Props = {
  product: ProductData;
  removeProductFromCart: (productToAdd: ProductType, all?: boolean) => void;
  addProductToCart: (productToAdd: ProductType) => void;
};

export default function CartProduct({
  product,
  removeProductFromCart,
  addProductToCart,
}: Props) {
  const removeProduct = (all: boolean) => {
    removeProductFromCart(product.productInfo, all);
  };

  return (
    <div className={styles.container} data-testid="cart-product">
      <div className={styles.productImage}>
        <Image
          src={product.productInfo.photo}
          alt="image of the product"
          fill={true}
          objectFit="contain"
        />
      </div>
      <div className={styles.productName}>{product.productInfo.name}</div>
      <div className={styles.productCounterPrice}>
        <div className={styles.productCounter}>
          <p>Qtd</p>
          <div className={styles.counter}>
            <div
              className={styles.counterButton}
              onClick={() => removeProduct(false)}
              data-testid="remove-button"
            >
              -
            </div>
            <div className={styles.counterAmount}>{product.amount}</div>
            <div
              className={styles.counterButton}
              onClick={() => addProductToCart(product.productInfo)}
              data-testid="add-button"
            >
              +
            </div>
          </div>
        </div>
        <PriceTag productPrice={product.productInfo.price} cartTag={true} />
      </div>

      <div className={styles.removeButton} onClick={() => removeProduct(true)}>
        <div className={styles.biggerScreensIcon}>
          <CloseIcon style="small" />
        </div>
        <div className={styles.smallerScreensIcon}>x</div>
      </div>
    </div>
  );
}

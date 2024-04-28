import React from "react";
import styles from "./CartButton.module.scss";
import Image from "next/image";

type Props = {
  showCart: () => void;
  cartAmount: number;
};

export default function CartButton({ showCart, cartAmount }: Props) {
  return (
    <div
      className={styles.cartButton}
      onClick={showCart}
      data-testid="cart-button"
    >
      <div className={styles.cartIcon}>
        <Image src="./cart.svg" fill={true} alt="cart icon" />
      </div>
      <p>{cartAmount}</p>
    </div>
  );
}

"use client";
import React, { use, useState } from "react";
import { motion } from "framer-motion";
import styles from "./CartMenu.module.scss";
import CloseIcon from "../CloseIcon/CloseIcon";
import CartProduct from "../CartProduct/CartProduct";

type Props = {
  x: number;
  closeCart: () => void;
  cartArray: ProductData[];
  cartPrice: number;
  removeProductFromCart: (productToAdd: ProductType, all?: boolean) => void;
  addProductToCart: (productToAdd: ProductType) => void;
  clearCart: () => void;
};

export default function CartMenu({
  x,
  closeCart,
  cartArray,
  cartPrice,
  removeProductFromCart,
  addProductToCart,
  clearCart,
}: Props) {
  return (
    <motion.aside
      className={styles.cartContainer}
      animate={{ x }}
      initial={{ x: 500 }}
      transition={{
        ease: "linear",
        duration: 0.15,
      }}
      data-testid="menu"
    >
      <div className={styles.topCart}>
        <p>Carrinho de compras</p>
        <div onClick={closeCart} data-testid="close-cart-button">
          <CloseIcon style="regular" />
        </div>
      </div>
      <div className={styles.products}>
        {cartArray.map((product) => (
          <CartProduct
            key={product.productInfo.id}
            product={product}
            removeProductFromCart={removeProductFromCart}
            addProductToCart={addProductToCart}
          />
        ))}
      </div>
      <div className={styles.totalPrice}>
        <p>Total:</p>
        <p>R${cartPrice}</p>
      </div>
      <div
        className={styles.bottomCart}
        onClick={clearCart}
        data-testid="clear-cart-button"
      >
        Finalizar Compra
      </div>
    </motion.aside>
  );
}

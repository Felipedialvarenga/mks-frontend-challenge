import React from "react";
import styles from "./Product.module.scss";
import Image from "next/image";
import PriceTag from "../PriceTag/PriceTag";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductSkeleton() {
  return (
    <div className={styles.productBox}>
      <div className={styles.container}>
        <div className={styles.productImage}>
          <Skeleton height={120} width={"100%"} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productName}>
            <Skeleton height={42} width={128} borderRadius={100} />
          </div>
          <Skeleton height={26} width={64} />
        </div>
        <div className={styles.productDescription}>
          <Skeleton height={12} width={150} borderRadius={100} />
          <Skeleton height={12} width={100} borderRadius={100} />
        </div>
      </div>

      <div className={styles.buyButton}>
        <div className={styles.shoppingBagIcon}>
          <Image src="/shoppingBag.svg" alt="shopping bag icon" fill={true} />
        </div>
        <p>COMPRAR</p>
      </div>
    </div>
  );
}

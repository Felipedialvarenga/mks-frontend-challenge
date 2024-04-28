"use client";
import Logo from "@/components/Logo/Logo";
import styles from "./page.module.css";
import CartButton from "@/components/CartButton/CartButton";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/util/fetchProducts";
import ProductSkeleton from "@/components/ProductSkeleton/ProductSkeleton";
import Product from "@/components/Product/Product";
import CartMenu from "@/components/CartMenu/CartMenu";

const initialCartState: CartType = {
  count: 0,
  total: 0,
  products: {},
};

export default function Home() {
  const [x, setX] = useState(500);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [cartState, setCartState] = useState<CartType>(initialCartState);

  const addToCart = (productToAdd: ProductType) => {
    const productId = productToAdd.id;
    const isInCart = Object.keys(cartState.products).includes(
      productId.toString()
    );

    if (isInCart) {
      setCartState((prevState) => {
        prevState.products[productId].amount++;
        prevState.count++;
        prevState.total += +productToAdd.price;
        return {
          count: prevState.count,
          total: prevState.total,
          products: prevState.products,
        };
      });
    } else {
      setCartState((prevState) => {
        prevState.products[productId] = {
          amount: 1,
          productInfo: productToAdd,
        };
        prevState.count++;
        prevState.total += +productToAdd.price;
        return {
          count: prevState.count,
          total: prevState.total,
          products: prevState.products,
        };
      });
    }
  };

  const removeFromCart = (productToAdd: ProductType, all?: boolean) => {
    const productId = productToAdd.id;
    const isInCart = Object.keys(cartState.products).includes(
      productId.toString()
    );

    if (isInCart) {
      if (all) {
        setCartState((prevState) => {
          prevState.count -= prevState.products[productId].amount;
          prevState.total -=
            prevState.products[productId].amount * +productToAdd.price;
          delete prevState.products[productId];
          return {
            count: prevState.count,
            total: prevState.total,
            products: prevState.products,
          };
        });
      } else {
        setCartState((prevState) => {
          if (prevState.products[productId].amount > 1) {
            prevState.products[productId].amount--;
          } else {
            delete prevState.products[productId];
          }
          prevState.count--;
          prevState.total -= +productToAdd.price;
          return {
            count: prevState.count,
            total: prevState.total,
            products: prevState.products,
          };
        });
      }
    }
  };

  const clearCart = () => {
    setCartState({ count: 0, total: 0, products: {} });
  };

  const showCart = () => {
    setX(0);
  };

  const closeCart = () => {
    setX(500);
  };

  const cartProductsArray = Object.keys(cartState.products).map(
    (prodKey) => cartState.products[prodKey]
  );

  return (
    <div className={styles.pageContainer}>
      <CartMenu
        x={x}
        cartPrice={cartState.total}
        removeProductFromCart={removeFromCart}
        addProductToCart={addToCart}
        clearCart={clearCart}
        closeCart={closeCart}
        cartArray={cartProductsArray}
      />
      <header className={styles.header} data-testid="header">
        <Logo />
        <CartButton showCart={showCart} cartAmount={cartState.count} />
      </header>
      <main className={styles.main} data-testid="main">
        <div className={styles.productsContainer}>
          {isLoading &&
            Array.from(Array(8).keys()).map((prod, i) => (
              <ProductSkeleton key={i} />
            ))}
          {isSuccess &&
            data.products.map((product: ProductType) => (
              <Product
                key={product.id}
                productData={product}
                addToCart={addToCart}
              />
            ))}
        </div>
      </main>
      <footer className={styles.footer} data-testid="footer">
        MKS sistemas © Todos os direitos reservados
      </footer>
    </div>
  );
}

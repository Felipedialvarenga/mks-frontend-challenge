import Home from "@/app/page";
import Product from "@/components/Product/Product";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import testImage from "./testimage.png";
import CartButton from "@/components/CartButton/CartButton";
import CartMenu from "@/components/CartMenu/CartMenu";
import CartProduct from "@/components/CartProduct/CartProduct";

const renderPage = () => {
  render(
    <ReactQueryProvider>
      <Home />
    </ReactQueryProvider>
  );
};

const mockProduct: ProductType = {
  id: 8,
  name: "Headset Cloud Stinger",
  brand: "HyperX",
  description:
    "O HyperX Cloud Stinger™ é o headset ideal para jogadores que procuram leveza e conforto, qualidade de som superior e maior praticidade.",
  photo:
    "https://mks-sistemas.nyc3.digitaloceanspaces.com/products/hyperxcloudstinger.webp",
  price: "600.00",
  createdAt: "2023-10-30T16:25:01.093Z",
  updatedAt: "2023-10-30T16:25:01.093Z",
};

describe("App Page", () => {
  it("should render the page", () => {
    renderPage();
  });

  it("should render the header", () => {
    renderPage();

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should render the main content", () => {
    renderPage();

    expect(screen.getByTestId("main")).toBeInTheDocument();
  });

  it("should render the footer", () => {
    renderPage();

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should render the cart menu", () => {
    renderPage();

    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });

  it("should call showCart when cart button is clicked", () => {
    const mockShowCart = jest.fn();
    render(<CartButton showCart={mockShowCart} cartAmount={0} />);

    const button = screen.getByTestId("cart-button");
    fireEvent.click(button);

    expect(mockShowCart).toHaveBeenCalled();
  });

  describe("Cart Menu", () => {
    const mockCloseCart = jest.fn();
    const mockClearCart = jest.fn();
    const mockRemoveProductFromCart = jest.fn();
    const mockAddProductToCart = jest.fn();

    const renderCartMenu = () => {
      render(
        <CartMenu
          x={0}
          cartPrice={0}
          cartArray={[]}
          closeCart={mockCloseCart}
          clearCart={mockClearCart}
          addProductToCart={mockAddProductToCart}
          removeProductFromCart={mockRemoveProductFromCart}
        />
      );
    };

    it("should call closeCart when close button is clicked", () => {
      renderCartMenu();

      const button = screen.getByTestId("close-cart-button");
      fireEvent.click(button);

      expect(mockCloseCart).toHaveBeenCalled();
    });

    it("should call clearCart when clear button is clicked", () => {
      renderCartMenu();

      const button = screen.getByTestId("clear-cart-button");
      fireEvent.click(button);

      expect(mockClearCart).toHaveBeenCalled();
    });

    describe("CartProduct Component", () => {
      const renderCartProduct = () => {
        render(
          <CartProduct
            product={{ amount: 1, productInfo: mockProduct }}
            addProductToCart={mockAddProductToCart}
            removeProductFromCart={mockRemoveProductFromCart}
          />
        );
      };

      it("should call addProductToCart when the + button is clicked", () => {
        renderCartProduct();

        const button = screen.getByTestId("add-button");
        fireEvent.click(button);

        expect(mockAddProductToCart).toHaveBeenCalled();
      });

      it("should call removeProductFromCart when the - button is clicked", () => {
        renderCartProduct();

        const button = screen.getByTestId("remove-button");
        fireEvent.click(button);

        expect(mockRemoveProductFromCart).toHaveBeenCalled();
      });
    });
  });

  describe("Product Component", () => {
    const mockAddToCart = jest.fn();

    it("should call addToCart when button is clicked", () => {
      render(<Product productData={mockProduct} addToCart={mockAddToCart} />);

      const button = screen.getAllByText("COMPRAR");
      fireEvent.click(button[0]);

      expect(mockAddToCart).toHaveBeenCalled();
    });
  });
});

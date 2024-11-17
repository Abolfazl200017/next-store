"use client";

import { Product } from "@/services/api/types";
import useBasketStore from "@/store/basketStore";
import ProductListActionsView from "./ProductListActionsView";
import SingleProductActionsView from "./SingleProductActionsView";
  
const ProductActionsContainer = ({
  product,
  type = "list",
  isVertical = false,
}: {
  product: Product;
  type?: "list" | "single";
  isVertical?: boolean;
}) => {

  const { products, addProduct, updateProductQuantity, removeProduct } =
    useBasketStore();

  const isProductInBasket = products.some((p) => p.id === product.id);
  const handleAddToBasket = () => {
    if (!isProductInBasket) {
      addProduct(product, 1);
    }
  };
  const getQuantity = () => {
    const index: number = products.findIndex((p) => p.id === product.id);
    if (index === -1) return 0;
    else return products[index].quantity;
  };

  const increaseQuantity = () => {
    const quantity: number = getQuantity();
    updateProductQuantity(product.id.toString(), quantity + 1);
  };

  const decreaseQuantity = () => {
    const quantity: number = getQuantity();
    if (quantity <= 1) removeProduct(product.id.toString());
    else updateProductQuantity(product.id.toString(), quantity - 1);
  };

  
  return (
    <>
      {type === "list" ? (
        <ProductListActionsView
          decreaseQuantity={decreaseQuantity}
          getQuantity={getQuantity}
          handleAddToBasket={handleAddToBasket}
          increaseQuantity={increaseQuantity}
          isProductInBasket={isProductInBasket}
          isVertical={isVertical}
        />
      ) : (
        <SingleProductActionsView
          decreaseQuantity={decreaseQuantity}
          getQuantity={getQuantity}
          handleAddToBasket={handleAddToBasket}
          increaseQuantity={increaseQuantity}
          isProductInBasket={isProductInBasket}
          isVertical={isVertical}
        />
      )}
    </>
  );
};

export default ProductActionsContainer;

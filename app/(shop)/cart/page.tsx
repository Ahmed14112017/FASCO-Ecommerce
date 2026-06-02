"use client";

import { useAppSelector } from "@/lib/hooks/Hooks";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  console.log(cartItems);

  return (
    <div>
      {cartItems ? (
        cartItems.map((item) => (
          <p key={item._id}>
            {item.name} - {item.quantity}
          </p>
        ))
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}

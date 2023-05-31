import { useContext } from "react"
import { CartContext } from "../pages/ProductPage"
import CartItem from "./CartItem"

function Cart() {
  const { cartItem } = useContext(CartContext)

  return (
    <div className="cart-items">
      {cartItem.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
    </div>
  )
}

export default Cart

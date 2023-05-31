import { useContext } from "react"
import { CartContext } from "../pages/ProductPage"

function CartItem({ item }) {
  const { setCartItem, cartItem } = useContext(CartContext)

  const increase = (id) => {
    setCartItem(cartItem.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const decrease = (id) => {
    setCartItem(
      cartItem.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    )
  }

  const calcPrice = (item) => {
    return item.quantity * item.price
  }

  const removeFromCart = (id) => {
    const updateCart = cartItem.filter((item) => item.id !== id)
    setCartItem(updateCart)
  }

  return (
    <div className="cart-item">
      <div className="cart-img">
        <img src={item.img} alt="product" />
      </div>
      <div className="cart-middle">
        <p className="cart-name">
          {item.description} (Quantity: {item.quantity})
        </p>
        <div className="cart-btns">
          <button onClick={() => decrease(item.id)}>-</button>
          <p className="quantity">{item.quantity}</p>
          <button onClick={() => increase(item.id)}>+</button>
        </div>
      </div>
      <div className="cart-right">
        <p className="cart-price">${calcPrice(item)}.00</p>
        <i onClick={() => removeFromCart(item.id)} className="fa-sharp fa-solid fa-xmark"></i>
      </div>
    </div>
  )
}

export default CartItem

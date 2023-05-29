import { useContext, useEffect, useState } from "react"
import { CartContext } from "../pages/ProductPage"

function CartItem() {
  const [quantity, setQuantity] = useState(1)
  const { cartItem, setCartItem } = useContext(CartContext)

  // const increase = () => {
  //   if (quantity >= 1) {
  //     setQuantity(quantity + 1)
  //   }
  // }
  const increase = (id) => {
    setCartItem(cartItem.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  // const decrease = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1)
  //   }
  // }
  const decrease = (id) => {
    setCartItem(
      cartItem.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    )
  }

  const calcPrice = (quantity, item) => {
    return quantity * item
  }

  const [deleteItem, setDeleteItem] = useState(cartItem)
  // v1
  // const removeFromCart = (id) => {
  //   const updateCart = cartItem.filter((item) => item.id !== id)
  //   setDeleteItem(updateCart)
  //   const json = JSON.stringify(cartItem.id)
  //   localStorage.removeItem("cartItem", json)
  // }
  // v2
  // const removeFromCart = (id) => {
  //   setCartItem((prev) => prev.filter((item) => item.id !== id))
  // }
  const removeFromCart = (id) => {
    const updateCart = cartItem.filter((item) => item.id !== id)
    setCartItem(updateCart)
  }

  useEffect(() => {
    setCartItem(deleteItem)
  }, [deleteItem, setCartItem])

  return (
    <>
      {cartItem.map((item, id) => (
        <div key={id} className="cart-item">
          <div className="cart-img">
            <img src={item.img} alt="product" />
          </div>
          <div className="cart-middle">
            <p className="cart-name">{item.description}</p>
            <div className="cart-btns">
              {/* <button onClick={decrease}>-</button>
              <p className="quantity">{quantity}</p>
              <button onClick={increase}>+</button> */}
              <button onClick={() => decrease(item.id)}>-</button>
              <p className="quantity">{item.quantity}</p>
              <button onClick={() => increase(item.id)}>+</button>
            </div>
          </div>
          <div className="cart-right">
            <p className="cart-price">${calcPrice(quantity, item.price)}.00</p>
            <i onClick={() => removeFromCart(item.id)} className="fa-sharp fa-solid fa-xmark"></i>
          </div>
        </div>
      ))}
    </>
  )
}

export default CartItem

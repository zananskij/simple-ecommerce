import { Link } from "react-router-dom"
import CartItem from "./CartItem"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../pages/ProductPage"
import EmptyCart from "./EmptyCart"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function CartWithItems() {
  const { cartItem, setCartItem, setCart } = useContext(CartContext) // add setCart here

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const newTotalPrice = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotalPrice(newTotalPrice)
  }, [cartItem])

  async function handleCheckout() {
    const response = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItem }),
    })

    const { sessionId } = await response.json()

    const stripe = await stripePromise
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

  return (
    <>
      <div className="full-cart-div">
        <div className="full-cart">
          {cartItem.map((item) => (
            <CartItem key={item.id} item={item} setCartItem={setCartItem} />
          ))}
        </div>
      </div>
      <div className="subtotal-div">
        <div className="sub-right">
          <p>Subtotal</p>
          <p className="total-price">${totalPrice + ".00"}</p>
        </div>
        <div className="sub-left">
          <div className="atc-buy">
            <button className="atc-btn checkout-btn" onClick={() => setCart(false)}>
              Return
            </button>
            <button className="buy-btn checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartWithItems

import "./Navbar.css"
import LogoImg2 from "../img/shopify-logo.png"

import { Link } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import CartWithItems from "./CartWithItems"
import EmptyCart from "./EmptyCart"
import { CartContext } from "../pages/ProductPage"

function Navbar() {
  // states for sticky navbar, mobile navigation, and the cart
  const [sticky, setSticky] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  // Get cartItem, cart, setCart from the CartContext using useContext
  const { cartItem, cart, setCart } = useContext(CartContext)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    // Adding the event listener:
    window.addEventListener("scroll", handleScroll)

    // Returning a cleanup function to remove the event listener:
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []) // The empty array as a second argument means this effect runs once on mount and cleanup on unmount

  // v333

  // toggles the state of the cart open/close
  const openCart = () => {
    setCart(!cart)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <div className={`mobile-nav-full ${mobileNav ? "open-flex" : "closed-flex"}`}>
        <i onClick={() => setMobileNav(!mobileNav)} className="fa-sharp fa-solid fa-xmark"></i>
        <div className="mobile-links">
          <Link onClick={() => setMobileNav(!mobileNav)} to="/categories/all">
            categories
          </Link>
          <Link onClick={() => setMobileNav(!mobileNav)} to="/categories/lamps">
            lamps
          </Link>
          <Link onClick={() => setMobileNav(!mobileNav)} to="/categories/product/19">
            product page
          </Link>
        </div>
      </div>

      {/* overlay */}
      <div onClick={openCart} className={`page-overlay ${cart ? "open-flex" : "closed-flex"}`}></div>

      {/* cart */}
      <div className={`cart-div ${cart ? "open-cart" : "closed-cart"}`}>
        <div className="cart-title-btn">
          <h2 className="cart-full-h2">Your Shopping Cart ({cartItem.length})</h2>
          <i onClick={openCart} className="fa-sharp fa-solid fa-xmark"></i>
        </div>

        <div className="cart-body">{cartItem.length < 1 ? <EmptyCart openCart={openCart} /> : <CartWithItems />}</div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className={`nav-container ${sticky ? "cont-sticky" : ""}`}>
            <Link to="/">
              <img onClick={scrollToTop} src={LogoImg2} alt="logo" className="logo-img" />
            </Link>
            <div className="nav-links">
              <Link onClick={() => window.scrollTo(0, 0)} to="/categories/all">
                categories
              </Link>
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`fa-solid fa-cart-shopping ${cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"}`}
              ></i>
            </div>
            <div className="hamburger-menu">
              <i
                data-array-length={cartItem.length}
                onClick={openCart}
                className={`fa-solid fa-cart-shopping hamburger-cart ${
                  cartItem.length < 1 ? "cart-icon" : "cart-icon with-items"
                }`}
              ></i>
              <i onClick={() => setMobileNav(!mobileNav)} className="fa-solid fa-bars hamburger-hamb"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

import { createContext, useContext, useState } from "react"
import "../components/ProductPage.css"
import { items } from "../components/AllData"
import TrendingSlider from "../components/TrendingSlider"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { useParams } from "react-router"

export const CartContext = createContext()

function ProductPage() {
  // using useParams hook to get the product id from the route parameters
  const { id } = useParams()
  // filter the items array to get the item with the id ==== to the id from the route parameters
  const item = items.filter((item) => item.id === parseInt(id))

  // quantity + image states
  const [quantity, setQuantity] = useState(1)
  const [image, setImage] = useState(item[0].img)

  // getting the addToCart function from the CartContext using useContext hook
  const { addToCart } = useContext(CartContext)

  // change the image when mouse is over the image
  const changeImage = (e) => {
    setImage(e.target.src)
  }

  // function to increase quantity
  const increase = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1)
    }
  }

  // function to decrease quantity, but not less than 1
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // function to calculate the total price
  const calcPrice = (quantity) => {
    return quantity * item[0].price
  }

  // state for the popup notification
  const [notify, setNotify] = useState(false)

  // function to toggle the notification state
  const showNotify = () => {
    setNotify(!notify)
  }

  return (
    <>
      <div onAnimationEnd={() => setNotify(false)} className={`notify ${notify ? "slide-in" : ""}`}>
        <p>Item has been added to the cart &nbsp; ✅</p>
      </div>

      <div className="product-page-div">
        <div className="container">
          <div className="product-div">
            <h3 className="product-big-name">{item[0].description}</h3>
            <div className="product-left">
              <div className="big-img">
                <img src={image} alt="product" />
              </div>
              <div className="small-imgs">
                <img onMouseOver={changeImage} src={item[0].img} alt="product" />
                <img onMouseOver={changeImage} src={item[0].otherImgs[0]} alt="product" />
                <img onMouseOver={changeImage} src={item[0].otherImgs[1]} alt="product" />
              </div>
            </div>
            <div className="product-right">
              <p className="product-spec">{item[0].specs}</p>
              <div className="product-quant">
                <p>Quantity</p>
                <div className="product-btns">
                  <button onClick={decrease}>-</button>
                  <p className="quantity">{quantity}</p>
                  <button onClick={increase}>+</button>
                </div>
                <p className="product-price">${calcPrice(quantity)}.00</p>
              </div>
              <div className="atc-buy">
                <button
                  onClick={() => {
                    addToCart({ ...item[0], quantity })
                    showNotify()
                  }}
                  className="atc-btn"
                >
                  add to cart
                </button>
                <button className="buy-btn">buy now</button>
              </div>
            </div>
          </div>

          <div className="specifications">
            <div className="spec">
              <p className="spec-title">Texture:</p>
              <p className="title-desc">{item[0].texture}</p>
            </div>
            <div className="spec">
              <p className="spec-title">Weight:</p>
              <p className="title-desc">{item[0].weight}</p>
            </div>
            <div className="spec">
              <p className="spec-title">Size:</p>
              <p className="title-desc">{item[0].size}</p>
            </div>
          </div>
        </div>
        <TrendingSlider />
        <Newsletter />
        <Footer />
      </div>
    </>
  )
}

export default ProductPage

import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Categories from "./pages/Categories"
import All from "./components/Categories-pages/All"
import Storage from "./components/Categories-pages/Storage"
import Electronics from "./components/Categories-pages/Electronics"
import Lamps from "./components/Categories-pages/Lamps"
import Kitchen from "./components/Categories-pages/Kitchen"
import Chairs from "./components/Categories-pages/Chairs"
import ProductPage, { CartContext } from "./pages/ProductPage"
import { useEffect, useState } from "react"

function App() {
  // cart
  const [cartItem, setCartItem] = useState([])

  const addToCart = (newItem) => {
    setCartItem((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)

      if (existingItem) {
        // If the item is already in the cart, increase the quantity
        return prevItems.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // If the item is not in the cart, add it
        return [...prevItems, { ...newItem, quantity: 1 }]
      }
    })
  }

  // local storage
  useEffect(() => {
    const json = localStorage.getItem("cartItem")
    const savedCart = JSON.parse(json)
    if (savedCart) {
      setCartItem(savedCart)
    }
  }, [])
  // dependency array is empty so this effect runs only once when loaded

  // saving cart items to local storage whenever cartItem changes
  useEffect(() => {
    const json = JSON.stringify(cartItem)
    localStorage.setItem("cartItem", json)
  }, [cartItem])

  return (
    // wrap everything w/ context so that cartItem & addToCart are avail to all child components
    <CartContext.Provider value={{ cartItem, addToCart, setCartItem }}>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />

        <Route path="categories" element={<Categories />}>
          <Route path="all" element={<All />} />
          <Route path="storage" element={<Storage />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="lamps" element={<Lamps />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="chairs" element={<Chairs />} />
        </Route>
        <Route path="categories/product/:id" element={<ProductPage />} />
      </Routes>
    </CartContext.Provider>
  )
}

export default App

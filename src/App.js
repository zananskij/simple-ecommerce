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
  // v1
  // const addToCart = (item) => {

  //   setCartItem([...cartItem, item])
  // }
  // v2
  // const addToCart = (item) => {
  //   const existingItem = cartItem.find((i) => i.id === item.id)

  //   if (existingItem) {
  //     setCartItem(cartItem.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)))
  //   } else {
  //     setCartItem([...cartItem, item])
  //   }
  // }
  // v3
  // const addToCart = (item) => {
  //   const existingItem = cartItem.find((cartItem) => cartItem.id === item.id)

  //   if (existingItem) {
  //     setCartItem(
  //       cartItem.map((cartItem) =>
  //         cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
  //       )
  //     )
  //   } else {
  //     setCartItem([...cartItem, { ...item, quantity: 1 }])
  //   }
  // }
  const addToCart = (item) => {
    setCartItem((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
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

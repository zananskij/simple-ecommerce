import { useNavigate } from "react-router-dom"

function Success() {
  const navigate = useNavigate()

  const handleContinueShopping = () => {
    navigate("/")
  }

  return (
    <div className="success-page">
      <h1>Your payment was successful!</h1>
      <button onClick={handleContinueShopping}>Continue Shopping</button>
    </div>
  )
}

export default Success

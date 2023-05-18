import ProductItem from "./ProductItem"
import "./BestProducts.css"
function BestProducts() {
  // best selling section
  return (
    <div className="best-container">
      <h2 className="container best-h2">Best Selling </h2>
      <div className="container">
        <div className="products-grid">
          <ProductItem />
        </div>
      </div>
    </div>
  )
}

export default BestProducts

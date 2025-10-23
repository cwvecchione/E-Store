import { Link } from "react-router-dom"
import { useCart } from "../../../context";
import PropTypes from "prop-types";

export const CartCard = ({product}) => {

  CartCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      poster: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  };

  const { removeFromCart } = useCart();

  return (
    <div className="card card-compact card-bordered bg-base-100 max-w-4xl m-auto p-2 mb-5">
      <div className="card-body p-3 flex flex-row items-center justify-between">
        <div className="flex items-center">
            <Link to={`products/${product.id}`}>
            <img className="w-32 rounded-box-sm" src={product.poster} alt={product.name} />
          </Link>
          <div className="ml-4">
            <Link to={`products/${product.id}`}>
              <p className="text-lg">{product.name}</p>
            </Link>
            <button onClick={() => removeFromCart(product)} className="btn btn-ghost btn-sm text-error mt-2">Remove</button>
          </div>
        </div>
        <div className="text-lg">
          <span>${product.price}</span>
        </div>
      </div>
    </div>
  )
}

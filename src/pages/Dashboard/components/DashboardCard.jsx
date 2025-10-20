import { Link } from "react-router-dom"
import PropTypes from "prop-types";

export const DashboardCard = ({order}) => {
    DashboardCard.propTypes = {
        order: PropTypes.shape({
            id: PropTypes.number.isRequired,
            amount_paid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            cartList: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    poster: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                })
            ).isRequired,
        }).isRequired,
    };

    return (
        <div className="card card-compact card-bordered bg-base-100 max-w-4xl m-auto p-2 mb-5">
            <div className="card-body p-3">
                <div className="flex justify-between text-sm m-2 font-bold">
                    <span>Order Id: {order.id}</span>
                    <span>Total: ${order.amount_paid}</span>
                </div>
                { order.cartList.map((product) => (
                <div key={product.id} className="flex flex-wrap justify-between max-w-4xl m-auto p-2 my-5 ">
                    <div className="flex">
                        <Link to={`/products/${product.id}`}>
                            <img className="w-32 rounded-box-sm" src={product.poster} alt={product.name} />
                        </Link>
                        <div className="ml-3">
                            <Link to={`/products/${product.id}`}>
                                <p className="text-lg">{product.name}</p>
                            </Link>
                            <div className="text-lg m-2">
                                <span>${product.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )) }
            </div>
        </div>
    )
}

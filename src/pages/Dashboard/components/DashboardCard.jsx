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
        <div className="max-w-4xl m-auto p-2 mb-5 border dark:border-slate-700">
            <div className="flex justify-between text-sm m-2 font-bold dark:text-slate-200">
                <span>Order Id: {order.id}</span>
                <span>Total: ${order.amount_paid}</span>
            </div>
            { order.cartList.map((product) => (
                <div key={product.id} className="flex flex-wrap justify-between max-w-4xl m-auto p-2 my-5 ">
                    <div className="flex">
                        <Link to={`/products/${product.id}`}>
                            <img className="w-32 rounded-sm" src={product.poster} alt={product.name} />
                        </Link>
                        <div className="">
                            <Link to={`/products/${product.id}`}>
                                <p className="text-lg ml-2 dark:text-slate-200">{product.name}</p>
                            </Link>
                            <div className="text-lg m-2 dark:text-slate-200">
                                <span>${product.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )) }
        </div>
    )
}

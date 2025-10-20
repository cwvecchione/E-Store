import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../../context";
import { createOrder, getUser } from "../../../services";
import PropTypes from "prop-types";

export const Checkout = ({setCheckout}) => {
    Checkout.propTypes = {
        setCheckout: PropTypes.func.isRequired,
    };
    const { cartList, total, clearCart } = useCart();
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            try{
                const data = await getUser();
                setUser(data);
            } catch(error){
                toast.error(error.message, { closeButton: true, position: "bottom-center" });
            }        
        }
        fetchData();
    }, []);

    async function handleOrderSubmit(event){
        event.preventDefault();
        try {
            const data = await createOrder(cartList, total, user);
            clearCart();
            navigate("/order-summary", { state: {data: data, status: true} });
        } catch(error) {
            toast.error(error.message, { closeButton: true, position: "bottom-center" });
            navigate("/order-summary", { state: {status: false} });
        }
    }

    return (
        <section>
            <input type="checkbox" id="checkout-modal" className="modal-toggle" checked={true} readOnly />
            <div className="modal modal-open">
                <div className="modal-box relative">
                    <button onClick={() => setCheckout(false)} type="button" className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2">✕</button>
                    <h3 className="mb-4 text-xl font-medium">
                        <i className="bi bi-credit-card mr-2"></i>CARD PAYMENT
                    </h3>
                    <form onSubmit={handleOrderSubmit} className="space-y-4" >
                        <div>
                            <label htmlFor="name" className="label"><span className="label-text">Name:</span></label>
                            <input type="text" name="name" id="name" className="input input-bordered w-full" value={user.name || "Undefined"} disabled required />
                        </div>
                        <div>
                            <label htmlFor="email" className="label"><span className="label-text">Email:</span></label>
                            <input type="text" name="email" id="email" className="input input-bordered w-full" value={user.email || "backup@example.com"} disabled required />
                        </div>
                        <div>
                            <label htmlFor="card" className="label"><span className="label-text">Card Number:</span></label>
                            <input type="number" name="card" id="card" className="input input-bordered w-full" value="4215625462597845" disabled required />
                        </div>
                        <div className="flex gap-3">
                            <div className="w-1/3">
                                <label className="label"><span className="label-text">Month</span></label>
                                <input type="number" name="month" id="month" className="input input-bordered w-full" value="03" disabled required />
                            </div>
                            <div className="w-1/3">
                                <label className="label"><span className="label-text">Year</span></label>
                                <input type="number" name="year" id="year" className="input input-bordered w-full" value="27" disabled required />
                            </div>
                            <div className="w-1/3">
                                <label className="label"><span className="label-text">Code</span></label>
                                <input type="number" name="code" id="code" className="input input-bordered w-full" value="523" disabled required />
                            </div>
                        </div>
                        <p className="mb-4 text-2xl font-semibold text-lime-500 text-center">
                            ${total}
                        </p>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary w-full"> <i className="mr-2 bi bi-lock-fill"></i>PAY NOW</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

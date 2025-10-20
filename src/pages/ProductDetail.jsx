import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTitle } from "../hooks/useTitle";
import { Rating } from "../components";
import { useCart } from "../context";
import { getProduct } from "../services";

export const ProductDetail = () => {
  const { cartList, addToCart, removeFromCart } = useCart();
  const [inCart, setInCart] = useState(false);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useTitle(product.name);
  
  useEffect(() => {
    async function fetchProducts(){
      try{
        const data = await getProduct(id);
        setProduct(data);
      } catch(error){
        toast.error(error.message, {closeButton: true, position: "bottom-center" });
      }      
    }
    fetchProducts();
  }, [id]);

  useEffect(() => {
    const productInCart = cartList.find(item => item.id === product.id);

    if(productInCart){
        setInCart(true);
    } else {
        setInCart(false);
    }

  }, [cartList, product.id]);

  return (
    <main>
        <section>
          <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{product.name}</h1>
          <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{product.overview}</p>
          <div className="flex flex-wrap justify-around">
            <div className="max-w-xl my-3">
              <img className="rounded-box-sm" src={product.poster} alt={product.name} />
            </div>
            <div className="max-w-xl my-3">
              <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                <span className="mr-1">$</span>
                <span className="">{product.price}</span>
              </p>
              <p className="my-3"> 
                <span>
                  <Rating rating={product.rating} />
                </span>
              </p>
              <p className="my-4 select-none">
              { product.best_seller && <span className="badge badge-warning mr-2">BEST SELLER</span> }
              { product.in_stock && <span className="badge badge-success mr-2">INSTOCK</span> }
              { !product.in_stock && <span className="badge badge-error mr-2">OUT OF STOCK</span> }
              <span className="badge badge-info mr-2">{product.size} MB</span>
              </p>
              <p className="my-3">
              { !inCart && <button onClick={() => addToCart(product)} className={`btn btn-primary ${product.in_stock ? "" : "btn-disabled"}`} disabled={ product.in_stock ? false : true }>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button> } 
              { inCart && <button onClick={() => removeFromCart(product)} className={`btn btn-error ml-3 ${product.in_stock ? "" : "btn-disabled"}`}  disabled={ product.in_stock ? false : true }>Remove Item <i className="ml-1 bi bi-trash3"></i></button> }  
              </p>
              <p className="text-lg text-gray-900 dark:text-slate-200">
                {product.long_description}
              </p>
            </div>
          </div>
        </section>
      </main> 
  )
}

import { useFilter } from "../../../context";
import PropTypes from "prop-types";

export const FilterBar = ({setShow}) => {
  FilterBar.propTypes = {
    setShow: PropTypes.func.isRequired,
  };
  const {state, dispatch} = useFilter();

  return (
    <section className="filter">
        <div className="drawer drawer-mobile">
            <div className="drawer-side fixed z-40 h-screen p-5 bg-base-100 w-72 left-0 top-0">
                <h5 className="text-base font-semibold uppercase">Filters</h5>
                <button onClick={() => setShow(false)} type="button" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">✕</button>
                <div className="divider"></div>
            <div className="py-4 overflow-y-auto">
                <ul className="text-base-content">
                  <li className="mt-1 mb-5">
                    <p className="font-semibold my-1">Sort by</p>                      
                    <div className="form-control">
                        <label className="label cursor-pointer">
                          <input onChange={() => dispatch({type: "SORT_BY", payload: {sortBy: "lowtohigh"}})} checked={state.sortBy === "lowtohigh" || false} id="price-sort-1" type="radio" name="price-sort" className="radio radio-primary" />
                          <span className="label-text ml-2">Price - Low to High</span>
                        </label>
                        <label className="label cursor-pointer">
                          <input onChange={() => dispatch({type: "SORT_BY", payload: {sortBy: "hightolow"}})} checked={state.sortBy === "hightolow" || false} id="price-sort-2" type="radio" name="price-sort" className="radio radio-primary" />
                          <span className="label-text ml-2">Price - High to Low</span>
                        </label>
                    </div>
                  </li>
                  <li className="mt-1 mb-5">
                    <span className="font-semibold">Rating</span>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                          <input onChange={() => dispatch({type: "RATINGS", payload: {ratings: "4STARSABOVE"}})} checked={state.ratings === "4STARSABOVE" || false} id="rating-sort-1" type="radio" name="rating-sort" className="radio radio-primary" />
                          <span className="label-text ml-2">4 Stars & Above</span>
                        </label>
                        <label className="label cursor-pointer">
                          <input onChange={() => dispatch({type: "RATINGS", payload: {ratings: "3STARSABOVE"}})} checked={state.ratings === "3STARSABOVE" || false} id="rating-sort-2" type="radio" name="rating-sort" className="radio radio-primary" />
                          <span className="label-text ml-2">3 Stars & Above</span>
                        </label>
                        <label className="label cursor-pointer">
                          <input onChange={() => dispatch({type: "RATINGS", payload: {ratings: "2STARSABOVE"}})} checked={state.ratings === "2STARSABOVE" || false} id="rating-sort-3" type="radio" name="rating-sort" className="radio radio-primary" />
                          <span className="label-text ml-2">2 Stars & Above</span>
                        </label>
                        <label className="label cursor-pointer">
                          <input onChange={() => dispatch({type: "RATINGS", payload: {ratings: "1STARSABOVE"}})} checked={state.ratings === "1STARSABOVE" || false} id="rating-sort-4" type="radio" name="rating-sort" className="radio radio-primary" />
                          <span className="label-text ml-2">1 Stars & Above</span>
                        </label>
                    </div>
                  </li>
                  <li className="mt-1 mb-5">
                    <span className="font-semibold">Other Filters</span>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                          <input onChange={() => dispatch({type: "BEST_SELLER_ONLY", payload: {bestSellerOnly: !state.bestSellerOnly}})} checked={state.bestSellerOnly || false} id="best-seller" type="checkbox" className="checkbox checkbox-primary" />
                          <span className="label-text ml-2">Best Seller Only</span>
                        </label>
                        <label className="label cursor-pointer">
                          <input onChange={() => dispatch({type: "ONLY_IN_STOCK", payload: {onlyInStock: !state.onlyInStock}})} checked={state.onlyInStock || false} id="only-instock" type="checkbox" className="checkbox checkbox-primary" />
                          <span className="label-text ml-2">INSTOCK Only</span>
                        </label>
                    </div>
                  </li>
                  <li className="mt-1 mb-5 px-1">
                    <button onClick={() => dispatch({type: "CLEAR_FILTER"})} type="button" className="btn btn-outline">Clear Filter</button>
                  </li>
                </ul>
            </div>
        </div>
        </div>
    </section>
  )
}

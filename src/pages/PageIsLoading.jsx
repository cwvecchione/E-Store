import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const PageIsLoading = () => {
    useTitle("Page Is Loading");
    
    return (
        <main>
            <section className="flex flex-col justify-center px-2">
                <div className="flex flex-col items-center my-4">
                  <Skeleton count={5} />
                </div>
            </section>
        </main>
    )
}

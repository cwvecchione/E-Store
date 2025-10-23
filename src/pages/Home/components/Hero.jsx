import { Link } from "react-router-dom"

export const Hero = () => {
  return (
  <section className="flex flex-col lg:flex-row items-center">
        <div className="text my-5">
            <h1 className="text-5xl font-bold">The Ultimate eBook Store</h1>
      <p className="text-2xl my-7 px-1">We are the world&apos;s most popular and authoritative source for computer science ebooks. Find ratings and access to the newest books digitally.</p>
      <Link to="/products" type="button" className="btn btn-primary btn-md mr-2 mb-2">Explore eBooks</Link>
        </div>
    <div className="visual my-5 lg:max-w-xl">
      <img className="rounded-box max-h-full" src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=60" alt="CW E-Store Hero Section" />
        </div>
    </section>
  )
}

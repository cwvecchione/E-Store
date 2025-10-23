import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTitle } from "../hooks/useTitle";
import { login } from "../services";

export const Login = () => {
  useTitle("Login");
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  async function handleLogin(event){
    event.preventDefault();
    try{
      const authDetail = {
        email: email.current.value,
        password: password.current.value
      }
      const data = await login(authDetail);
      data.accessToken ? navigate("/products") : toast.error(data);
    } catch(error){
      toast.error(error.message, {closeButton: true, position: "bottom-center"});
    }
  }
  
  async function handleLoginGuest(){
    email.current.value = import.meta.env.VITE_APP_GUEST_LOGIN;
    password.current.value = import.meta.env.VITE_APP_GUEST_PASSWORD;
    try{
      const authDetail = {
        email: email.current.value,
        password: password.current.value
      }
      const data = await login(authDetail);
      data.accessToken ? navigate("/products") : toast.error(data);
    } catch(error){
      toast.error(error.message, {closeButton: true, position: "bottom-center"});
    }
  }

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">Login</p>
      </section>        
    <form onSubmit={handleLogin}>
      <div className="mb-6">
        <label htmlFor="email" className="label"><span className="label-text">Your email</span></label>
        <input ref={email} type="email" id="email" className="input input-bordered w-full" placeholder="bob@example.com" required autoComplete="off" />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="label"><span className="label-text">Your password</span></label>
        <input ref={password} type="password" id="password" className="input input-bordered w-full" required />
      </div>
      <button type="submit" className="btn btn-primary w-full sm:w-auto">Log In</button>
    </form>
    <button onClick={handleLoginGuest} className="btn btn-outline btn-primary mt-3 w-full sm:w-auto">Login As Guest</button>
    </main>
  )
}

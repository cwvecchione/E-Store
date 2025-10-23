import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTitle } from "../hooks/useTitle";
import { register } from '../services';

export const Register = () => {
  useTitle("Register");
  const navigate = useNavigate();

  async function handleRegister(event){
    event.preventDefault();
    try{
      const authDetail = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value
      }
      const data = await register(authDetail);
      data.accessToken ? navigate("/products") : toast.error(data);
    } catch(error){
      toast.error(error.message, {closeButton: true, position: "bottom-center"});
    }
  }

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">Register</p>
      </section>
    <form onSubmit={handleRegister}>
    <div className="mb-6">
        <label htmlFor="name" className="label"><span className="label-text">Your name</span></label>
        <input type="name" id="name" className="input input-bordered w-full" placeholder="Shubham Sarda" required autoComplete="off" />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="label"><span className="label-text">Your email</span></label>
        <input type="email" id="email" className="input input-bordered w-full" placeholder="shubham@example.com" required autoComplete="off" />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="label"><span className="label-text">Your password</span></label>
        <input type="password" id="password" className="input input-bordered w-full" required minLength="7" />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
    </main>
  )
}

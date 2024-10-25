import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../Context/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const LoginPage = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormInputs) => {
    loginUser(form.email, form.password);
  };

  return (
    <section className="container mx-auto my-12 min-h-[72vh] overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  ${
                  errors.email
                    ? "border-red-500 animate-pulse"
                    : "focus:ring focus:ring-primary focus:border-primary"
                }`}
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  ${
                  errors.email
                    ? "border-red-500 animate-pulse"
                    : "focus:ring focus:ring-primary focus:border-primary"
                }`}
                {...register("password")}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-offwhite hover:text-primary hover:border-primary transition-all duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
            <span className="block text-center mt-4 text-gray-600">- or -</span>
            <div>
              <Link
                to="/register"
                className="w-full text-center block px-4 py-2 bg-transparent text-primary rounded-md hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 ease-in-out"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

import { useState, useEffect } from "react";
import ApiConfig from "../../Services/ApiConfig";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      window.location = "/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email: email, password: password };

    ApiConfig.login(userData)
      .then(function (response) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        window.location = "/";
      })
      .catch(function (error) {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
          // setPassword("");
        } else {
          console.log(error);
        }
      })
      .finally(function () {});
  };

  return (
    <div className="w-full h-[77vh] px-16 py-10">
      <form onSubmit={handleSubmit} className="m-auto w-2/3">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Login
            </h2>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
                    placeholder="e.g john@mail.com"
                  />
                  {errors?.email
                    ? errors.email.map((errorMessage, index) => (
                        <div key={index} className="text-sm text-red-600 mt-1">
                          {errorMessage}
                        </div>
                      ))
                    : ""}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:outline-none sm:text-sm sm:leading-6"
                    placeholder="Type a strong password"
                  />
                  {errors?.password
                    ? errors.password.map((errorMessage, index) => (
                        <div key={index} className="text-sm text-red-600 mt-1">
                          {errorMessage}
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useMisStore from "../../store/mis-store";
import { gooeyToast } from "goey-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: null,
    password: null
  })
  const navigate = useNavigate()

  const actionLogin = useMisStore((state)=> state.actionLogin);

  const handleOnChange = (e)=> {
     setForm({
      ...form,
      [e.target.name]: e.target.value
     })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form)
      gooeyToast.success(res.data?.msg || "Welcome")
      if(res.data.user.role === "USER") {
        navigate('/user')
      } else {
        navigate('/admin')
      }
    } catch (err) {
      console.log(err.response?.data);
      gooeyToast.error(err.response?.data?.msg || "Server error")
    }

    
  }
  return (
    <div className="grid grid-cols-12 gap-3 max-w-2xl mx-auto">
      <div className="col-span-12 bg-white shadow-lg p-8 rounded-xl">
        <div className="flex flex-col gap-y-4">
          <div className="space-y-4">
            <p className="text-3xl font-extrabold">Login</p>
            <div className="border-b border-2 border-sky-400 w-16"></div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                <div className="col-span-12 grid gap-2 items-center">
                  <label
                    htmlFor="email"
                    className="col-span-1 text-md text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    className="border inline-block col-span-11 rounded-md border-gray-100 focus:outline-blue-100 py-2 px-3"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="col-span-12 grid gap-2 items-center">
                  <label
                    htmlFor="password"
                    className="col-span-1 text-md text-gray-500"
                  >
                    Password
                  </label>
                  <div className="relative col-span-11">
                    <input
                      onChange={handleOnChange}
                      type={showPassword ? "text" : "password"}
                      className="border inline-block w-full rounded-md border-gray-100 focus:outline-blue-100 py-2 px-3 duration-200"
                      name="password"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-300 hover:scale-95 active:scale-125 duration-200"
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="col-span-12 xl:col-span-2 bg-sky-200 text-sky-600 py-2 px-2 cursor-pointer rounded-lg font-medium hover:drop-shadow-xl hover:drop-shadow-sky-200"
                >
                  Login
                </button>
                <button
                  type="reset"
                  className="col-span-12 xl:col-span-2 bg-gray-200 text-gray-600 py-2 px-2 cursor-pointer rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

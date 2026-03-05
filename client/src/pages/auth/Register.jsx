import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
// import useMisStore from "../../store/mis-store";
import { gooeyToast } from "goey-toast";
import { listDepartments } from "../../apis/departments";
import { register } from "../../apis/users";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // const actionRegister = useMisStore((state) => state.actionRegister);
  const [departments, setDepartment] = useState([]);
  const [selectDept, setSelectDept] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getDepartment = async () => {
    try {
      const res = await listDepartments();
      setDepartment(res.data.departments);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    document.title = "Register | IT Assets System";
    getDepartment();
  }, []);

  const [form, setForm] = useState({
    empCode: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    departmentId: null,
    sectionId: null,
  });
  // empCode
  // firstname
  // lastname
  // sectionId
  // email
  // password

  const gooeyConfig = {
    showProgress: true,
    preset: "smooth",
    timing: {
      displayDuration: 4000,
    },
  };

  const handleOnChange = (e) => {
    if (e.target.name === "departmentId") {
      const dept = departments.find((d) => d.id === Number(e.target.value));
      setSelectDept(dept.sections);
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      return gooeyToast.error("Email is required", {
        description: (
          <strong className="text-md">Please enter your email</strong>
        ),
        ...gooeyConfig,
      });
    }

    if (!form.firstName || !form.lastName) {
      return gooeyToast.error("Your name is required", {
        description: (
          <strong className="text-md">
            Please enter your Firstname and Lastname
          </strong>
        ),
        ...gooeyConfig,
      });
    }

    if (!form.empCode) {
      return gooeyToast.error("Employee Code is required", {
        description: (
          <strong className="text-md">Please enter your Employee code</strong>
        ),
        ...gooeyConfig,
      });
    }

    if (form.password !== form.confirmPassword) {
      return gooeyToast.error("Password doesn't match", {
        description: (
          <strong className="text-md">
            Plase chech your password and confirm password
          </strong>
        ),
        ...gooeyConfig,
      });
    }

    if (!form.departmentId || !form.sectionId) {
      return gooeyToast.error("Department and Section is required", {
        description: (
          <strong className="text-md">
            Plase select your department and section
          </strong>
        ),
        ...gooeyConfig,
      });
    }

    try {
      const res = await register(form);
      if (res.data.ok) {
        gooeyToast.success("Great job!", {
          description: (
            <strong className="text-md">
              Register successfully, please login for request IT assets
            </strong>
          ),
          ...gooeyConfig,
        });

        navigate("/login");
      }
      console.log(res);
    } catch (err) {
      gooeyToast.error("Error", {
        description: (
          <strong className="text-md">
            {err.response?.data?.msg || "Plase try again"}
          </strong>
        ),
        ...gooeyConfig,
      });
    }
  };
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-12 sm:col-span-12 bg-white shadow-lg py-6 px-6 rounded-xl">
        <div className="flex flex-col gap-y-4">
          <div className="space-y-4">
            <p className="text-2xl font-medium">Register Form</p>
            <div className="border-b border-2 border-sky-400 w-16"></div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-12 gap-4">
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
                <div className="col-span-12 xl:col-span-3 grid gap-2 items-center">
                  <label htmlFor="firstName" className="text-md text-gray-500">
                    Employee ID
                  </label>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    className="border inline-block rounded-md border-gray-100 focus:outline-blue-100 py-2 px-3"
                    name="empCode"
                    placeholder="Enter your Employee ID"
                  />
                </div>
                <div className="col-span-12 xl:col-span-4 grid gap-2 items-center">
                  <label htmlFor="firstName" className="text-md text-gray-500">
                    Firstname
                  </label>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    className="border inline-block rounded-md border-gray-100 focus:outline-blue-100 py-2 px-3"
                    name="firstName"
                    placeholder="Enter your Firstname"
                  />
                </div>
                <div className="col-span-12 xl:col-span-5 grid gap-2 items-center">
                  <label htmlFor="lastName" className="text-md text-gray-500">
                    Lastname
                  </label>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    className="border inline-block rounded-md border-gray-100 focus:outline-blue-100 py-2 px-3"
                    name="lastName"
                    placeholder="Enter your Lastname"
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
                <div className="col-span-12 grid gap-2 items-center">
                  <label
                    htmlFor="confirmPassword"
                    className="col-span-1 text-md text-gray-500"
                  >
                    Repeat Password
                  </label>
                  <div className="relative col-span-11">
                    <input
                      onChange={handleOnChange}
                      type={showPassword ? "text" : "password"}
                      className="border inline-block w-full rounded-md border-gray-100 focus:outline-blue-100 py-2 px-3 duration-200"
                      name="confirmPassword"
                      placeholder="Confirm password"
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
                <div className="col-span-12 xl:col-span-6 grid gap-2 items-center">
                  <label htmlFor="lastName" className="text-md text-gray-500">
                    Department
                  </label>
                  <select
                    onChange={handleOnChange}
                    type="text"
                    className="border inline-block rounded-md border-gray-100 focus:outline-blue-100 py-2 px-3"
                    name="departmentId"
                  >
                    <option className="bg-gray-600 text-white" value="">
                      Select Department
                    </option>
                    {departments.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-12 xl:col-span-6 grid gap-2 items-center">
                  <label className="text-md text-gray-500">Section</label>
                  <select
                    onChange={handleOnChange}
                    className="border inline-block rounded-md border-gray-100 focus:outline-blue-100 py-2 px-3"
                    name="sectionId"
                  >
                    <option value="">
                      {form.departmentId === null
                        ? "No sections available"
                        : "Select Section"}
                    </option>
                    {selectDept ? (
                      selectDept.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No sections available
                      </option>
                    )}
                  </select>
                </div>
                <button
                  type="submit"
                  className="col-span-12 xl:col-span-2 bg-sky-200 text-sky-600 py-2 px-2 cursor-pointer rounded-lg font-medium hover:drop-shadow-xl hover:drop-shadow-sky-200"
                >
                  Register
                </button>
                <button
                  type="button"
                  className="col-span-12 xl:col-span-2 bg-gray-200 text-gray-600 py-2 px-2 cursor-pointer rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden sm:block duration-500 col-span-3 bg-white py-6 px-4 rounded-md">
        right
      </div>
    </div>
  );
};

export default Register;

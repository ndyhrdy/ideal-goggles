import { FC, useState } from "react";
import Head from "../components/Head";

const Register: FC = () => {
  const [data, setData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <>
      <Head title="Sign Up" />

      <div className="w-full max-w-xl mx-auto px-4 py-32">
        <h1 className="text-5xl text-primary-500 dark:text-primary-400 mb-4">
          Create your account.
        </h1>
        <p className="mb-8 dark:text-gray-300">
          Sign up to Univerxities to save favorites.
        </p>

        <div className="shadow bg-white dark:bg-gray-800 rounded-lg py-8">
          <form>
            <div className="mb-4 px-8 flex flex-col">
              <label
                htmlFor="email"
                className="text-gray-400 dark:text-gray-500 mb-1"
              >
                Email Address
              </label>
              <input
                autoFocus
                type="email"
                name="email"
                className="border rounded-md px-2 h-10 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
            </div>

            <div className="mb-4 px-8 flex flex-col">
              <label
                htmlFor="fullName"
                className="text-gray-400 dark:text-gray-500 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="border rounded-md px-2 h-10 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
                value={data.fullName}
                onChange={(e) => {
                  setData({ ...data, fullName: e.target.value });
                }}
              />
            </div>

            <div className="mb-4 px-8 flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-400 dark:text-gray-500 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border rounded-md px-2 h-10 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
            </div>

            <div className="mb-8 px-8 flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-gray-400 dark:text-gray-500 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="border rounded-md px-2 h-10 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
                value={data.confirmPassword}
                onChange={(e) => {
                  setData({ ...data, confirmPassword: e.target.value });
                }}
              />
            </div>

            <div className="px-8">
              <button
                type="submit"
                className="h-12 bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 text-lg text-white rounded-md px-8"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

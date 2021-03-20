import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios, { CancelTokenSource } from "axios";
import { registerUser } from "../lib/api";
import Alert from "../components/Alert";
import Head from "../components/Head";

const Register: FC = () => {
  const [data, setData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const cancelTokenSource = useRef<CancelTokenSource>(
    axios.CancelToken.source()
  ).current;

  const handleSubmit = useCallback(async () => {
    if (status !== "idle") {
      return Promise.resolve();
    }
    setError(null);
    setStatus("submitting");
    try {
      await registerUser(data, cancelTokenSource);
      router.push("/login");
    } catch (error) {
      setError(error.response?.data || error.message || error);
      setStatus("idle");
    }
  }, [router, data, status]);

  useEffect(() => {
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

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
          {!!error?.message && (
            <div className="px-8">
              <Alert type="danger">{error.message}</Alert>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
                disabled={status !== "idle"}
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
                disabled={status !== "idle"}
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
                disabled={status !== "idle"}
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
                disabled={status !== "idle"}
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
                disabled={status !== "idle"}
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

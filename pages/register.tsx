import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios, { CancelTokenSource } from "axios";
import { registerUser } from "../lib/api";
import Alert from "../components/Alert";
import FormField from "../components/FormField";
import FormInput from "../components/FormInput";
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
            <div className="mb-8">
              <FormField label="Email Address">
                <FormInput
                  autoFocus
                  type="email"
                  name="email"
                  disabled={status !== "idle"}
                  value={data.email}
                  onChangeText={(email) => {
                    setData({ ...data, email });
                  }}
                />
              </FormField>
              <FormField label="Full Name">
                <FormInput
                  type="text"
                  name="fullName"
                  disabled={status !== "idle"}
                  value={data.fullName}
                  onChangeText={(fullName) => {
                    setData({ ...data, fullName });
                  }}
                />
              </FormField>
              <FormField label="Password">
                <FormInput
                  type="password"
                  name="password"
                  disabled={status !== "idle"}
                  value={data.password}
                  onChangeText={(password) => {
                    setData({ ...data, password });
                  }}
                />
              </FormField>
              <FormField label="Confirm Password">
                <FormInput
                  type="password"
                  name="confirmPassword"
                  disabled={status !== "idle"}
                  value={data.confirmPassword}
                  onChangeText={(confirmPassword) => {
                    setData({ ...data, confirmPassword });
                  }}
                />
              </FormField>
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

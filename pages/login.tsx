import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios, { CancelTokenSource } from "axios";
import { authenticate } from "../lib/api";
import { useApp } from "../components/AppContext";
import Alert from "../components/Alert";
import FormField from "../components/FormField";
import FormInput from "../components/FormInput";
import Head from "../components/Head";

const Login: FC = () => {
  const router = useRouter();
  const { user, login } = useApp();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const cancelTokenSource = useRef<CancelTokenSource>(
    axios.CancelToken.source()
  ).current;

  const handleSubmit = useCallback(async () => {
    if (status !== "idle") {
      return Promise.resolve();
    }
    setStatus("submitting");
    setError(null);
    try {
      const user = await authenticate(data, cancelTokenSource);
      login(user);
    } catch (error) {
      setError(error);
      setStatus("idle");
    }
  }, [status, data, login]);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [router, user]);

  return (
    <>
      <Head title="Log In" />
      <div className="w-full max-w-xl mx-auto px-4 py-32">
        <h1 className="text-5xl text-primary-500 dark:text-primary-400 mb-4">
          Welcome back!
        </h1>
        <p className="mb-8 dark:text-gray-300">
          Log in to your account using your credentials.
        </p>

        <div className="shadow bg-white dark:bg-gray-800 rounded-lg py-8">
          {!!error && (
            <div className="px-8">
              <Alert type="danger">{error}</Alert>
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
            </div>
            <div className="px-8">
              <button
                type="submit"
                disabled={status !== "idle"}
                className="h-12 bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 text-lg text-white rounded-md px-8"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

import { FC, useCallback, useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import Head from "../components/Head";

const Newsletter: FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [successMessage, setSuccessMessage] = useState<string>(null);

  const handleSubmit = useCallback(async () => {
    if (status !== "idle") {
      return Promise.resolve();
    }
    setError(null);
    setStatus("submitting");
    try {
      const {
        data: { message },
      } = await axios.post("/api/registerNewsletter", { email });
      setSuccessMessage(message);
      setStatus("success");
    } catch (error) {
      setError(error.response?.data.message || error.message || error);
      setStatus("idle");
    }
  }, [status, email]);

  return (
    <>
      <Head title="Newsletter" />

      <section>
        <div className="w-full max-w-xl mx-auto px-4 py-32">
          <h1 className="text-5xl text-primary-500 dark:text-primary-400 mb-4">
            Keep up to date.
          </h1>
          <p className="mb-8 dark:text-gray-300">
            Subscribe to our newsletter for weekly university updates!
          </p>
          {!!error && <Alert type="danger">{error}</Alert>}
          {status === "success" && !!successMessage && (
            <Alert type="success">{successMessage}</Alert>
          )}
          {status !== "success" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex shadow-lg rounded-md overflow-hidden mb-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={status !== "idle"}
                  className="w-full px-4 h-12 bg-white dark:bg-gray-800 text-lg dark:text-white"
                  placeholder="Enter your email address here..."
                />
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="hidden md:flex items-center bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 px-6 h-12 text-white text-lg transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
              <button
                type="submit"
                disabled={status !== "idle"}
                className="w-full md:hidden rounded-md bg-primary-500 focus:bg-primary-600 px-6 h-12 text-white text-lg"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Newsletter;

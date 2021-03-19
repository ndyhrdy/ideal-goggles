import { FC, useState } from "react";
import Head from "../components/Head";

const Newsletter: FC = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <Head title="Newsletter" />

      <section>
        <div className="container mx-auto px-4 py-32">
          <h1 className="text-5xl text-primary-500 mb-4">Keep up to date.</h1>
          <p className="mb-8">
            Subscribe to our newsletter for weekly university updates!
          </p>

          <form className="w-full max-w-xl">
            <div className="flex shadow-lg rounded-md overflow-hidden mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-4 h-12 bg-white text-lg focus:border-primary-500"
                placeholder="Enter your email address here..."
              />
              <button
                type="submit"
                className="hidden md:flex items-center bg-primary-500 hover:bg-primary-600 focus:bg-primary-600 px-6 h-12 text-white text-lg transition-colors duration-200"
              >
                Submit
              </button>
            </div>
            <button
              type="submit"
              className="w-full md:hidden rounded-md bg-primary-500 focus:bg-primary-600 px-6 h-12 text-white text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Newsletter;

"use client";

import { useActionState } from "react";
import { signUpUser } from "../lib/action";

const SignUpPage: React.FC = () => {
  const [error, formAction] = useActionState(signUpUser, undefined);

  return (
    <div className="flex justify-center items-center h-screen">
      <form action={formAction} className="w-72 flex flex-col">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Sign-Up</h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <label htmlFor="email" className="mb-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="border rounded p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="border rounded p-2 mb-3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

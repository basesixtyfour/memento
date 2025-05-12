"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/action";

const LoginPage: React.FC = () => {
  const [error, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form action={formAction} className="w-72 flex flex-col mb-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label htmlFor="email" className="mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mb-3 p-2 border rounded"
        />

        <label htmlFor="password" className="mb-1 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="p-2 bg-black text-white rounded cursor-pointer hover:bg-neutral-950"
        >
          Login
        </button>
      </form>
      <p>
        Not a user? <a href="/sign-up" className="text-blue-800">Sign-in</a>
      </p>
    </div>
  );
};

export default LoginPage;

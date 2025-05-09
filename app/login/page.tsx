"use client";

import { useActionState, useState } from "react";
import { authenticate } from "@/app/lib/action";

const LoginPage: React.FC = () => {
  const [error, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <form action={formAction} className="w-72 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label htmlFor="email" className="mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          className="mb-3 p-2 border rounded"
        />

        <label htmlFor="password" className="mb-1 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          className="mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

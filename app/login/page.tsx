"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: true,
        callbackUrl,
      });
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-72 flex flex-col mb-4">
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
        Not a user?{" "}
        <a href="/sign-up" className="text-blue-800">
          Sign-in
        </a>
      </p>
    </div>
  );
};

export default LoginPage;

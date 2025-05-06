"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const body = await res.json();
      console.log(body);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 space-y-4 p-4"
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
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
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          className="border rounded p-2"
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
  );
}

"use client";

import { useActionState } from "react";
import { updateUserName } from "../lib/action";

interface ProfileProps {
  username: string;
  email: string;
}

const Profile = ({ username, email }: ProfileProps) => {
  const [error, formAction] = useActionState(updateUserName, undefined);

  return (
    <form action={formAction}>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder=""
        defaultValue={username || ""}
      />
      <label htmlFor="email">email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder=""
        defaultValue={email || ""}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default Profile;

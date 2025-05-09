export type AuthResult = {
  success?: boolean;
  error?: string;
  user?: { id: string; email: string };
};

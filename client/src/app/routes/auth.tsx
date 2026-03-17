import { LoginPage } from "~/pages/login";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "sign in/sign up" },
    { name: "description", content: "Manage your income and expenses with me" },
  ];
}

export default function Auth() {
  return <LoginPage />;
}

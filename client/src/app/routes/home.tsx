
import type { Route } from "./+types/home";
import { HomePage } from "~/pages/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "expence tracker" },
    { name: "description", content: "Manage your income and expenses with me" },
  ];
}

export default function Home() {
  return <HomePage />;
}

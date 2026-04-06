
import { HomePage } from "../../pages/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "expence tracker" },
    { name: "description", content: "Manage your income and expenses with me" },
  ];
}

export default function Home() {
  return <HomePage />;
}

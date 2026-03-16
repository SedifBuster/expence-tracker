import type { Route } from "./+types/home";
import { DashBoardPage } from "~/pages/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "dashboard" },
    { name: "description", content: "Manage your income and expenses with me" },
  ];
}

export default function DashBoard() {
  return <DashBoardPage />;
}

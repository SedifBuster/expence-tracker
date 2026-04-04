import type { Route } from "./+types/home";
import { DashBoardPage } from "~/pages/dashboard";
import { Outlet } from "react-router";
import { useAuthStore } from "~/features/auth";
import { ProfilePage } from "~/pages/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "dashboard" },
    { name: "description", content: "Manage your income and expenses with me" },
  ];
}

export default function DashBoard() {
  return <ProfilePage />;
}

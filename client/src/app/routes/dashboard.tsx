import type { Route } from "./+types/home";
import { DashBoardPage } from "~/pages/dashboard";
import { Outlet } from "react-router";
import { useAuthStore } from "~/features/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "dashboard" },
    { name: "description", content: "Manage your income and expenses with me" },
  ];
}

/*export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const { user } = useAuthStore.getState();

  if (!user) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;
    throw redirect(`/auth?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return null; // можно вернуть данные, если нужно
}*/

export default function DashBoard() {
  return <><Outlet /></>;
}

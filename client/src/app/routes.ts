import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/auth", "routes/auth.tsx", [
    route("callback", "./routes/callback.tsx")
  ]),
  {
    path: "/dashboard",
    file: "routes/dashboard.tsx",
    children: [
      //route("", "routes/dashboard.tsx"),
     // route("profile", "routes/profile.tsx"),
    ],
  },
] satisfies RouteConfig;

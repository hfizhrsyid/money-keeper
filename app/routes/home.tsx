import NavBar from "~/components/navBar";
import type { Route } from "./+types/home";
import Main from "../money/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Money Keeper!" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <NavBar />
      <Main />
    </div>
  )
}

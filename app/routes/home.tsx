import NavBar from "~/components/navBar";
import type { Route } from "./+types/home";
import Money from "../money/money";

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
      <Money />
    </div>
  )
}

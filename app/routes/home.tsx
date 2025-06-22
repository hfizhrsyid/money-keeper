import type { Route } from "./+types/home";
import { Money } from "~/money/money";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Money Keeper!" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1 className="text-center font-bold">Money Keeper!</h1>
      <Money />
    </div>
  )
}

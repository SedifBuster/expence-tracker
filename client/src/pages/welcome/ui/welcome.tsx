import { Button } from "@headlessui/react";
import { NavLink } from "react-router";

export function HomePage() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <p className="max-w-2xl w-full space-y-6 px-2 text-center">
          A personal finance web app with smart analytics
           and an AI assistant that helps analyze
            spending and provide recommendations.
        </p>
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const SettingsNavbarComponent = ({
  routes,
}: {
  routes: { path: string; label: string }[];
}) => {
  const path = usePathname();

  return (
    <div className="flex flex-row gap-1 border m-1 rounded-sm">
      {routes.map((route) => (
        <Link
          key={route.path}
          className={cn(
            path === route.path && "border-b-[1px] border-b-black",
            "p-2"
          )}
          href={route.path}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

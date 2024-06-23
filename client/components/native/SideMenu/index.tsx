"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SideMenu = ({
  routes,
}: {
  routes: { path: string; label: string }[];
}) => {
  const pathname = usePathname();

  return (
    <Card className="flex flex-col">
      {routes.map((route) => (
        <Link href={route.path}>
          <div
            className={cn(
              pathname === route.path && "bg-slate-50 border-l-2 border-black",
              "hover:bg-slate-50 pl-[1rem] pr-[8rem] py-[.25rem] font-bold"
            )}
          >
            {route.label}
          </div>
        </Link>
      ))}
    </Card>
  );
};

export default SideMenu;

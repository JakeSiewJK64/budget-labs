"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Card } from "@/components/ui/card";

const SideMenu = ({
  routes,
}: {
  routes: { path: string; label: string }[];
}) => {
  return (
    <Card className="flex justify-center">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="flex-col items-start space-x-0">
          {routes.map((route) => (
            <NavigationMenuItem key={`${route.path}-${route.label}`}>
              <Link href={route.path} legacyBehavior passHref>
                <NavigationMenuLink className="border-b-2 rounded-none w-[12rem] inline-flex h-10 items-center justify-center bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  {route.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </Card>
  );
};

export default SideMenu;

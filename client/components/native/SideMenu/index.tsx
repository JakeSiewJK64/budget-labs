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
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({
                    className: "w-[10rem] truncate border-b-2 rounded-none",
                  })}
                >
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

"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  LayoutDashboard,
  ShoppingCart,
  Menu as MenuIcon,
  Settings,
  LogOut,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "~/lib/utils";
import { Separator } from "../ui/separator";
import { signOut, useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Staff", href: "/staff", icon: Users },
  { name: "Menu", href: "/menu", icon: MenuIcon },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function MainSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const session = useSession();

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4rem" },
  };

  return (
    <TooltipProvider>
      <motion.div
        className="bg-muted/40 flex h-full flex-col justify-between border-e"
        initial="expanded"
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
      >
        <div>
          <div className="relative p-3">
            <motion.div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex h-10 w-10 min-w-10 items-center justify-center rounded-lg font-bold shadow-sm">
                LG
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    className="text-lg font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    Dashboard
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "absolute -end-3.5 top-5 h-7 w-7 rounded-full shadow-md",
              )}
            >
              <ChevronLeft
                className={cn("transition-all duration-300", {
                  "rotate-180": isCollapsed,
                })}
                size={16}
              />
            </Button>
          </div>

          <Separator className="my-2" />

          <nav className="mt-2 flex flex-col gap-1 px-2">
            {sidebarItems.map((item) => (
              <Tooltip key={item.name} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link href={item.href} passHref>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      size={isCollapsed ? "icon" : "sm"}
                      className={cn(
                        "w-full justify-start p-2 transition-all duration-200",
                        pathname === item.href && "shadow-md",
                        {
                          "p-3.5": isCollapsed,
                        },
                      )}
                    >
                      <item.icon size={18} className="min-w-max" />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.span
                            className="ml-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-semibold">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <Separator />

          <div className="mb-4 px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-full justify-start p-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.data?.user.image ?? ""}
                      alt={session.data?.user.name ?? ""}
                    />
                    <AvatarFallback>
                      {session.data?.user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        className="ml-3 flex-1 text-left"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-sm font-medium">
                          {session.data?.user.name}
                        </p>
                        <p className="text-muted-foreground max-w-[20em] truncate text-xs">
                          {session.data?.user.email}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to log out?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be redirected to the login page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          await signOut();
                        }}
                      >
                        Log out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}

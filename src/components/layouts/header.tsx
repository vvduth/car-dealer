import { routes } from "@/config/routes";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { HeartIcon, HomeIcon, LayoutDashboard, MenuIcon, SearchIcon } from "lucide-react";
import { Favourites } from "@/config/types";
import SignoutForm from "../auth/SignoutForm";
import { ThemeToggle } from "../ui/theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { auth } from "@/auth";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";

const navLinks = [
  { id: 1, href: routes.inventory, label: "The Collection" },
  { id: 2, href: routes.financing, label: "Financing" },
  { id: 3, href: routes.ourPhilosophy, label: "Our Philosophy" },
  { id: 4, href: routes.contact, label: "Contact" },
];

const Header = async () => {
  const session = await auth();
  const sourceId = await getSourceId();
  const favs = await redis.get<Favourites>(sourceId ?? "");

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-transparent gap-x-6">
      <div className="flex items-center flex-1 gap-x-4">
        <Link href={routes.home} className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="RIM GLOBAL Logo"
            width={60}
            height={60}
            className="relative"
          />
          <div>
            <span className="text-xl font-bold text-primary">RIM GLOBAL</span>
            <p className="text-sm text-muted-foreground text-right -mt-1">auto sales</p>
          </div>
        </Link>
        <LanguageSwitcher />
      </div>
      <nav className="hidden md:flex items-center gap-x-4">
        <Button asChild variant="outline" size="icon">
          <Link href={routes.home}>
            <HomeIcon className="w-6 h-6" />
          </Link>
        </Button>
        <Button variant="outline" size="icon">
          <SearchIcon className="w-6 h-6" />
        </Button>
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="px-4 py-2 text-sm uppercase font-medium text-foreground hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
        <Button asChild variant="outline" size="icon" className="relative">
            <Link href={routes.favourites}>
                <HeartIcon className="w-6 h-6" />
                <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-primary-foreground bg-primary rounded-full">
                    <span className="text-xs">
                        {favs ? favs.ids.length : 0}
                    </span>
                </div>
            </Link>
        </Button>
      </nav>
      <div className="items-center md:flex gap-x-2 hidden">
        {session ? (
            <>
                <Button asChild variant={'outline'} size={"icon"}>
                    <a href={routes.admin.dashboard}>
                    <LayoutDashboard className="w-6 h-6" />
                    </a>
                </Button>
                <SignoutForm />
            </>
        ) : null}
        <ThemeToggle />
      </div>
    
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"link"} className="md:hidden border-none">
            <MenuIcon className="w-6 h-6 text-foreground" />
            <SheetTitle className="sr-only">Navigate RIM GLOBAL</SheetTitle>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs p-4">
          {/* Mobile menu content needs to be restored/updated as well */}
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;

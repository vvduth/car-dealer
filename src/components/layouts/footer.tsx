import { routes } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NewsLetterForm from "./NewsLetterForm";
import { auth } from "@/auth";
import { Button } from "../ui/button";
import { LayoutDashboard } from "lucide-react";

const navLinks = [
  { id: 1, href: routes.inventory, label: "The Collection" },
  { id: 2, href: routes.financing, label: "Financing" },
  { id: 3, href: routes.ourPhilosophy, label: "Our Philosophy" },
  { id: 4, href: routes.contact, label: "Contact" },
];

const PublicFooter = async () => {
  const session = await auth();
  return (
    <footer className="bg-secondary px-8 lg:px-0 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12 items-start">
          {/* Column 1: Branding */}
          <div className="flex flex-col items-center md:items-start gap-y-2">
            <Link href={routes.home} className="flex flex-col sm:flex-row items-center gap-4">
              <Image
                src="/assets/logo.png"
                alt="RIM GLOBAL Logo"
                width={280}
                height={280}
              />
              <div>
                <span className="text-2xl font-bold text-primary">RIM GLOBAL</span>
                <p className="text-md text-muted-foreground text-right -mt-1">auto sales</p>
              </div>
            </Link>
          </div>

          {/* Column 2: Navigation */}
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Column 3: Contact Info & Admin Link */}
          <div className="flex flex-col justify-between h-full items-start md:items-end">
            <div className="space-y-2 text-left md:text-right">
                <h3 className="text-xl font-bold text-primary">Contact Us</h3>
                <address className="not-italic text-muted-foreground">
                1505 S 356th Street, STE 114-4<br />Federal Way, WA 98003
                </address>
                <p>
                <a href="mailto:rimglobalwa@gmail.com" className="text-foreground hover:text-primary">
                    rimglobalwa@gmail.com
                </a>
                </p>
            </div>
            <div className="mt-4">
                <Button asChild variant="ghost" size="icon">
                    <a href={session ? routes.admin.dashboard : routes.signIn}>
                        <LayoutDashboard className="w-6 h-6" />
                    </a>
                </Button>
            </div>
          </div>
        </div>

        {/* Newsletter Section - Centered */}
        <div className="flex flex-col items-center text-center">
          <NewsLetterForm />
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
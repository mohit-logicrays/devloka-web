/**
 * Navbar component for the application.
 * @returns {JSX.Element} The rendered navbar.
 */
import React from "react";
import { cn } from "@/lib/utils";
import type { IconProps } from "@/utils/types";

/**
 * Icons for the navbar.
 */
import {
  HomeIcon,
  StarIcon,
  NfcIcon,
  GithubIcon,
  ArrowRightIcon,
  SquareChevronRightIcon,
} from "lucide-react";
/**
 * Components for the navbar.
 */
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/custom/theme";

const Icons = {
  home: (props: IconProps) => <HomeIcon {...props} />,
  features: (props: IconProps) => <StarIcon {...props} />,
  contact: (props: IconProps) => <NfcIcon {...props} />,
  github: (props: IconProps) => <GithubIcon {...props} />,
};

const DATA = {
  navbar: [
    { href: "/#home", icon: Icons.home, label: "Home" },
    { href: "#features", icon: Icons.features, label: "Features" },
    { href: "#contact", icon: Icons.contact, label: "Contact" },
  ],
};

/**
 * The main navbar component for the website.
 * It renders a dock of icons which when clicked navigate to the corresponding section.
 * The dock is rendered in the middle of the screen.
 * The icons are rendered as a circle with a size of 12.
 * The icons are also rendered with a tooltip which displays the name of the section.
 * The dock is rendered with a vertical separator in the middle.
 * The dock is rendered with the theme toggle button at the end.
 * @returns {JSX.Element} The rendered navbar.
 */
export default function Navbar(): React.JSX.Element {
  return (
    <nav className="p-4 w-full flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <SquareChevronRightIcon className="!size-5" />
        <span className="text-base font-semibold">Devloka.</span>
      </Link>
      <div className="shadow-md rounded-2xl">
        <TooltipProvider>
          <Dock direction="middle" className="m-0">
            {DATA.navbar.map((item) => (
              <DockIcon key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      aria-label={item.label}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full"
                      )}
                    >
                      <item.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
            <Separator orientation="vertical" className="h-full py-2" />
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>theme</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>
      <div className="group transition-all ease-in hover:cursor-pointer">
        <RainbowButton>
          <span>Get Started Now</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </RainbowButton>
      </div>
    </nav>
  );
}

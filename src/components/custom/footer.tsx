/**
 * Footer component
 * @returns Footer component for the landing page.
 * This component includes a call to action, pricing details, product features, and company information.
 */
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "@/providers/theme-provider";
import { LinkedinIcon, GithubIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="mt-14 w-7xl mx-auto">
      <div className="mb-14 flex flex-col justify-between gap-11 md:items-start xl:flex-row xl:items-center xl:gap-4">
        <div>
          <h1 className="mb-4 text-4xl font-semibold">Ready to get started.</h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Coding is fun, but building is even more fun. Let's build something
            amazing together.
          </p>
          <div className="flex items-center gap-3">
            <Button>Get Started</Button>
            <Button variant="outline" className="text-muted-foreground">
              Learn More
            </Button>
          </div>
        </div>
        <Card className="p-0 shadow-none border-none">
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="px-2 py-3"
          >
            {/* Pricing */}
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground">
                Choose a plan that fits your needs.
              </CardDescription>
              <div className="mt-4">
                <div className="text-4xl font-bold flex items-end gap-2">
                  0<span className="text-2xl font-normal">INR</span>
                </div>
                <div className="text-base font-medium mt-1 mb-3">
                  Free forever
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Unlimited users sharing</li>
                  <li>No expiry date for shared content</li>
                  <li>5GB storage</li>
                  <li>Support by email</li>
                </ul>
              </div>
            </CardContent>
          </MagicCard>
        </Card>
      </div>
      <div className="text-muted-foreground mt-20 flex flex-col items-start justify-between gap-4 border-t text-center text-sm font-medium lg:flex-row lg:items-center py-5">
        <ul className="flex justify-center gap-4 lg:justify-start">
          <li className="hover:text-primary">
            <a href="#">Privacy</a>
          </li>
          <li className="hover:text-primary">
            <a href="#">Terms</a>
          </li>
          <li className="hover:text-primary">
            <a href="mailto:mohitdevelopment2001@gmail.com">Contact</a>
          </li>
          <li>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Devloka.com. All rights reserved.
            </p>
          </li>
        </ul>
        <ul className="flex items-center justify-center gap-4 lg:justify-start">
          <li>
            <p className="text-black">Follow us:</p>
          </li>
          <li>
            <Link
              to="https://linkedin.com/in/itsmohitprajapat/"
              target="_blank"
              className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2 rounded-full flex items-center"
            >
              <LinkedinIcon className="h-4 w-4" />
              Linkedin
            </Link>
          </li>
          <li>
            <Link
              to="https://github.com/mohitprajapat2001/"
              target="_blank"
              className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2 rounded-full flex items-center"
            >
              <GithubIcon className="h-4 w-4" />
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

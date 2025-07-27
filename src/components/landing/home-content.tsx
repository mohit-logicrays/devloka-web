/**
 * Home content component for the landing page.
 * This component renders the main content of the home page.
 * It includes a welcome message and a brief description of the application.
 * It is styled using Tailwind CSS for a modern look.
 */
import { BoxReveal } from "@/components/magicui/box-reveal";
import { WordRotate } from "@/components/magicui/word-rotate";
import type { JSX } from "react";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AnimatedList } from "@/components/magicui/animated-list";

import { UsersIcon, GlobeIcon, ClockFadingIcon, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
/**
 * HomeContent component for the landing page.
 * This component renders the main content of the home page.
 * It includes a welcome message and a brief description of the application.
 * It is styled using Tailwind CSS for a modern look.
 * @returns {JSX.Element} The rendered content.
 */
export default function HomeContent({ auth }: { auth: boolean }): JSX.Element {
  return (
    <div className="grid grid-cols-5 gap-4 w-5xl mx-auto">
      <div className="col-span-3">
        <ContentReveal auth={auth} />
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <AnimatedListDemo className="w-full max-w-md" />
      </div>
    </div>
  );
}

/**
 * ContentReveal component for the home page.
 * This component renders the main content of the home page
 * with a box reveal animation.
 * It includes a welcome message and a brief description of the application.
 * It is styled using Tailwind CSS for a modern look.
 * @returns {JSX.Element} The rendered content.
 */
const ContentReveal: React.FC<{ auth: boolean }> = ({ auth }): JSX.Element => {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="text-[3.5rem] font-semibold flex flex-col gap-2">
          <p>
            Code<span className="text-[#5046e6]">.</span>
          </p>
          <p>
            Collaborate<span className="text-[#5046e6]">.</span>
            {"  "}
            Share<span className="text-[#5046e6]">.</span>
          </p>
        </div>
      </BoxReveal>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-xl">
          An online code editor for interviews, troubleshooting, teaching, and
          more.
        </h2>
      </BoxReveal>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <WordRotate
          className="text-lg font-bold"
          words={["Free to use.", "No sign-up required."]}
        />
      </BoxReveal>
      <Link
        to={auth ? "/dashboard" : "/login"}>
        <InteractiveHoverButton className="mt-5">
          Start Coding Now
        </InteractiveHoverButton>
      </Link>
    </div>
  );
};

interface Item {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  time?: string;
}

let notifications = [
  {
    name: "Real Time Collaboration",
    description: "Collaborate with your team in real-time.",
    icon: <UsersIcon />,
    color: "#00C9A7",
  },
  {
    name: "Anywhere in the World",
    description: "Access your code from anywhere, anytime.",
    icon: <GlobeIcon />,
    color: "#FFB800",
  },
  {
    name: "Real Time",
    description: "Real-time code execution and sharing.",
    icon: <ClockFadingIcon />,
    color: "#FF3D71",
  },
  {
    name: "Custom Urls",
    description: "Create custom URLs for your projects.",
    icon: <LinkIcon />,
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}

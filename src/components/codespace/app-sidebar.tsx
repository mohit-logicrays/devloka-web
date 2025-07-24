import * as React from "react";
import {
  SquareChevronRightIcon,
  CogIcon,
  CirclePlusIcon,
  DownloadIcon,
} from "lucide-react";
import { NavMain } from "@/components/codespace/nav-main";
import { NavUser } from "@/components/codespace/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  SyntaxSelect,
  TabSize,
  ThemeSelect,
} from "@/components/codespace/nav-items";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Settings",
      icon: CogIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Syntax",
          content: <SyntaxSelect />,
        },
        {
          title: "Tab Size",
          content: <TabSize />,
        },
        {
          title: "Theme",
          content: <ThemeSelect />,
        },
      ],
    },
    {
      title: "Download",
      url: "#",
      icon: DownloadIcon,
    },
    {
      title: "Create New Codespace",
      url: "#",
      icon: CirclePlusIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          asChild
          className="data-[slot=sidebar-menu-button]:!p-1.5 cursor-pointer hover:bg-transparent active:bg-transparent"
        >
          <div className="flex items-center supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 rounded-2xl p-2 backdrop-blur-md gap-2">
            <SquareChevronRightIcon className="!size-5" />
            <span className="text-base font-semibold">Devloka.</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

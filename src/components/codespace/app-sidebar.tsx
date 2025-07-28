import * as React from "react";
import {
  SquareChevronRightIcon,
  CogIcon,
  CirclePlusIcon,
  DownloadIcon,
} from "lucide-react";
import { NavMain } from "@/components/codespace/nav-main";
import { NavUser } from "@/components/custom/nav-user";
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
import { useCodespaceContext } from "@/providers/codespace-provider";
import { getApiUrl } from "@/utils/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { codespace } = useCodespaceContext();

  const data = {
    navMain: [
      {
        title: "Settings",
        icon: CogIcon,
        isActive: true,
        url: "#",
        target: "_blank",
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
        url:
          codespace &&
          "download" in codespace &&
          typeof codespace.download === "string"
            ? codespace.download
            : undefined,
        icon: DownloadIcon,
        target: "_blank",
      },
      {
        title: "Create New Devspace",
        url: getApiUrl("CREATE_CODESPACE"),
        icon: CirclePlusIcon,
        target: "",
      },
    ],
  };

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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

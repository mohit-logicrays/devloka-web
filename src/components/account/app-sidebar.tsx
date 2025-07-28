import * as React from "react";
import {
  SquareChevronRightIcon,
  UserCogIcon,
  CirclePlusIcon,
  SquareCodeIcon,
} from "lucide-react";
import { NavMain } from "@/components/account/nav-main";
import { NavUser } from "@/components/custom/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { getApiUrl } from "@/utils/constants";

const data = {
  navMain: [
    {
      title: "Account Settings",
      description: "View or change your account settings.",
      icon: UserCogIcon,
      url: "#account-settings",
    },
    {
      title: "Dev Spaces",
      description: "View your dev spaces.",
      url: "#devspaces",
      icon: SquareCodeIcon,
    },
    {
      title: "Create New Codespace",
      description: "Create a new codespace.",
      url: getApiUrl("CREATE_CODESPACE"),
      icon: CirclePlusIcon,
    },
  ],
};

/**
 * A sidebar component for the account app.
 *
 * This component renders a sidebar with navigation items.
 * */
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

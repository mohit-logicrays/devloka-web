"use client";

import { type LucideIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { scrollToSection } from "@/utils/utils";
import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Link } from "react-router-dom";

/**
 * Renders the main navigation sidebar with collapsible menu items.
 *
 * @param {Object[]} items - Array of navigation items.
 * @param {string} items[].title - The title of the navigation item.
 * @param {string} [items[].description] - Optional description for the tooltip.
 * @param {string | undefined} items[].url - The URL for the navigation item.
 * @param {LucideIcon} [items[].icon] - Optional icon to display with the item.
 * @param {Object[]} [items[].items] - Optional array of sub-items for collapsible menus.
 * @param {string} items[].items[].title - The title of the sub-item.
 * @param {React.ReactNode} [items[].items[].content] - Optional content for the sub-item.
 * @param {React.ReactNode} [items[].content] - Optional content to display when the item is active.
 */
export function NavMain({
  items,
}: {
  items: {
    title: string;
    description?: string;
    url: string | undefined;
    icon?: LucideIcon;
    items?:
      | {
          title: string;
          content?: React.ReactNode;
        }[]
      | undefined;
    content?: React.ReactNode;
  }[];
}) {
  const { open, toggleSidebar } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account Configurations</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuItem
                  onClick={() => scrollToSection(item.url || "")}
                >
                  <Link to={item.url || ""}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={open ? undefined : toggleSidebar}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </TooltipTrigger>
              <TooltipContent side="right">{item.description}</TooltipContent>
            </Tooltip>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

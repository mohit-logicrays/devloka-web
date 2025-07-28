/**
 * Account User Profile Page
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/account/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/custom/theme";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SaveIcon, ShareIcon } from "lucide-react";
import ProfileContent from "@/components/account/profile-content";

/**
 * Account Profile page
 * This component renders the account profile page of the application.
 * It includes a navigation bar and a codespace editor.
 * It is styled using Tailwind CSS for a modern look.
 * @returns {JSX.Element} The rendered account profile page.
 */
export default function AccountProfile(): React.JSX.Element {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex justify-between w-full items-center gap-2 px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-black dark:text-white" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
              </div>
              <div className="flex items-center">
                <ModeToggle />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="scale-80 hover:scale-85 transition-all duration-300"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                    >
                      <ShareIcon />
                      Share
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {/* Temporary Change Share Codespace to Copied! */}
                    <p>Share codespace</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="scale-80 hover:scale-85 transition-all duration-300"
                    >
                      <SaveIcon />
                      Save
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </header>
          <ProfileContent />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

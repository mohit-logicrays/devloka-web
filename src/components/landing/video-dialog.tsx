import React from "react";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
/**
 * A reusable component for rendering a video dialog on the home page.
 * The component contains two HeroVideoDialog components.
 * The first one is visible on light mode and the second one is visible on dark mode.
 * The video and thumbnail sources can be customized.
 */
export default function VideoDialog(): React.JSX.Element {
  return (
    <div className="relative w-7xl mx-auto mt-10">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}

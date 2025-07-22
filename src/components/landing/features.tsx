"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

/**
 * Gifs for the features page
 * This file contains a list of products with their titles, descriptions, and thumbnails.
 */
import collaboration from "@/assets/gifs/collaboration.gif";
import customUrls from "@/assets/gifs/custom-urls.gif";
import globalAccess from "@/assets/gifs/global-access.gif";
import liveUpdates from "@/assets/gifs/live-updates.gif";

/**
 * A reusable component for rendering a parallax section for the features page.
 * This component uses the HeroParallax component and renders a list of products.
 * The products are defined in the products array below.
 */
export default function FeaturesParallax(): React.JSX.Element {
  return (
    <div className="mt-10">
      <HeroParallax products={products} />
    </div>
  );
}
export const products = [
  {
    title: "Custom URLs",
    description:
      "Generate and share unique URLs to collaborate instantly — no sign-up required.",
    thumbnail: customUrls,
  },
  {
    title: "Real-Time Collaboration",
    description:
      "Work together in a live code editor with instant updates as you type.",
    thumbnail: collaboration,
  },
  {
    title: "Global Access",
    description:
      "Collaborate with anyone, anywhere in the world — no downloads, just code.",
    thumbnail: globalAccess,
  },
  {
    title: "Live Code Updates",
    description:
      "See every change in real time, perfect for debugging, teaching, or interviews.",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
];

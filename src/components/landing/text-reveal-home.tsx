/**
 * TextReveal Component
 * This component is used to reveal text with a fade-in effect.
 * It accepts a `text` prop which is the text to be displayed.
 * The text is wrapped in a span with a class that applies the fade-in animation.
 */

import { TextReveal } from "@/components/magicui/text-reveal";

export default function TextRevealHome() {
  return (
    <>
      <TextReveal>Watch your candidates code in real-time.</TextReveal>
      <TextReveal>
        Ideal for teachers, instructors, and mentors. Share code, explain
        concepts, and help learners grow.
      </TextReveal>
      <TextReveal>Skip the whiteboard. Use live code editors.</TextReveal>
    </>
  );
}

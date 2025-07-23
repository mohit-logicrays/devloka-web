/**
 * Clients component for displaying client logos on the landing page.
 * Uses motion for animations and responsive design.
 */
import { Marquee } from "@/components/magicui/marquee";
import { Ripple } from "@/components/magicui/ripple";

/**
 * Logos of clients to be displayed in the marquee.
 */
import google from "@/assets/img/png/google.png";
import linkedin from "@/assets/img/png/linkedin.png";
import facebook from "@/assets/img/png/facebook.png";
import devlooka from "@/assets/img/png/devloka.webp";
import logicrays from "@/assets/img/png/logicrays.png";

const clientLogos = [google, linkedin, facebook, devlooka, logicrays];

const ClientLogo = ({ img }: { img: string }) => {
  return (
    <div className="flex-shrink-0 w-32 h-32 mx-8 flex items-center justify-center rounded-lg bg-white shadow-lg p-4">
      <img src={img} alt="" className="object-contain w-full h-full" />
    </div>
  );
};

export default function ClientMarquee() {
  return (
    <>
      <div className="relative flex w-7xl mx-auto flex-col items-center justify-center overflow-hidden gap-y-18">
        <div className="relative flex h-[264px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
          <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
            Our Clients Love Us
          </p>
          <Ripple />
        </div>
        <div>
          <Marquee className="[--duration:20s]">
            {clientLogos.map((logo) => (
              <ClientLogo key={logo} img={logo} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </>
  );
}

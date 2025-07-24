import "./preloder.css";

/**
 * A styled preloader component that displays a loading animation.
 * The component is styled using Tailwind CSS and supports dark/light mode.
 */
export default function Preloader() {
  return (
    <>
      <div className="w-screen h-screen transition-colors duration-300 bg-[#e8e8e8] dark:bg-[#1a1a1a] relative z-[100]">
        <div className="loader">
          <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="base">
            <span></span>
            <div className="face"></div>
          </div>
        </div>
        <div className="longfazers">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
}

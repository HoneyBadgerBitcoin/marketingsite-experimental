import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import CryptoModel3D from "./CryptoModel3D";

const ScrollHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [animationsComplete, setAnimationsComplete] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Mark as mounted after initial render
  useEffect(() => {
    setIsMounted(true);
    // Mark animations as complete after they finish (reduced to 700ms)
    const timer = setTimeout(() => {
      setAnimationsComplete(true);
    }, 700); // Complete after first content animation (0.1s delay + 0.5s duration + 0.1s buffer)
    return () => clearTimeout(timer);
  }, []);

  // Track scroll progress through the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Text crossfade: First text starts at 1, fades to 0, second starts at 0, fades to 1
  const firstTextOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const secondTextOpacity = useTransform(scrollYProgress, [0.03, 0.08], [0, 1]);

  // Track when user starts scrolling - immediately switch to scroll control
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && !hasScrolled) {
      setHasScrolled(true);
      setAnimationsComplete(true); // Immediately enable scroll control
    }
  });

  // Pointer events: switch between sections based on scroll
  const firstPointerEvents = useTransform(scrollYProgress, (latest) =>
    latest < 0.04 ? "auto" : "none",
  );
  const secondPointerEvents = useTransform(scrollYProgress, (latest) =>
    latest >= 0.04 ? "auto" : "none",
  );


  // Text overlap with capsule: increase negative margin to condense (faster)
  const textMarginTop = useTransform(
    scrollYProgress,
    [0, 0.08],
    [0, 0], // keep text position fixed
  );

  // Buttons: only reduce top margin, don't move them up
  const buttonsMarginTop = useTransform(scrollYProgress, [0, 0.05], [16, 8]);

  // Stats/logos section: move up to close gap with buttons (faster)
  const statsY = useTransform(scrollYProgress, [0, 0.05], [0, -100]);

  return (
    <motion.div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden !rounded-none"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Gradient accents */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 filter blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 filter blur-[150px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Main content container with consistent vertical spacing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-custom w-full max-w-7xl">
          {/* First content: "Buy and sell digital assets" */}
          <motion.div
            style={{
              opacity: animationsComplete ? firstTextOpacity : undefined,
              pointerEvents: firstPointerEvents,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full relative -mt-28"
          >
            {/* Video background at the top */}
            <div className="flex justify-center w-full">
              <div className="relative w-full max-w-5xl h-[50vh] max-h-[500px] overflow-hidden rounded-2xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                >
                  <source src="/hero-rotating-gold-bars.mp4" type="video/mp4" />
                </video>
                
                {/* Dark gradient overlay at bottom for text overlap */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
              </div>
            </div>

            {/* Text content overlapping bottom of video */}
            <div className="relative -mt-20 z-20 flex justify-center">
              <div className="text-center max-w-5xl px-8 pb-8">
                {/* Text content centered */}
                <div className="relative z-30">
                  <motion.div style={{ marginTop: textMarginTop }}>
                    <h1
                      className="text-3xl md:text-5xl lg:text-[4.5rem] font-normal text-white leading-tight drop-shadow-lg"
                      style={{ fontFamily: "SF Pro Display, sans-serif" }}
                    >
                      Buy and sell digital assets
                      <br />
                      with HoneyBadger
                    </h1>
                  </motion.div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-20 justify-center">
                    <a
                      href="#app"
                      className="inline-flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-900 font-medium min-w-[140px] justify-center hover:bg-white transition-all duration-300 cursor-pointer"
                      style={{ borderRadius: "50px" }}
                    >
                      Buy Online
                    </a>
                    <a
                      href="#find-atm"
                      className="inline-flex items-center gap-2 px-6 py-2 border-2 border-white/30 text-white font-medium min-w-[140px] justify-center backdrop-blur-sm hover:border-white/50 transition-all duration-300"
                      style={{
                        borderRadius: "50px",
                        background: "rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      Find an ATM
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Second content: "Canada's choice for Bitcoin" */}
          <motion.div
            style={{
              opacity: animationsComplete ? secondTextOpacity : 0,
              pointerEvents: secondPointerEvents,
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full relative -mt-28">
              {/* Video background at the top */}
              <div className="flex justify-center w-full">
                <div className="relative w-full max-w-5xl h-[50vh] max-h-[500px] overflow-hidden rounded-2xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-contain"
                  >
                    <source src="/hero-rotating-coins.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Dark gradient overlay at bottom for text overlap */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
                </div>
              </div>

              {/* Text content overlapping bottom of video */}
              <div className="relative -mt-20 z-20 flex justify-center">
                <div className="text-center max-w-5xl px-8 pb-8">
                  {/* Text content centered */}
                  <div className="relative z-30">
                    <h1
                      className="text-3xl md:text-5xl lg:text-[4.5rem] font-normal text-white leading-tight drop-shadow-lg"
                      style={{ fontFamily: "SF Pro Display, sans-serif" }}
                    >
                      Canada's choice for Bitcoin
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                      HoneyBadger makes it easy to buy Bitcoin, Ethereum, and
                      Litecoin online, at an ATM, or by phone.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
                      <a
                        href="#app"
                        className="inline-flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-900 font-medium min-w-[140px] justify-center hover:bg-white transition-all duration-300 cursor-pointer"
                        style={{ borderRadius: "50px" }}
                      >
                        Buy Online
                      </a>
                      <a
                        href="#find-atm"
                        className="inline-flex items-center gap-2 px-6 py-2 border-2 border-white/30 text-white font-medium min-w-[140px] justify-center backdrop-blur-sm hover:border-white/50 transition-all duration-300"
                        style={{
                          borderRadius: "50px",
                          background: "rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        Find an ATM
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Stats and Logo Banner - Always visible at bottom */}
      <motion.div
        style={{ y: animationsComplete ? statsY : undefined }}
        className="absolute bottom-4 left-0 right-0 py-4 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Subtle divider line */}
          <div className="h-px w-full bg-white/10 mb-4"></div>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            style={{ background: "none", backgroundColor: "transparent" }}
          >
            {/* Stats on the left - in one row */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl font-bold text-white opacity-70">
                  60,000+
                </div>
                <div className="text-gray-300 text-base">Verified users</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl font-bold text-white opacity-70">
                  230+
                </div>
                <div className="text-gray-300 text-base">
                  ATMs across Canada
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl font-bold text-white opacity-70">
                  $24M
                </div>
                <div className="text-gray-300 text-base">
                  Quarterly volume exchanged
                </div>
              </div>
            </div>

            {/* Scrolling logo banner on the right */}
            <div
              className="relative overflow-hidden logo-fade-mask"
              style={{ background: "none", backgroundColor: "transparent" }}
            >
              {/* Scrolling container with triple duplication for seamless loop */}
              <div
                className="flex animate-scroll-left space-x-8 py-4"
                style={{
                  width: "max-content",
                  background: "none",
                  backgroundColor: "transparent",
                }}
              >
                {/* First set */}
                <img
                  src="/logo-banner/genesis-logo.svg"
                  alt="Genesis"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Kraken-Emblem.png"
                  alt="Kraken"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Netcoins-logo-transparent.png"
                  alt="Netcoins"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Satstreet-logo-transparent.png"
                  alt="Satstreet"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Paramount_Commerce.jpg"
                  alt="Paramount Commerce"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Sumsub_Logo.jpg"
                  alt="Sumsub"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/genmega_grande.avif"
                  alt="GenMega"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                {/* Second set for seamless loop */}
                <img
                  src="/logo-banner/genesis-logo.svg"
                  alt="Genesis"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Kraken-Emblem.png"
                  alt="Kraken"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Netcoins-logo-transparent.png"
                  alt="Netcoins"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Satstreet-logo-transparent.png"
                  alt="Satstreet"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Paramount_Commerce.jpg"
                  alt="Paramount Commerce"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Sumsub_Logo.jpg"
                  alt="Sumsub"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/genmega_grande.avif"
                  alt="GenMega"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                {/* Third set for extra smoothness */}
                <img
                  src="/logo-banner/genesis-logo.svg"
                  alt="Genesis"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Kraken-Emblem.png"
                  alt="Kraken"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Netcoins-logo-transparent.png"
                  alt="Netcoins"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Satstreet-logo-transparent.png"
                  alt="Satstreet"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Paramount_Commerce.jpg"
                  alt="Paramount Commerce"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/Sumsub_Logo.jpg"
                  alt="Sumsub"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
                <img
                  src="/logo-banner/genmega_grande.avif"
                  alt="GenMega"
                  className="h-8 opacity-60 hover:opacity-80 transition-opacity flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollHero;

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CryptoModel3D from "./CryptoModel3D";

const ScrollHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Text crossfade: First text starts at 1, fades to 0, second starts at 0, fades to 1
  const firstTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const secondTextOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  
  // Pointer events: switch between sections based on scroll
  const firstPointerEvents = useTransform(scrollYProgress, (latest) => 
    latest < 0.075 ? 'auto' : 'none'
  );
  const secondPointerEvents = useTransform(scrollYProgress, (latest) => 
    latest >= 0.075 ? 'auto' : 'none'
  );

  // ATM capsule transforms: scale down and move up (very fast)
  const capsuleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const capsuleY = useTransform(scrollYProgress, [0, 0.1], [0, -60]);

  // Text overlap with capsule: increase negative margin to condense (very fast)
  const textMarginTop = useTransform(
    scrollYProgress,
    [0, 0.15],
    [0, 0] // keep text position fixed
  );

  // Buttons: only reduce top margin, don't move them up
  const buttonsMarginTop = useTransform(scrollYProgress, [0, 0.1], [16, 8]);

  // Stats/logos section: move up to close gap with buttons (reduced to prevent overlap)
  const statsY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  return (
    <motion.div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-[#0a1320] overflow-hidden !rounded-none"
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
            style={{ opacity: firstTextOpacity, pointerEvents: firstPointerEvents }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 -mt-28"
          >
            {/* Text content on the left */}
            <div className="flex-1 text-center lg:text-left relative z-30">
              <motion.div
                style={{ marginTop: textMarginTop }}
              >
                <h1
                  className="text-3xl md:text-5xl lg:text-[4.5rem] font-normal text-white leading-tight"
                  style={{ fontFamily: "SF Pro Display, sans-serif" }}
                >
                  Buy and sell digital assets
                  <br />
                  with HoneyBadger
                </h1>
              </motion.div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-20 justify-center lg:justify-start">
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

            {/* Logo on the right */}
            <motion.div
              style={{ scale: capsuleScale, y: capsuleY }}
              className="flex-shrink-0 relative z-10"
            >
              <img
                src="/logo-white-transparent.png"
                alt="HoneyBadger Logo"
                className="h-[16rem] md:h-[20rem] lg:h-[24rem] w-auto object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Second content: "Canada's choice for Bitcoin" */}
          <motion.div
            style={{ 
              opacity: secondTextOpacity,
              pointerEvents: secondPointerEvents
            }}
            initial={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative text-center">
              <h1
                className="text-3xl md:text-5xl lg:text-[4.5rem] font-normal text-white leading-tight"
                style={{ fontFamily: "SF Pro Display, sans-serif" }}
              >
                Canada's choice for Bitcoin
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mt-16 max-w-2xl mx-auto leading-relaxed">
                HoneyBadger makes it easy to buy Bitcoin, Ethereum, and Litecoin
                online, at an ATM, or by phone.
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
          </motion.div>
        </div>
      </div>
      {/* Stats and Logo Banner - Always visible at bottom */}
      <motion.div
        style={{ y: statsY }}
        className="absolute bottom-4 left-0 right-0 py-4 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
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
                <div className="text-gray-400 text-base">Verified users</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl font-bold text-white opacity-70">
                  230+
                </div>
                <div className="text-gray-400 text-base">ATMs across Canada</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl font-bold text-white opacity-70">
                  $24M
                </div>
                <div className="text-gray-400 text-base">
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

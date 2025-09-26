import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CryptoModel3D from "./CryptoModel3D";

gsap.registerPlugin(ScrollTrigger);

const ScrollHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Set initial state for second text content
    gsap.set(secondTextRef.current, { opacity: 0 });

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Crossfade between text contents
    tl.to(firstTextRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    }).to(
      secondTextRef.current,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0.3,
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1320] to-[#1a2332] overflow-hidden"
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

      {/* First content: "Canada's trusted Bitcoin ATM network" */}
      <div
        ref={firstTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center -mt-28"
      >
        {/* ATM Image with pill-shaped container positioned on top */}
        <div className="h-[26rem] w-[16rem] md:h-[32rem] md:w-[20rem] lg:h-[36rem] lg:w-[22.5rem] relative flex-shrink-0 overflow-hidden rounded-full shadow-2xl z-10 mb-0">
          {/* Gradient background effects */}
          <div className="opacity-40">
            <div className="absolute top-0 h-[70%] w-full bg-blue-600 blur-2xl contrast-125"></div>
            <div className="absolute bottom-0 h-1/2 w-full bg-yellow-500 blur-2xl contrast-125"></div>
          </div>
          {/* Fade out effect for bottom half */}
          <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[#0a1320] via-[#0a1320]/80 to-transparent z-20"></div>
          {/* ATM Image - positioned to show top half and hide bottom */}
          <img
            src="/atm-image.png"
            alt="Bitcoin ATM"
            className="absolute top-[15%] left-0 right-0 z-10 mx-auto h-[140%] w-auto object-cover"
          />
        </div>

        {/* Text positioned to overlap bottom of image */}
        <div className="text-center -mt-20 md:-mt-24 lg:-mt-28 relative z-30">
          <h1
            className="text-3xl md:text-5xl lg:text-[4.5rem] font-normal text-white leading-tight"
            style={{ fontFamily: "Ivy Presto, serif" }}
          >
            Canada's trusted Bitcoin
            <br />
            ATM network
          </h1>
        </div>
      </div>

      {/* Second content: "Buy Bitcoin in Minutes, Not Hours" */}
      <div
        ref={secondTextRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="relative text-center">
          <h1
            className="text-3xl md:text-5xl lg:text-[4.5rem] font-normal text-white leading-tight"
            style={{ fontFamily: "Ivy Presto, serif" }}
          >
            Buy Bitcoin
            <span className="inline-block mx-4 align-middle w-36 h-36">
              <CryptoModel3D
                modelPath="/Bitcoin.glb"
                className="w-full h-full"
              />
            </span>
            in{" "}
            <span className="bg-gradient-to-r from-[#7fa1ff] via-[#a8c0ff] to-[#7fa1ff] bg-clip-text text-transparent font-medium">
              Minutes
            </span>
            <br />
            Not Hours
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-16 max-w-2xl mx-auto leading-relaxed">
            We're reimagining crypto trading to accelerate your success
          </p>
        </div>
      </div>

      {/* Buttons - Always visible */}
      <div className="absolute inset-x-0 bottom-80 flex justify-center z-10">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#app"
            className="inline-flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-900 font-medium min-w-[140px] justify-center hover:bg-white transition-all duration-300"
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

      {/* Stats and Logo Banner - Always visible at bottom */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 py-4 px-4 sm:px-6 lg:px-8"
        style={{ background: "none", backgroundColor: "transparent" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div
          className="max-w-7xl mx-auto"
          style={{ background: "none", backgroundColor: "transparent" }}
        >
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
                <div className="text-gray-400 text-xs">Verified users</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl font-bold text-white opacity-70">
                  230+
                </div>
                <div className="text-gray-400 text-xs">ATMs across Canada</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xl md:text-2xl font-bold text-white opacity-70">
                  $24M
                </div>
                <div className="text-gray-400 text-xs">
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
    </div>
  );
};

export default ScrollHero;

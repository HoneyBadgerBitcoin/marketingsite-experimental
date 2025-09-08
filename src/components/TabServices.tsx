import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ATMMapWrapper from "./ATMMapWrapper";

interface TabContent {
  id: string;
  title: string;
  heading: string;
  description: string;
  features: string[];
  ctaText: string;
  highlights?: string[];
  media: {
    type: "image" | "video" | "map";
    src: string;
    alt?: string;
  };
}

const tabContents: TabContent[] = [
  {
    id: "buy-online",
    title: "Buy Online",
    heading: "Buy Bitcoin & Crypto Online",
    description:
      "Get instant access to Bitcoin, Ethereum, Litecoin with our secure online platform. Buy, sell, and trade crypto with competitive fees and 24/7 support.",
    features: [
      "Instant transactions with e-Transfer",
      "Competitive and transparent fees",
      "Secure wallet integration",
    ],
    highlights: ["BTC, ETH, LTC", "CAD e-Transfer", "Trusted by 60,000+"],
    ctaText: "Start Buying Online",
    media: {
      type: "image",
      src: "/business-1.png",
      alt: "Online crypto trading platform",
    },
  },
  {
    id: "find-atm",
    title: "Find an ATM",
    heading: "Find a Bitcoin ATM Near You",
    description:
      "Access our network of Bitcoin ATMs across Canada. Buy and sell crypto with cash at convenient locations near you.",
    features: [
      "230+ ATM locations nationwide",
      "Buy with cash instantly",
      "No KYC for transactions under $1000",
    ],
    highlights: ["Cash purchases", "Near you", "Quick and easy"],
    ctaText: "Locate ATM",
    media: {
      type: "video",
      src: "/crypto-hero.webm",
      alt: "Bitcoin ATM location map",
    },
  },
  {
    id: "guided-purchase",
    title: "OTC Desk",
    heading: "Personalized Crypto Assistance",
    description:
      "New to crypto? Our expert team provides personalized guidance through your first purchase and beyond.",
    features: [
      "One-on-one expert consultation",
      "Step-by-step purchase guidance",
      "Ongoing portfolio support",
    ],
    highlights: ["1:1 guidance", "Human support", "Secure onboarding"],
    ctaText: "Get Expert Help",
    media: {
      type: "image",
      src: "/business-3.png",
      alt: "Expert crypto consultation",
    },
  },
];

export default function TabServices() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const currentContent = tabContents[activeTab];

  // Auto-switch tabs
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabContents.length);
      }, 12000); // Switch every 12 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, tabContents.length]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setIsPaused(true);

    // Resume after 90 seconds of inactivity
    setTimeout(() => {
      setIsPaused(false);
    }, 90000);
  };

  const handleContentHover = () => {
    setIsPaused(true);
  };

  const handleContentLeave = () => {
    setIsPaused(false);
  };

  // Preload images to prevent jumping
  useEffect(() => {
    tabContents.forEach((tab) => {
      if (tab.media.type === "image") {
        const img = new Image();
        img.src = tab.media.src;
      }
    });
  }, []);

  return (
    <section className="py-28 md:py-36 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-4">
            Explore what's possible
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect way to buy cryptocurrency that fits your needs
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex bg-gray-50 p-1 pr-2">
            {/* Sliding pill indicator */}
            <motion.div
              className="absolute h-[calc(100%-8px)] bg-white shadow-lg"
              initial={false}
              animate={{
                x: activeTab === 0 ? 0 : activeTab === 1 ? 158 : 316,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                width: "156px",
                top: "4px",
                left: "4px",
              }}
            />

            {tabContents.map((tab, index) => (
              <button
                key={tab.id}
                onMouseEnter={() => handleTabClick(index)}
                onClick={() => handleTabClick(index)}
                className={`
                  relative z-10 px-8 py-3 text-lg font-medium transition-colors duration-200 whitespace-nowrap
                  ${
                    activeTab === index
                      ? "text-accent-600"
                      : "text-gray-600 hover:text-gray-900"
                  }
                `}
                style={{ width: "156px" }}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          <div className="relative min-h-[680px] md:min-h-[720px]">
            {tabContents.map((content, index) => (
              <div
                key={content.id}
                className={`absolute inset-0 grid lg:grid-cols-2 gap-48 items-stretch transition-opacity duration-300 ${
                  activeTab === index
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
                onMouseEnter={handleContentHover}
                onMouseLeave={handleContentLeave}
              >
                {/* Text Content */}
                <div className="flex items-start">
                  <div className="flex flex-col w-full">
                    <h3 className="text-3xl text-gray-900 mb-6">
                      {content.heading}
                    </h3>
                    <p className="text-base text-gray-600 mb-4 md:mb-6">
                      {content.description}
                    </p>

                    {content.highlights && (
                      <div className="flex flex-wrap gap-3 mt-2 mb-2">
                        {content.highlights.map((h, i) => (
                          <span
                            key={`${content.id}-highlight-${i}`}
                            className="px-3 py-1 bg-accent-50 text-accent-700 text-sm font-medium"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-5 md:space-y-6 mt-8 mb-10">
                      {content.features.map((feature, featureIndex) => (
                        <div
                          key={`${content.id}-${featureIndex}`}
                          className="flex items-start gap-4"
                        >
                          <div className="w-6 h-6 bg-accent-600 flex items-center justify-center flex-shrink-0 mt-1">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-base text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {content.id === "find-atm" ? (
                      <a href="/find-atm" className="btn-primary mt-6 md:mt-8">
                        {content.ctaText} →
                      </a>
                    ) : (
                      <a href="#" className="btn-primary mt-6 md:mt-8">
                        {content.ctaText} →
                      </a>
                    )}
                  </div>
                </div>

                {/* Media Content */}
                <div className="relative flex items-start">
                  <div className="h-[520px] md:h-[560px] w-full overflow-hidden shadow-xl">
                    {content.media.type === "map" ? (
                      <ATMMapWrapper />
                    ) : content.media.type === "video" ? (
                      <video
                        src={content.media.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={content.media.src}
                        alt={content.media.alt}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

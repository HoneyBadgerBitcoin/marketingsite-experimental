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
      "HB gives you secure online access to digital assets. No clutter, no confusion.",
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
    title: "Buy at an ATM",
    heading: "Find a Bitcoin ATM Near You",
    description:
      "Find the nearest ATM from our network of 230+ machines",
    features: [
      "230+ ATM locations nationwide",
      "Buy with cash instantly",
      "No KYC for transactions under $1000"
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
    title: "Guided Purchase",
    heading: "Personalized Crypto Assistance",
    description:
      "Making a large purchase or want dedicated support? Connect with our team for a secure, personalized experience built around you.",
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

export default function ServicesSection() {
  return (
    <section className="py-28 md:py-36 bg-[#0a1320]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Explore what's possible
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect way to buy cryptocurrency that fits your needs
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-4">
          {/* Buy Online Block */}
          <div 
            className="relative p-8 rounded-xl border border-white/[0.03] hover:border-white/[0.08] transition-all duration-300 overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 19, 32, 0.75) 0%, rgba(15, 25, 40, 0.75) 50%, rgba(10, 19, 32, 0.75) 100%)',
              backgroundImage: 'linear-gradient(135deg, rgba(10, 19, 32, 0.75) 0%, rgba(15, 25, 40, 0.75) 50%, rgba(10, 19, 32, 0.75) 100%), url(/background-silver.png)',
              backgroundBlendMode: 'normal, overlay',
              backgroundSize: 'cover',
            }}
          >
            <div className="relative z-10 flex gap-8">
              <div className="flex items-center relative min-w-[200px] p-4">
                <h3 className="text-3xl font-bold text-white whitespace-nowrap">
                  Buy<br />
                  <span className="relative inline-block">
                    Online
                    <div className="absolute left-0 -bottom-2 w-full h-1 bg-accent-400/60"></div>
                  </span>
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Buy Bitcoin & Crypto Online</span> — HB gives you secure online access to digital assets. No clutter, no confusion.
                </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-white/5 text-accent-300 text-sm font-medium rounded-md border border-white/10">
                  BTC, ETH, LTC
                </span>
                <span className="px-3 py-1.5 bg-white/5 text-accent-300 text-sm font-medium rounded-md border border-white/10">
                  CAD e-Transfer
                </span>
                <span className="px-3 py-1.5 bg-white/5 text-accent-300 text-sm font-medium rounded-md border border-white/10">
                  Trusted by 60,000+
                </span>
              </div>
              <div className="mt-2">
                <a href="#" className="inline-flex items-center text-accent-400 hover:text-accent-300 font-medium transition-colors">
                  Learn More →
                </a>
              </div>
              </div>
            </div>
          </div>

          {/* Find an ATM Block */}
          <div 
            className="relative p-8 rounded-xl border border-white/[0.03] hover:border-white/[0.08] transition-all duration-300 overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 19, 32, 0.75) 0%, rgba(15, 25, 40, 0.75) 50%, rgba(10, 19, 32, 0.75) 100%)',
              backgroundImage: 'linear-gradient(135deg, rgba(10, 19, 32, 0.75) 0%, rgba(15, 25, 40, 0.75) 50%, rgba(10, 19, 32, 0.75) 100%), url(/background-gold.png)',
              backgroundBlendMode: 'normal, overlay',
              backgroundSize: 'cover',
            }}
          >
            <div className="relative z-10 flex gap-8">
              <div className="flex items-center relative min-w-[200px] p-4">
                <h3 className="text-3xl font-bold text-white whitespace-nowrap">
                  Buy at an<br />
                  <span className="relative inline-block">
                    ATM
                    <div className="absolute left-0 -bottom-2 w-full h-1 bg-amber-400/60"></div>
                  </span>
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Find a Bitcoin ATM Near You</span> — Find the nearest ATM from our network of 220+ machines.
                </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-white/5 text-amber-300 text-sm font-medium rounded-md border border-white/10">
                  Cash purchases
                </span>
                <span className="px-3 py-1.5 bg-white/5 text-amber-300 text-sm font-medium rounded-md border border-white/10">
                  Near you
                </span>
                <span className="px-3 py-1.5 bg-white/5 text-amber-300 text-sm font-medium rounded-md border border-white/10">
                  Quick and easy
                </span>
              </div>
              <div className="mt-2">
                <a href="/find-atm" className="inline-flex items-center text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Learn More →
                </a>
              </div>
              </div>
            </div>
          </div>

          {/* Guided Purchase Block */}
          <div 
            className="relative p-8 rounded-xl border border-white/[0.03] hover:border-white/[0.08] transition-all duration-300 overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 19, 32, 0.75) 0%, rgba(15, 25, 40, 0.75) 50%, rgba(10, 19, 32, 0.75) 100%)',
              backgroundImage: 'linear-gradient(135deg, rgba(10, 19, 32, 0.75) 0%, rgba(15, 25, 40, 0.75) 50%, rgba(10, 19, 32, 0.75) 100%), url(/background-black.png)',
              backgroundBlendMode: 'normal, overlay',
              backgroundSize: 'cover',
            }}
          >
            <div className="relative z-10 flex gap-8">
              <div className="flex items-center relative min-w-[200px] p-4">
                <h3 className="text-3xl font-bold text-white whitespace-nowrap">
                  Guided<br />
                  <span className="relative inline-block">
                    Purchase
                    <div className="absolute left-0 -bottom-2 w-full h-1 bg-emerald-400/60"></div>
                  </span>
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Personalized Crypto Assistance</span> — Making a large purchase or want dedicated support? Connect with our team for a secure, personalized experience built around you.
                </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-white/5 text-emerald-300 text-sm font-medium rounded-md border border-white/10">
                  1:1 guidance
                </span>
                <span className="px-3 py-1.5 bg-white/5 text-emerald-300 text-sm font-medium rounded-md border border-white/10">
                  Human support
                </span>
                <span className="px-3 py-1.5 bg-white/5 text-emerald-300 text-sm font-medium rounded-md border border-white/10">
                  Secure onboarding
                </span>
              </div>
              <div className="mt-2">
                <a href="#" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                  Learn More →
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Feature {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
}

const features: Feature[] = [
  {
    id: "security",
    category: "SECURITY",
    title: "Robust Security",
    description:
      "Your security is our priority. We use encrypted systems, multi-factor authentication, and secure infrastructure to protect your assets and data.",
    image: "/sq-blue-badger-shield.png",
    gradient: "#1a1d24",
  },
  {
    id: "checking",
    category: "PRODUCT UPDATE",
    title: "FINTRAC Compliance",
    description:
      "Committed to legal and financial standards, we are registered with FINTRAC and Revenu Québec. We employ extensive KYC procedures.",
    image: "/fintrac-1.png",
    gradient: "#1a1d24",
  },
  {
    id: "analytics",
    category: "MULTI-CHAIN",
    title: "Expert Support",
    description:
      "Count on our team of experts to navigate buying and selling in the crypto landscape. Our team provides support within 24 hours.",
    image: "/24h-blue.png",
    gradient: "#1a1d24",
  },
  {
    id: "transfers",
    category: "DISCOVER",
    title: "Versatile Options",
    description:
      "Transact your way online, at an ATM, or directly with our team. Choose from cash, wire transfers, and more.",
    image: "/support-growth-super-blue.png",
    gradient: "#1a1d24",
  },
];

export default function FeatureGrid() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px 0px",
    threshold: 0.1,
  });

  return (
    <section
      className="pt-20 pb-36 bg-[#080f18] relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background gradient/lighting effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(37,99,235,0.15), transparent 70%)",
          opacity: "0.85",
        }}
      ></div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(800px 400px at 50% 0%, rgba(59,130,246,0.1), transparent 70%)",
          opacity: "0.75",
        }}
      ></div>
      {/* Darken the rest of the background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.6) 100%)",
        }}
      ></div>

      <div className="container-custom relative z-10">
        {/* Title Section */}
        <div className="text-center mb-24 pt-12">
          <motion.h2
            className="text-4xl md:text-5xl font-medium text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Canada's{" "}
            <span className="bg-gradient-to-r from-[#7fa1ff] via-white to-[#7fa1ff] bg-clip-text text-transparent">
              #1 noncustodial
            </span>{" "}
            digital asset platform
          </motion.h2>
          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Unlike traditional exchanges, we never hold your funds. Your
            transfer directly to you, reducing risks and boosting security.
          </motion.p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl transition-all duration-500"
              style={{
                minHeight: "500px",
                backgroundColor: feature.gradient,
              }}
            >
              {/* Background Image with Gradient Mask */}
              <div className="absolute inset-0">
                <div className="relative w-full h-full">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle Gradient Mask Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      maskImage:
                        "linear-gradient(to top, #000000 0%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to top, #000000 0%, transparent 100%)",
                      background:
                        "linear-gradient(to top, rgba(26,29,36,0.95) 0%, transparent 100%)",
                      opacity: 0.9,
                    }}
                  />
                </div>
              </div>

              {/* Content Container */}
              <div className="relative h-full flex flex-col justify-end p-8 z-10">
                {/* Bottom Section - Text */}
                <div className="space-y-2" style={{ userSelect: "text" }}>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

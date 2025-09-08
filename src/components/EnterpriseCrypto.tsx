import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Shield,
  BadgeCheck,
  HeadphonesIcon,
  Globe,
  CreditCard,
  Wallet,
  Star,
  ChartBar,
  Users,
} from "lucide-react";

const EnterpriseCrypto = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px 0px",
    threshold: 0.3,
  });

  const tabs = [
    {
      id: "features",
      label: "Features",
      icon: <ChartBar className="w-5 h-5" />,
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  // Features with integrated stats
  const features = [
    {
      icon: Shield,
      title: "Robust Security",
      text: "Your security is our priority. We use encrypted systems, multi-factor authentication, and secure infrastructure to protect your assets and data.",
      stat: { value: 99.9, suffix: "%", label: "Uptime" },
    },
    {
      icon: BadgeCheck,
      title: "FINTRAC Compliance",
      text: "Committed to legal and financial standards, we are registered with FINTRAC and Revenu Québec. We employ extensive KYC procedures.",
      stat: { value: 60000, suffix: "+", label: "Verified Users" },
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      text: "Count on our team of experts to navigate buying and selling in the crypto landscape. Our team provides support within 24 hours.",
      stat: { value: 24, suffix: "h", label: "Response Time" },
    },
    {
      icon: Globe,
      title: "Nationwide Network",
      text: "230+ ATMs across Canada with 99.9% uptime and instant transactions for convenient cash-to-crypto conversions at locations near you.",
      stat: { value: 230, suffix: "+", label: "ATMs in Canada" },
    },
    {
      icon: CreditCard,
      title: "Versatile Options",
      text: "Transact your way online, at an ATM, or directly with our team. Choose from cash, wire transfers, and more payment methods.",
      stat: { value: 24, suffix: "M", label: "Quarterly Volume", prefix: "$" },
    },
    {
      icon: Wallet,
      title: "Non-Custodial Platform",
      text: "Unlike traditional exchanges, we never hold your funds. Your transfers go directly to you, reducing risks and boosting security.",
      stat: { value: 100, suffix: "%", label: "Direct Transfers" },
    },
  ];

  // User reviews data
  const testimonials = [
    {
      id: 1,
      text: "One of the only Canadian options. Great customer service. And the app is easy to use. Never given me issues yet.",
      author: "joe stone",
      source: "Google Play Store",
      avatar: "https://ui-avatars.com/api/?name=JS&background=7fa1ff&color=fff",
      rating: 5,
    },
    {
      id: 2,
      text: "Life is like a sandwich, no matter how you flip it, the bread comes first. Thank you for a platform to help me get it! 🍞",
      author: "Costa prava",
      source: "Apple App Store",
      avatar: "https://ui-avatars.com/api/?name=CP&background=7fa1ff&color=fff",
      rating: 5,
    },
    {
      id: 3,
      text: "Very nice, clean interface for anyone just getting into crypto this is a great place to start.",
      author: "Jonathan Watts",
      source: "Google Play Store",
      avatar: "https://ui-avatars.com/api/?name=JW&background=7fa1ff&color=fff",
      rating: 5,
    },
    {
      id: 4,
      text: "This Is Definitely One of the Best Exchanges For Canadians. Very Simple and easy!",
      author: "Dendvwg",
      source: "Apple App Store",
      avatar: "https://ui-avatars.com/api/?name=DV&background=7fa1ff&color=fff",
      rating: 5,
    },
    {
      id: 5,
      text: "Love the new app! Makes it's so much easier for newbies like me to trade crypto!",
      author: "@MoAlkhooly",
      source: "Twitter",
      avatar: "https://ui-avatars.com/api/?name=MA&background=7fa1ff&color=fff",
      rating: 5,
    },
    {
      id: 6,
      text: "Much Wow. Such Good",
      author: "Jeshua Williams",
      source: "Apple App Store",
      avatar: "https://ui-avatars.com/api/?name=JW&background=7fa1ff&color=fff",
      rating: 5,
    },
  ];

  // Auto-switch tabs
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }, 12000); // Switch every 12 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, tabs.length]);

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

  // Tilt effect for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    handleContentLeave();
  };

  return (
    <section
      className="min-h-screen flex items-center py-16 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a1320]"></div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 20% 80%, rgba(2,78,179,0.35), transparent 60%), radial-gradient(800px 420px at 90% 30%, rgba(61,127,255,0.35), transparent 60%), radial-gradient(1200px 600px at 50% 0%, rgba(2,51,119,0.35), transparent 70%)",
        }}
      ></div>

      <div className="container-custom relative w-full">
        {/* Title Section */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-medium text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Built for{" "}
            <span className="bg-gradient-to-r from-[#7fa1ff] via-white to-[#7fa1ff] bg-clip-text text-transparent">
              crypto at scale
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From high‑volume ATMs to institutional OTC, HoneyBadger delivers the
            reliability, security, and compliance required to operate crypto
            infrastructure at national scale.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="relative inline-flex bg-white/10 backdrop-blur-sm p-1 pr-2">
            {/* Sliding pill indicator */}
            <motion.div
              className="absolute h-[calc(100%-8px)] bg-white shadow-lg"
              initial={false}
              animate={{
                x: activeTab * 140,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                width: "136px",
                top: "4px",
                left: "4px",
              }}
            />

            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onMouseEnter={() => handleTabClick(index)}
                onClick={() => handleTabClick(index)}
                className={`
                  relative z-10 flex items-center justify-center gap-2 px-8 py-3 transition-colors duration-200
                  ${
                    activeTab === index
                      ? "text-[#0a1320] font-medium"
                      : "text-white/90 hover:text-white font-medium"
                  }
                `}
                style={{ width: "136px" }}
              >
                {React.cloneElement(tab.icon, {
                  className: `w-5 h-5 ${
                    activeTab === index ? "" : "opacity-70"
                  }`,
                })}
                <span className="text-lg">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative" style={{ minHeight: "720px" }}>
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="features"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white/6 hover:bg-white/10 border border-white/10 backdrop-blur-sm p-8 text-white transition-all duration-300 min-h-[320px] flex flex-col hover:shadow-[0_20px_40px_rgba(127,161,255,0.2)] cursor-pointer"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleContentHover}
                        style={{
                          transformStyle: "preserve-3d",
                          transition: "transform 0.1s ease-out",
                        }}
                      >
                        <div
                          className="flex flex-col gap-4 h-full"
                          style={{ transform: "translateZ(20px)" }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex-shrink-0">
                                <Icon className="w-7 h-7 text-[#7fa1ff]" />
                              </div>
                              <h3 className="font-bold text-white text-xl">
                                {feature.title}
                              </h3>
                            </div>
                          </div>

                          {/* Integrated Stat */}
                          {feature.stat && (
                            <div className="pt-3 pr-3 pb-3 text-left">
                              <div className="text-2xl font-bold text-[#7fa1ff]">
                                {feature.stat.prefix}
                                {isInView && (
                                  <Counter end={feature.stat.value} />
                                )}
                                {feature.stat.suffix}
                              </div>
                              <div className="text-xs text-white/70 mt-1">
                                {feature.stat.label}
                              </div>
                            </div>
                          )}

                          <div className="flex-1">
                            <p className="text-base text-white/90 leading-relaxed">
                              {feature.text}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="reviews"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/6 hover:bg-white/10 border border-white/10 backdrop-blur-sm p-8 transition-all duration-300 min-h-[320px] flex flex-col hover:shadow-[0_20px_40px_rgba(127,161,255,0.2)] cursor-pointer"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onMouseEnter={handleContentHover}
                      style={{
                        transformStyle: "preserve-3d",
                        transition: "transform 0.1s ease-out",
                      }}
                    >
                      <div
                        className="flex flex-col gap-4 h-full"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            className="w-12 h-12 border-2 border-white/20"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">
                              {testimonial.author}
                            </h4>
                            <p className="text-sm text-white/60">
                              {testimonial.source}
                            </p>
                            <div className="flex gap-0.5 mt-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-[#7fa1ff] fill-current"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-white/90 leading-relaxed italic">
                            "{testimonial.text}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Counter component for animated numbers
const Counter = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1500;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  // Handle decimal numbers
  if (end % 1 !== 0) {
    return (
      <span>
        {count === Math.floor(end) ? end.toFixed(1) : count.toFixed(1)}
      </span>
    );
  }

  return <span>{count.toLocaleString()}</span>;
};

export default EnterpriseCrypto;

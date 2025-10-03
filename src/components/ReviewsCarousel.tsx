import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  source: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Very happy how much easier it is to transfer money via e-transfer. Other apps took days, but with HoneyBadger it's ready in 2 hours!",
    author: "benjamenj sbent",
    source: "Apple App Store",
    avatar: "https://ui-avatars.com/api/?name=BS&background=3d7fff&color=fff",
  },
  {
    id: 2,
    text: "Love this app, was recommended it by both a family member and personal friends of mine to use Newton and I can't find any Cons, just Pros.",
    author: "Ali Boombaye",
    source: "Apple App Store",
    avatar: "https://ui-avatars.com/api/?name=AB&background=3d7fff&color=fff",
  },
  {
    id: 3,
    text: "Very well set up, for ease of depositing, transfering and trading crypto. The app is beatifully designed for maximum esthetics. security of the login process is top notch. If this app was a person, I would ask him/her to marry me!",
    author: "Reid Hosking",
    source: "Google Play Store",
    avatar: "https://ui-avatars.com/api/?name=RH&background=3d7fff&color=fff",
  },
  {
    id: 4,
    text: "One of the only Canadian options. Great customer service. And the app is easy to use. Never given me issues yet.",
    author: "joe stone",
    source: "Google Play Store",
    avatar: "https://ui-avatars.com/api/?name=JS&background=3d7fff&color=fff",
  },
  {
    id: 5,
    text: "Life is like a sandwich, no matter how you flip it, the bread comes first. Thank you for a platform to help me get it! 🍞",
    author: "Costa prava",
    source: "Apple App Store",
    avatar: "https://ui-avatars.com/api/?name=CP&background=3d7fff&color=fff",
  },
  {
    id: 6,
    text: "Very nice, clean interface for anyone just getting into crypto this is a great place to start.",
    author: "Jonathan Watts",
    source: "Google Play Store",
    avatar: "https://ui-avatars.com/api/?name=JW&background=3d7fff&color=fff",
  },
  {
    id: 7,
    text: "This Is Definitely One of the Best Exchanges For Canadians. Very Simple and easy! If people have problems with it, it must because you're doing something wrong.",
    author: "Dendvwg",
    source: "Apple App Store",
    avatar: "https://ui-avatars.com/api/?name=DV&background=3d7fff&color=fff",
  },
  {
    id: 8,
    text: "Love the new app! Makes it's so much easier for newbies like me to trade crypto!",
    author: "@MoAlkhooly",
    source: "Twitter",
    avatar: "https://ui-avatars.com/api/?name=MA&background=3d7fff&color=fff",
  },
  {
    id: 9,
    text: "Much Wow. Such Good",
    author: "Jeshua Williams",
    source: "Apple App Store",
    avatar: "https://ui-avatars.com/api/?name=JW&background=3d7fff&color=fff",
  },
];

export default function ReviewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px 0px",
    threshold: 0.1,
  });

  // Calculate how many reviews to show per slide (3 per slide)
  const reviewsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / reviewsPerSlide);


  const handlePrevious = () => {
    const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    setPrevSlide(currentSlide);
    setCurrentSlide(newSlide);
  };

  const handleNext = () => {
    const newSlide = (currentSlide + 1) % totalSlides;
    setPrevSlide(currentSlide);
    setCurrentSlide(newSlide);
  };

  const handleDotClick = (index: number) => {
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
  };

  const getCurrentReviews = () => {
    const startIndex = currentSlide * reviewsPerSlide;
    return testimonials.slice(startIndex, startIndex + reviewsPerSlide);
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "#030508" }}
      ref={containerRef}
    >
      {/* Dark gradient overlay for smooth transition */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #020304 0%, #030508 25%)"
        }}
      ></div>
      {/* Subtle bottom lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(1200px 600px at 50% 100%, rgba(37,99,235,0.15), transparent 70%)"
        }}
      ></div>

      <div className="container-custom relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">
            Don't take our word for it
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Read what customers have to say about HoneyBadger.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Reviews Grid */}
          <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{
                    opacity: 0,
                    x: (() => {
                      if (currentSlide === prevSlide) return 0;
                      // Handle wrapping cases
                      if (currentSlide === 0 && prevSlide === totalSlides - 1) return 100;
                      if (currentSlide === totalSlides - 1 && prevSlide === 0) return -100;
                      return currentSlide > prevSlide ? 100 : -100;
                    })()
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    opacity: 0,
                    x: (() => {
                      if (currentSlide === prevSlide) return 0;
                      // Handle wrapping cases
                      if (currentSlide === 0 && prevSlide === totalSlides - 1) return -100;
                      if (currentSlide === totalSlides - 1 && prevSlide === 0) return 100;
                      return currentSlide > prevSlide ? -100 : 100;
                    })()
                  }}
                  transition={{ duration: 0.25 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                {getCurrentReviews().map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl p-8 transition-all duration-300 flex flex-col"
                    style={{ height: "400px" }}
                  >
                    {/* Quote Icon */}
                    <div className="text-6xl text-white/20 leading-none mb-4 font-serif">
                      "
                    </div>

                    {/* Review Text */}
                    <p className="text-white/80 text-base leading-relaxed mb-6 flex-grow line-clamp-4">
                      {testimonial.text}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-white text-base uppercase">
                          {testimonial.author}
                        </p>
                        <p className="text-white/60 text-sm uppercase tracking-wide">
                          {testimonial.source === "Apple App Store" && "via App Store"}
                          {testimonial.source === "Google Play Store" && "via Play Store"}
                          {testimonial.source === "Twitter" && "via Twitter"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-8 h-3 bg-white"
                      : "w-3 h-3 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

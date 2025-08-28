import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation configurations
export const animationConfig = {
  // Hero animations
  hero: {
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1
  },
  
  // Section reveal animations
  reveal: {
    duration: 0.6,
    ease: "power2.out",
    y: 50,
    opacity: 0
  },
  
  // Stagger animations for cards/items
  stagger: {
    duration: 0.5,
    ease: "power2.out",
    y: 30,
    opacity: 0,
    stagger: 0.1
  },
  
  // Parallax effect
  parallax: {
    ease: "none"
  }
};

// Initialize all animations
export function initAnimations() {
  initHeroAnimations();
  initSectionRevealAnimations();
  initStaggerAnimations();
  initParallaxAnimations();
  initCardHoverAnimations();
  initButtonAnimations();
}

// Hero section animations
export function initHeroAnimations() {
  const heroSection = document.querySelector('[data-anim="hero"]');
  if (!heroSection) return;
  
  const tl = gsap.timeline();
  
  // Animate hero text lines with split reveal effect
  tl.from('[data-anim="hero-line-1"]', {
    duration: 0.8,
    y: 100,
    opacity: 0,
    ease: "power3.out",
    stagger: 0.1
  })
  .from('[data-anim="hero-line-2"]', {
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)"
  }, "-=0.5")
  .from('[data-anim="hero-line-3"]', {
    duration: 0.8,
    y: 100,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.4")
  .from('[data-anim="hero-subtitle"]', {
    duration: 0.6,
    y: 30,
    opacity: 0,
    ease: "power2.out"
  }, "-=0.2")
  .from('[data-anim="hero-button-1"], [data-anim="hero-button-2"]', {
    duration: 0.5,
    y: 20,
    opacity: 0,
    ease: "back.out(1.7)",
    stagger: 0.1
  }, "-=0.1")
  .from('[data-anim="hero-stats"] .glass-card', {
    duration: 0.6,
    y: 40,
    opacity: 0,
    ease: "power2.out",
    stagger: 0.1
  }, "-=0.2");
  
  // Animate hero image with bounce effect
  gsap.from('[data-anim="hero-image"]', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.2)",
    delay: 0.5
  });
}

// Section reveal animations
export function initSectionRevealAnimations() {
  const revealElements = document.querySelectorAll('[data-anim="reveal"]');
  
  revealElements.forEach(element => {
    gsap.set(element, { y: 50, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      onEnter: () => {
        gsap.to(element, {
          duration: 0.6,
          y: 0,
          opacity: 1,
          ease: "power2.out"
        });
      }
    });
  });
}

// Stagger animations for cards and grid items
export function initStaggerAnimations() {
  const staggerElements = document.querySelectorAll('[data-anim="stagger"]');
  
  staggerElements.forEach(container => {
    const items = container.children;
    gsap.set(items, { y: 30, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(items, {
          duration: 0.5,
          y: 0,
          opacity: 1,
          ease: "power2.out",
          stagger: 0.1
        });
      }
    });
  });
}

// Parallax animations
export function initParallaxAnimations() {
  const parallaxElements = document.querySelectorAll('[data-anim="parallax"]');
  
  parallaxElements.forEach(element => {
    gsap.to(element, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}

// Card hover animations
export function initCardHoverAnimations() {
  const cards = document.querySelectorAll('.card-hover-cyber, .glass-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.3,
        y: -8,
        rotationX: 2,
        rotationY: 1,
        scale: 1.02,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.3,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "power2.out"
      });
    });
  });
}

// Button animations
export function initButtonAnimations() {
  const buttons = document.querySelectorAll('.btn-cyber, .btn-cyber-secondary, .btn-cyber-accent');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        duration: 0.2,
        y: -2,
        scale: 1.05,
        ease: "power2.out"
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        duration: 0.2,
        y: 0,
        scale: 1,
        ease: "power2.out"
      });
    });
    
    button.addEventListener('mousedown', () => {
      gsap.to(button, {
        duration: 0.1,
        y: 1,
        scale: 0.98,
        ease: "power2.out"
      });
    });
    
    button.addEventListener('mouseup', () => {
      gsap.to(button, {
        duration: 0.1,
        y: -2,
        scale: 1.05,
        ease: "power2.out"
      });
    });
  });
}

// Specific animation functions for different sections
export function animateCarousel(container) {
  const items = container.querySelectorAll('.carousel-item');
  
  gsap.set(items, { x: 100, opacity: 0 });
  
  ScrollTrigger.create({
    trigger: container,
    start: "top 75%",
    onEnter: () => {
      gsap.to(items, {
        duration: 0.6,
        x: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.15
      });
    }
  });
}

export function animateAccordion(container) {
  const items = container.querySelectorAll('.accordion-item');
  
  gsap.set(items, { y: 20, opacity: 0 });
  
  ScrollTrigger.create({
    trigger: container,
    start: "top 80%",
    onEnter: () => {
      gsap.to(items, {
        duration: 0.4,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.1
      });
    }
  });
}

// Utility function to create neon glow effect
export function createNeonGlowEffect(element, color = '#00F0FF') {
  gsap.to(element, {
    duration: 2,
    textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1
  });
}

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initAnimations);
  
  // Refresh ScrollTrigger on window resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}

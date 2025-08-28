import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px 0px',
    threshold: 0.3
  });

  const stats = [
    { value: 60000, suffix: '+', label: 'Verified Users' },
    { value: 220, suffix: '+', label: 'ATMs Across Canada' },
    { value: 24, suffix: 'M', label: 'Quarterly Volume', prefix: '$' },
    { value: 99.9, suffix: '%', label: 'Uptime' },
  ];


  return (
    <section className="py-20">
      <div className="container-custom">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8" ref={ref}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1 
              } : {}}
              transition={{ 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
              }}
              className="text-center"
            >
              <motion.div 
                className="text-4xl md:text-5xl font-medium text-accent-600"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3
                }}
              >
                {stat.prefix}
                {isInView && <Counter end={stat.value} />}
                {stat.suffix}
              </motion.div>
              <motion.p 
                className="mt-3 text-gray-600 text-base"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5
                }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Counter = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1000; // 1 second - doubled from 0.5s

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

  return <span>{count.toLocaleString()}</span>;
};

export default Stats;

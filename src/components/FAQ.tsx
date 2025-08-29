import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const faqs = [
    {
      question: "How do I purchase Bitcoin?",
      answer: "You can purchase Bitcoin at any of our 220+ ATM locations across Canada. Simply visit a HoneyBadger ATM, follow the on-screen instructions, insert cash, and provide your Bitcoin wallet address. The Bitcoin will be transferred to your wallet instantly."
    },
    {
      question: "How do beginners buy Bitcoins?",
      answer: "Beginners can start by downloading a Bitcoin wallet app, visiting one of our user-friendly ATM locations, and following the simple step-by-step process. Our ATMs are designed for first-time users with clear instructions and 24/7 support available if you need help."
    },
    {
      question: "Can you legally buy Bitcoin?",
      answer: "Yes, buying Bitcoin is completely legal in Canada. HoneyBadger is FINTRAC registered and fully compliant with all Canadian financial regulations. We operate under strict compliance standards to ensure all transactions are secure and legal."
    },
    {
      question: "What is the safest way to buy Bitcoin?",
      answer: "Using HoneyBadger ATMs is one of the safest ways to buy Bitcoin. Our ATMs are FINTRAC regulated, located in secure public locations, and don't require you to share personal banking information online. Plus, you receive your Bitcoin instantly to your own wallet."
    },
    {
      question: "How many Bitcoins are left?",
      answer: "Bitcoin has a maximum supply of 21 million coins. As of now, over 19 million Bitcoins have been mined, leaving less than 2 million left to be mined. The last Bitcoin is expected to be mined around the year 2140 due to the halving mechanism."
    },
    {
      question: "Can Bitcoin transactions be traced?",
      answer: "Bitcoin transactions are recorded on a public blockchain, making them traceable but pseudonymous. While transaction amounts and wallet addresses are visible, they don't directly reveal personal identities unless linked through other means. This provides transparency while maintaining privacy."
    },
    {
      question: "What is the minimum amount to invest in Bitcoin?",
      answer: "There's no official minimum to invest in Bitcoin since it's divisible up to 8 decimal places. At HoneyBadger ATMs, our minimum transaction amount varies by location but is typically around $20-50 CAD, making Bitcoin accessible to everyone regardless of budget."
    }
  ];

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-gray-900">
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            
            return (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 px-0 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <motion.div 
                    className="flex-shrink-0 text-accent-600"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Plus className="h-6 w-6" />
                  </motion.div>
                </button>
                
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{
                    maxHeight: isOpen ? "200px" : "0px",
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{
                    maxHeight: {
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98]
                    },
                    opacity: {
                      duration: 0.2,
                      delay: isOpen ? 0.1 : 0,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <div className="pb-6 pr-12">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

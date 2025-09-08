import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const faqs = [
    {
      question: "How do I purchase Bitcoin?",
      answer: "You can purchase Bitcoin at any of our 230+ ATM locations across Canada. Simply visit a HoneyBadger ATM, follow the on-screen instructions, insert cash, and provide your Bitcoin wallet address. The Bitcoin will be transferred to your wallet instantly."
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
      question: "What should I do if an ATM is not working?",
      answer: "If you encounter an ATM that's not working, please contact our 24/7 support team immediately at 1-800-BADGER or through our live chat. We'll help resolve the issue quickly and direct you to the nearest working ATM. Our technical team monitors all machines and can often resolve issues remotely."
    },
    {
      question: "How long do Bitcoin transactions take?",
      answer: "Bitcoin transactions from our ATMs are typically sent to your wallet immediately, but blockchain confirmations usually take 10-60 minutes. The time can vary based on network congestion and the transaction fee. You'll receive a confirmation receipt with your transaction ID for tracking."
    },
    {
      question: "What if I don't receive my Bitcoin?",
      answer: "If you don't receive your Bitcoin within 2 hours, contact our support team with your transaction receipt. We'll trace the transaction and resolve the issue immediately. All transactions are monitored, and we have a 99.9% success rate with instant resolution for any issues."
    },
    {
      question: "What payment methods do you accept?",
      answer: "Our ATMs accept cash in Canadian dollars. We also offer debit card purchases at select locations. For larger transactions, we provide OTC (over-the-counter) services that accept bank transfers and certified checks. Contact support for enterprise payment options."
    },
    {
      question: "Are there transaction limits?",
      answer: "Yes, for regulatory compliance, we have daily limits. Unverified users can transact up to $1,000 CAD per day. With basic verification, limits increase to $3,000 per day. For higher limits up to $10,000+ per day, complete our enhanced verification process through our app or website."
    },
    {
      question: "How can I find the nearest ATM?",
      answer: "Use our ATM locator on our website or mobile app to find the nearest location. Our interactive map shows real-time ATM status, operating hours, and available services. You can also filter by features like 24/7 access, debit card acceptance, or wheelchair accessibility."
    },
    {
      question: "What is the minimum amount to invest in Bitcoin?",
      answer: "There's no official minimum to invest in Bitcoin since it's divisible up to 8 decimal places. At HoneyBadger ATMs, our minimum transaction amount varies by location but is typically around $20-50 CAD, making Bitcoin accessible to everyone regardless of budget."
    },
    {
      question: "How do I contact customer support?",
      answer: "Our customer support is available 24/7/365 through multiple channels: call 1-800-BADGER, email support@honeybadger.io, or use our live chat feature on the website. For urgent ATM issues, our phone support provides the fastest response time, typically under 2 minutes."
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
    <section className="py-0">
      <div className="container-custom">
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

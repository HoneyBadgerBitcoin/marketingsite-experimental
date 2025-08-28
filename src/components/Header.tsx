import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown, 
  ShoppingCart, 
  MapPin, 
  HeadphonesIcon, 
  TrendingUp, 
  UserCheck, 
  Banknote, 
  Building2, 
  HelpCircle, 
  MessageCircle, 
  FileText, 
  Shield, 
  Wallet, 
  BookOpen
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  
  // Single state for which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const languages = [
    { code: "EN", label: "English", region: "Canada" },
    { code: "ES", label: "Español", region: "United States" },
    { code: "FR", label: "Français", region: "Canada" },
    { code: "DE", label: "Deutsch", region: "Germany" },
  ];

const buyItems = [
    { label: "Buy Online", href: "#buy-online", icon: ShoppingCart },
    { label: "Buy at ATM", href: "#buy-atm", icon: Banknote },
    { label: "OTC Desk", href: "#guided-purchase", icon: UserCheck },
  ];

  const sellItems = [
    { label: "Sell at ATM", href: "#sell-atm", icon: TrendingUp },
    { label: "Guided Sales", href: "#guided-sales", icon: HeadphonesIcon },
  ];

  const atmItems = [
    { label: "Find an ATM", href: "/find-atm", icon: MapPin },
    { label: "Host an ATM", href: "#host-atm", icon: Building2 },
  ];

  const learnItems = [
    { label: "About Us", href: "#about", icon: BookOpen },
    { label: "News", href: "#news", icon: FileText },
    { label: "Bitcoin Wallets", href: "#bitcoin-wallets", icon: Wallet },
    { label: "Fraud Education", href: "#fraud-education", icon: Shield },
    { label: "Terms and Conditions", href: "#terms-conditions", icon: FileText },
  ];

  const supportItems = [
    { label: "FAQ", href: "#faq", icon: HelpCircle },
    { label: "Contact Us", href: "#contact", icon: MessageCircle },
  ];

  return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full bg-[#141a1f] text-gray-200 z-50 ${openDropdown ? '' : 'border-b border-gray-800/50'}`}
        onMouseLeave={() => setOpenDropdown(null)}
      >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo-white.png" alt="HoneyBadger" className="h-11 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Buy Dropdown Button */}
            <button 
              className="flex items-center space-x-1 px-3 py-2 text-white transition-colors duration-200 hover:bg-white/5 text-lg font-semibold"
              onMouseEnter={() => setOpenDropdown('buy')}
            >
              <span>Buy</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {/* Sell Dropdown Button */}
            <button 
              className="flex items-center space-x-1 px-3 py-2 text-white transition-colors duration-200 hover:bg-white/5 text-lg font-semibold"
              onMouseEnter={() => setOpenDropdown('sell')}
            >
              <span>Sell</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {/* ATMs Dropdown Button */}
            <button 
              className="flex items-center space-x-1 px-3 py-2 text-white transition-colors duration-200 hover:bg-white/5 text-lg font-semibold"
              onMouseEnter={() => setOpenDropdown('atm')}
            >
              <span>ATMs</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {/* Support Dropdown Button */}
            <button 
              className="flex items-center space-x-1 px-3 py-2 text-white transition-colors duration-200 hover:bg-white/5 text-lg font-semibold"
              onMouseEnter={() => setOpenDropdown('support')}
            >
              <span>Support</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {/* Learn Dropdown Button */}
            <button 
              className="flex items-center space-x-1 px-3 py-2 text-white transition-colors duration-200 hover:bg-white/5 text-lg font-semibold"
              onMouseEnter={() => setOpenDropdown('learn')}
            >
              <span>Learn</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switch Button */}
            <button 
              className="flex items-center space-x-2 px-3 py-2 text-white transition-colors duration-200 hover:bg-white/5 text-base font-medium"
              onMouseEnter={() => setOpenDropdown('lang')}
            >
              <Globe className="h-5 w-5" />
              <span>{currentLanguage}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            <button className="px-4 py-2 text-white transition-colors duration-200 hover:bg-white/5 text-base font-medium">
              Log in
            </button>
            <a href="#contact" className="btn-pill text-base">Sign up</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-gray-800/50 bg-[#141a1f] text-gray-200"
        >
          <div className="container-custom py-4">
            <div className="py-2 border-b border-gray-100 mb-4">
              <div className="text-sm font-medium text-gray-500 mb-2">Buy</div>
              {buyItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2 pl-4 text-gray-700 hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="py-2 border-b border-gray-100 mb-4">
              <div className="text-sm font-medium text-gray-500 mb-2">Sell</div>
              {sellItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2 pl-4 text-gray-700 hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="py-2 border-t border-gray-100 mt-4">
              <div className="text-sm font-medium text-gray-500 mb-2">ATMs</div>
              {atmItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2 pl-4 text-gray-700 hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="py-2 border-t border-gray-100 mt-4">
              <div className="text-sm font-medium text-gray-500 mb-2">Support</div>
              {supportItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2 pl-4 text-gray-700 hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="py-2 border-t border-gray-100 mt-4">
              <div className="text-sm font-medium text-gray-500 mb-2">Learn</div>
              {learnItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2 pl-4 text-gray-700 hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="py-2 border-t border-gray-100 mt-4">
              <div className="text-sm font-medium text-gray-500 mb-2">Language</div>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setCurrentLanguage(language.code);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2 py-3 text-left transition-colors ${
                    currentLanguage === language.code
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <div className="font-medium">{language.label}</div>
                    <div className="text-sm text-gray-500">{language.region}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <button className="px-4 py-2 text-gray-700 hover:text-primary-500 transition-colors">
                Log in
              </button>
              <a href="/find-atm" className="px-6 py-2 bg-accent-600 text-white hover:bg-accent-700 hover:shadow-lg transition-all duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>
                Find ATM
              </a>
            </div>
          </div>
        </motion.div>
      )}
      {/* Mega Dropdown Panels - Inside header for seamless effect */}
      {openDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="absolute left-0 right-0 top-full bg-[#141a1f] text-gray-200 shadow-xl"
        >
          <div className="container-custom py-8">
            {/* ATMs Mega Content */}
            {openDropdown === 'atm' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    ATM Services
                  </h3>
                  <p className="text-sm text-gray-400">
                    Find locations or learn about hosting opportunities
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {atmItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-start gap-3 px-3 py-2 hover:bg-white/5 transition-colors"
                    >
                      <div className="mt-0.5 text-accent-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-100 group-hover:text-white">{item.label}</div>
                        <div className="text-xs text-gray-400">Learn more</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Learn Mega Content */}
            {openDropdown === 'learn' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Learn & Resources
                  </h3>
                  <p className="text-sm text-gray-400">
                    Discover more about cryptocurrency and our company
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {learnItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-start gap-3 px-3 py-2 hover:bg-white/5 transition-colors"
                    >
                      <div className="mt-0.5 text-accent-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-100 group-hover:text-white">{item.label}</div>
                        <div className="text-xs text-gray-400">Learn more</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Buy Mega Content */}
            {openDropdown === 'buy' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Purchase Options
                  </h3>
                  <p className="text-sm text-gray-400">
                    Choose how you'd like to buy cryptocurrency
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {buyItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-start gap-3 px-3 py-2 hover:bg-white/5 transition-colors"
                    >
                      <div className="mt-0.5 text-accent-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-100 group-hover:text-white">{item.label}</div>
                        <div className="text-xs text-gray-400">Learn more</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Sell Mega Content */}
            {openDropdown === 'sell' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Selling Options
                  </h3>
                  <p className="text-sm text-gray-400">
                    Choose how you'd like to sell your cryptocurrency
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {sellItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-start gap-3 px-3 py-2 hover:bg-white/5 transition-colors"
                    >
                      <div className="mt-0.5 text-accent-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-100 group-hover:text-white">{item.label}</div>
                        <div className="text-xs text-gray-400">Learn more</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Support Mega Content */}
            {openDropdown === 'support' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Support & Help
                  </h3>
                  <p className="text-sm text-gray-400">
                    Get assistance and find answers to your questions
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {supportItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-start gap-3 px-3 py-2 hover:bg-white/5 transition-colors"
                    >
                      <div className="mt-0.5 text-accent-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-100 group-hover:text-white">{item.label}</div>
                        <div className="text-xs text-gray-400">Learn more</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Language Mega Content */}
            {openDropdown === 'lang' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Language and region
                  </h3>
                  <p className="text-sm text-gray-400">
                    Choose your preferred language and region
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setCurrentLanguage(language.code);
                        setOpenDropdown(null);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 transition-colors ${
                        currentLanguage === language.code
                          ? "bg-white/10 text-white"
                          : "hover:bg-white/5 text-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold text-sm">
                          {language.code}
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{language.label}</div>
                        <div className="text-xs text-gray-400">
                          {language.region}
                        </div>
                      </div>
                      {currentLanguage === language.code && (
                        <div className="text-accent-400 ml-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;

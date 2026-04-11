import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  Users,
  ShieldCheck,
  Briefcase,
  BarChart3,
  ChevronRight,
  Mail,
  ChevronDown,
  ArrowRight,
  Globe,
  Lock,
  Award
} from "lucide-react";
import { cn } from "./lib/utils";

// --- Components ---

const Counter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-serif text-4xl md:text-6xl font-light">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className=" uppercase tracking-[0.3em] text-xs font-semibold mb-4"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-light leading-tight"
    >
      {children}
    </motion.h2>
  </div>
);

const CustomSelect = ({
  value,
  onChange,
  options
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[]
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all flex items-center justify-between group"
      >
        <span className={cn(value ? "text-white" : "text-white/30")}>
          {value || "Select option"}
        </span>
        <ChevronDown className={cn("w-4 h-4  transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-[110]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full mt-1 bg-[#121212] border border-white/10 z-[120] shadow-2xl overflow-hidden"
            >
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gold hover:text-black",
                    value === option ? " bg-white/5" : "text-white/70"
                  )}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formState, setFormState] = useState({
    firstName: "",
    email: "",
    phone: "",
    preferredMethod: "Email",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormState({ firstName: "", email: "", phone: "", preferredMethod: "Email" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-gold selection:text-black">
      {/* Navigation */}
      <nav
        className={cn(
          "fixed top-0 w-full z-[100] transition-all duration-500 border-b",
          isScrolled
            ? "h-20 bg-black/90 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50"
            : "h-24 bg-transparent border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
          {/* Logo - Left */}
          <div className="flex-1 basis-0 flex items-center gap-3">
            <div className="w-10 h-10 border border-gold flex items-center justify-center rotate-45 group hover:bg-gold transition-all duration-500 cursor-pointer">
              <span className="rotate-[-45deg] font-serif text-xl  group-hover:text-black transition-colors">AL</span>
            </div>
            <span className="font-serif text-xl tracking-[0.2em] uppercase hidden lg:block">
              Adriel Louis <span className="">Management</span>
            </span>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center justify-center gap-12 text-[11px] uppercase tracking-[0.3em] font-semibold">
            <a href="#about" className="hover: transition-all relative group py-2">
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#services" className="hover: transition-all relative group py-2">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#portfolio" className="hover: transition-all relative group py-2">
              Portfolio
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Consultation Button - Right */}
          <div className="flex-1 basis-0 flex justify-end">
            <a
              href="#contact"
              className="group relative px-6 py-3 overflow-hidden border border-white/50  text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold transition-all hover:text-black"
            >
              <span className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />
              <span className="relative z-10">Free Consultation</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Architecture"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/70 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-10 md:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 sm:mb-10 leading-[1.1]">
              Preserving Wealth.<br />
              <span className="italic font-serif ">Defining Legacies.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 sm:mb-16 font-light leading-relaxed px-4">
              Bespoke financial strategies for the world's most discerning individuals and families.
              We navigate complexity so you can focus on what matters most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 max-w-2xl mx-auto mt-12 sm:mt-24">
            <div className="text-center">
              <Counter value={2.5} suffix="B+" duration={2.5} />
              <p className=" uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-3 font-semibold">Assets Under Management</p>
            </div>
            <div className="text-center">
              <Counter value={150} suffix="+" duration={2} />
              <p className=" uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-3 font-semibold">Global Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Problems */}
      <section className="py-24 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <SectionHeading subtitle="Strategic Solutions">Addressing Your Financial Complexity</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Legacy Planning",
                desc: "Ensuring your wealth transitions seamlessly across generations with minimal friction.",
                icon: ShieldCheck,
                purpose: "Estate & Trust"
              },
              {
                title: "Tax Optimization",
                desc: "Sophisticated global tax strategies designed to preserve your capital in a changing world.",
                icon: BarChart3,
                purpose: "Fiscal Efficiency"
              },
              {
                title: "Alternative Assets",
                desc: "Exclusive access to private equity, real estate, and venture capital opportunities.",
                icon: Briefcase,
                purpose: "Unique Growth"
              }
            ].map((item, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 group hover:border-gold/50 transition-all cursor-pointer"
                onClick={() => {
                  if (window.location.hash === "#contact") {
                    // reset first
                    history.replaceState(null, "", " ");
                  }

                  window.location.hash = "contact";
                }}
              >
                <item.icon className="w-10 h-10  mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl mb-4">{item.title}</h3>
                <p className="text-white/50 mb-8 font-light leading-relaxed">{item.desc}</p>

                <button className="flex items-center gap-2  text-sm uppercase tracking-widest font-semibold group-hover:gap-4 transition-all">
                  Explore {item.purpose} <ChevronRight className="w-4 h-4" />
                </button>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Session */}
      <section id="about" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <SectionHeading subtitle="The Adriel Louis Session">A Foundation of Trust</SectionHeading>
              <div className="space-y-6 text-white/70 font-light text-lg leading-relaxed">
                <p>
                  Every partnership begins with a deep-dive discovery session. We don't just look at your balance sheet;
                  we seek to understand your values, your family dynamics, and your long-term aspirations.
                </p>
                <p>
                  Our sessions are designed to be a transparent exchange of ideas, where we map out the current
                  landscape of your wealth and identify the hidden risks and untapped opportunities.
                </p>
                <ul className="space-y-4 mt-8">
                  {[
                    "Comprehensive Risk Assessment",
                    "Multi-Generational Goal Alignment",
                    "Global Asset Consolidation Analysis"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 border border-gold/20 translate-x-4 translate-y-4" />
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000"
                className="w-full h-[500px] object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                alt="Meeting"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services & Differentiation */}
      <section id="services" className="py-24 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <div className="text-center mb-20">
            <SectionHeading subtitle="Our Expertise">What Sets Us Apart</SectionHeading>
          </div>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              {
                title: "Global Reach",
                desc: "Access to markets and opportunities across 40+ countries.",
                icon: Globe
              },
              {
                title: "Absolute Privacy",
                desc: "Discretion is our cornerstone. Your data is protected by elite security.",
                icon: Lock
              },
              {
                title: "Direct Access",
                desc: "Direct communication with our senior partners, 24/7.",
                icon: Users
              },
              {
                title: "Proven Results",
                desc: "Consistent outperformance through rigorous analytical discipline.",
                icon: Award
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-6 rotate-45 group hover:bg-gold transition-all">
                  <item.icon className="w-8 h-8  rotate-[-45deg] group-hover:text-black" />
                </div>
                <h4 className="text-xl mb-3">{item.title}</h4>
                <p className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help & Portfolio */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <SectionHeading subtitle="Our Methodology">How We Help You Grow</SectionHeading>
              <div className="space-y-12">
                {[
                  { step: "01", title: "Discovery", desc: "Understanding your unique financial DNA and risk tolerance." },
                  { step: "02", title: "Strategy", desc: "Crafting a bespoke multi-asset allocation plan." },
                  { step: "03", title: "Execution", desc: "Seamless implementation across global platforms." },
                  { step: "04", title: "Monitoring", desc: "Continuous rebalancing and tactical adjustments." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <span className="font-serif text-4xl /30">{item.step}</span>
                    <div>
                      <h5 className="text-xl mb-2">{item.title}</h5>
                      <p className="text-white/50 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading subtitle="Client Portfolio">Representative Allocations</SectionHeading>
              <div className="space-y-4">
                {[
                  { label: "Private Equity", value: "35%", color: "bg-gold" },
                  { label: "Public Equities", value: "25%", color: "bg-gold-dark" },
                  { label: "Real Estate", value: "20%", color: "bg-white/20" },
                  { label: "Fixed Income", value: "15%", color: "bg-white/10" },
                  { label: "Cash/Liquidity", value: "5%", color: "bg-white/5" }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm uppercase tracking-widest">
                      <span>{item.label}</span>
                      <span className="">{item.value}</span>
                    </div>
                    <div className="h-1 bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.value }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={cn("h-full", item.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-8 border border-white/10 bg-white/5 italic text-white/60 font-light">
                "Adriel Louis Management has transformed our family's approach to wealth. Their clarity and
                strategic foresight are unmatched in the industry."
                <p className="mt-4 text-white not-italic font-medium uppercase tracking-widest text-xs">— Principal, European Family Office</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="contact" className="py-24 bg-[#0f0f0f] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-10 md:px-16">
          <div className="text-center mb-16">
            <SectionHeading subtitle="Private Consultation">Begin Your Journey</SectionHeading>
            <p className="text-white/50 font-light">
              Schedule a confidential consultation with our senior advisory team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50">First Name</label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-colors"
                  placeholder="email@example.com"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold outline-none transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50">Preferred Contact</label>
                <CustomSelect
                  value={formState.preferredMethod}
                  onChange={(val) => setFormState(prev => ({ ...prev, preferredMethod: val }))}
                  options={["Email", "WhatsApp"]}
                />
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>Request Consultation <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/50 text-green-500 text-center text-sm"
                >
                  Thank you. A senior advisor will contact you shortly.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-center text-sm"
                >
                  An error occurred. Please try again or contact us directly.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-gold flex items-center justify-center rotate-45">
              <span className="rotate-[-45deg] font-serif text-sm ">AL</span>
            </div>
            <span className="font-serif text-sm tracking-widest uppercase">
              Adriel Louis <span className="">Management</span>
            </span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span>© 2026 Adriel Louis Management</span>
            <a href="#" className="hover: transition-colors">Privacy Policy</a>
            <a href="#" className="hover: transition-colors">Terms of Service</a>
            <a href="#" className="hover: transition-colors">Disclosures</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-gold transition-colors">
              <Globe className="w-4 h-4 text-white/40" />
            </a>
            <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-gold transition-colors">
              <Mail className="w-4 h-4 text-white/40" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


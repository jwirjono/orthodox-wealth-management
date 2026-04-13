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
  Award,
  Landmark,
  Percent,
  Umbrella,
  Hourglass,
  Banknote,
  Building2
} from "lucide-react";
import { cn } from "./lib/utils";
import logoRectangle from "./assets/Logo OWM Rectangle.png";

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
              <img
    src={logoRectangle}
    alt="Logo"
    className="h-18 w-auto object-contain cursor-pointer"
  />
            {/* <span className="font-serif text-md tracking-[0.2em] uppercase hidden lg:block">
              Orthodox Wealth <span className="">Management</span>
            </span> */}
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
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 sm:mb-10 leading-[1.1]">
              Building Wealth<br />
              <span className="italic font-serif ">That Lasts Across Generations</span>
            </h1>
            <p className="text-base sm:text-md md:text-lg text-white/60 max-w-2xl mx-auto mb-10 sm:mb-16 font-light leading-relaxed px-4">
              We design fully integrated financial strategies that align your investments, taxes, insurance, debt structures, business interests, estate planning, and asset protection into one cohesive plan.
Built on time-tested “orthodox” principles, our approach ensures your wealth is not only grown, but also protected, financed wisely, and sustained across generations.
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
          <SectionHeading subtitle="THE PROBLEM WE SOLVE">Most financial decisions are made in isolation. <br/>That’s where the problem begins.</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {[
  {
    title: "Fragmented Advice",
    desc: "Investment, tax, insurance, debt, and estate planning are often handled separately without a unified strategy.",
    icon: BarChart3,
    purpose: "Disconnected Planning"
  },
  {
    title: "Misaligned Decisions",
    desc: "Insurance, borrowing, and tax strategies are often inefficient, leading to unnecessary costs and risks.",
    icon: ShieldCheck,
    purpose: "Inefficient Structuring"
  },
  {
    title: "Long-Term Strategy",
    desc: "Many professionals and business owners earn well but lack a structured roadmap for sustainable wealth.",
    icon: Briefcase,
    purpose: "Uncertain Outcomes"
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
              <SectionHeading subtitle="WHO WE ARE">A Foundation of Trust</SectionHeading>
              <div className="space-y-6 text-white/70 font-light text-md leading-relaxed">
                <p>
  Orthodox Wealth Management (OWM) is a financial advisory firm founded in 2025 by Adriel Reynaldo Louis, CFP®, 
  with professional experience across Australia and Indonesia since 2020.
</p>

<p>
  We work with high-net-worth individuals (HNWI), entrepreneurs, and business owners who require structured 
  and sophisticated financial strategies.
</p>

<p>
  At the same time, we partner with professionals and emerging affluent individuals, helping them build strong 
  financial foundations and transition into long-term wealth creators.
</p>

<p>
  Our philosophy is rooted in “orthodox wealth strategies” — disciplined, time-tested principles used by 
  sophisticated investors and families over generations.
</p>

<p>
  By combining financial advisory expertise, corporate finance experience, real-world business ownership, and financing insight, we deliver a holistic approach that aligns your personal wealth, liabilities, business interests, and long-term legacy.
</p>
                
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
            <SectionHeading>Our Expertise</SectionHeading>
          </div>
          <div className="grid md:grid-cols-4 gap-12">
            {[
                {
                  title: "Estate Planning (Core Expertise)",
                  desc: "Structured solutions to support seamless wealth transfer across generations",
                  icon: Landmark
                },
                {
                  title: "Asset Protection (Core Expertise)",
                  desc: "Frameworks designed to safeguard your wealth from financial and legal risks",
                  icon: ShieldCheck
                },
                {
                  title: "Tax Planning & Optimization",
                  desc: "Legally optimized strategies to minimize tax and preserve wealth",
                  icon: Percent
                },
                {
                  title: "Insurance Planning",
                  desc: "Right-sized protection to avoid both underinsurance and unnecessary cost",
                  icon: Umbrella
                },
                {
                  title: "Retirement Planning",
                  desc: "Sustainable income strategies to secure your future lifestyle",
                  icon: Hourglass
                },
                {
                  title: "Loan Broking & Debt Structuring",
                  desc: "Financing solutions and debt strategies",
                  icon: Banknote
                },
                {
                  title: "Corporate Financial Planning",
                  desc: "Clarity on performance and forward-looking financial strategy",
                  icon: BarChart3
                },
                {
                  title: "Corporate Structuring",
                  desc: "Efficient structures aligned with both business and personal objectives",
                  icon: Building2
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

      {/* What Makes Us Different */}
      <section className="py-28 bg-[#0f0f0f] border-y border-white/5">
  <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
    
    <div className="text-center mb-20">
      <SectionHeading subtitle="What Makes Us Different">
        A Structured, Institutional Approach to Wealth
      </SectionHeading>
    </div>

    <div className="space-y-16">
      {[
        {
          title: "Fully Integrated Financial Strategy",
          desc: "We do not treat financial decisions separately. Investments, tax, insurance, debt, business structuring, estate planning, and asset protection are aligned into one cohesive strategy."
        },
        {
          title: "Expertise in Estate Planning & Asset Protection",
          desc: "A critical but underserved area — and one of our core strengths."
        },
        {
          title: "Strategic View on Both Assets and Liabilities",
          desc: "We help clients structure not only their wealth, but also their borrowing, ensuring debt decisions support rather than weaken long-term financial strength."
        },
        {
          title: "Independent, Strategy-First Advice",
          desc: "No product bias. Every recommendation is made in your best interest."
        },
        {
          title: "Cross-Border Perspective",
          desc: "Experience across Australia and Indonesia enables more sophisticated and well-rounded structuring."
        },
        {
          title: "Founder-Led, High-Touch Advisory",
          desc: "Direct involvement in every client relationship — not delegated, not standardized."
        },
        {
          title: "Designed for All Stages of Wealth",
          desc: "From professionals building wealth to HNWI managing complex structures, our approach evolves with your financial life."
        }
      ].map((item, i) => (
        <div
          key={i}
          className="grid md:grid-cols-12 gap-6 md:gap-10 items-start group"
        >
          {/* Number */}
          <div className="md:col-span-2">
            <span className="font-serif text-4xl text-white/20 group-hover:text-gold transition-colors">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content */}
          <div className="md:col-span-10">
            <h3 className="text-2xl md:text-3xl mb-4 group-hover:text-gold transition-colors">
              {item.title}
            </h3>
            <p className="text-white/60 font-light leading-relaxed max-w-3xl">
              {item.desc}
            </p>
          </div>
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
              <SectionHeading subtitle="Our Methodology">How We Work With You</SectionHeading>
              <div className="space-y-12">
                {[
  {
    step: "01",
    title: "Understand",
    desc: "We begin by understanding your financial position, goals, obligations, business interests, and priorities in depth."
  },
  {
    step: "02",
    title: "Design",
    desc: "We develop a fully integrated strategy covering investment, tax, insurance, debt structure, asset protection, and long-term legacy."
  },
  {
    step: "03",
    title: "Implement",
    desc: "We guide you through execution with precision, clarity, and practical coordination."
  },
  {
    step: "04",
    title: "Monitor & Refine",
    desc: "Your strategy evolves as your life, business, liabilities, and financial complexity grow."
  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <span className="font-serif text-4xl /30">{item.step}</span>
                    <div>
                      <h5 className="text-xl mb-2">{item.title}</h5>
                      <p className="text-white/50 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
                <p className="font-serif text-4xl /30">You do not just receive advice, you gain a long-term strategic partner.</p>
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
                "Orthodox Wealth Management has transformed our family's approach to wealth. Their clarity and
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
            <SectionHeading subtitle="Private Consultation">
    Start your journey with us today.
  </SectionHeading>

  {/* Main paragraph */}
  <p className="text-white/60 font-light leading-relaxed mt-6">
    Your financial life deserves more than fragmented advice.<br />
    It requires structure, clarity, and a long-term strategy.
  </p>

  {/* Elegant divider */}
  <div className="w-auto h-[1px] bg-white/70 mx-auto my-6" />

  {/* Branding */}
  <p className="text-white/90 font-light tracking-[0.15em] uppercase">
    Orthodox Wealth Management
  </p>
  <p className="text-white/40 text-sm mt-2">
    Building Wealth That Lasts Across Generations
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
                          <img
    src={logoRectangle}
    alt="Logo"
    className="w-auto h-12 border flex items-center justify-center"
  />

            <span className="font-serif text-sm tracking-widest uppercase">
              Orthodox Wealth <span className="">Management</span>
            </span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span>© 2026 Orthodox Wealth Management</span>
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


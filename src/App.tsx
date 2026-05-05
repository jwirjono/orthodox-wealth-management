import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";
import {
  ShieldCheck,
  Briefcase,
  BarChart3,
  ChevronRight,
  Mail,
  ChevronDown,
  ArrowRight,
  Landmark,
  Percent,
  Umbrella,
  Hourglass,
  Banknote,
  Building2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { cn } from "./lib/utils";
import logoLight from "/owmLogoLight.png";
import aboutPhoto from "/Photo.jpeg";


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
    <span ref={ref} className="font-sans text-4xl md:text-6xl font-light">
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

const testimonials = [
  {
    quote: "Orthodox Wealth Management helped us move from uncertainty to clarity in planning our retirement. Instead of generic advice, we received a structured strategy that considered our lifestyle goals, future cashflow needs, risk profile, and long-term family objectives. The process gave us confidence that our retirement is not only financially sustainable, but also properly structured for the years ahead.",
    author: "Hendy & Katherine, Family",
    role: "Retirement Planning"
  },
  {
    quote: "Before working with Orthodox Wealth Management, my financial decisions felt fragmented. I had savings and investments, but no clear long-term structure. Adriel helped me understand how to align my cashflow, investments, protection, and future goals into one cohesive strategy. The advice was practical, personalized, and focused on long-term financial growth rather than short-term trends.",
    author: "Regine, Career Professional",
    role: "Career Professional, Personal Financial Planning & Personal Investing"
  },
  {
    quote: "What stood out most was the ability to connect my personal financial goals with my business structure and financial strategy. Orthodox Wealth Management provided insights not only on investing personally, but also on improving financial clarity and strategic planning within the business. The integrated approach helped me see my finances more holistically.",
    author: "Satya, Entrepreneur",
    role: "Business Owner, Personal Investment & Corporate Financial Planning"
  },
  {
    quote: "Orthodox Wealth Management brought structure and strategic thinking into both my personal investments and business finances. The advice was not product-driven, but focused on building an efficient and sustainable financial system. The combination of investment planning and corporate financial insight made the engagement especially valuable.",
    author: "Fauker, Entrepreneur",
    role: " Personal Investment & Corporate Financial Planning"
  },
  {
    quote: "The guidance I received on corporate structuring and tax planning gave me a much clearer framework for managing my business finances. Orthodox Wealth Management helped simplify areas that previously felt complicated and provided strategies that were both practical and aligned with long-term efficiency. The process felt highly professional and well thought out.",
    author: "Kevin, Architect",
    role: "Corporate Structuring & Tax Planning"
  },
  {
    quote: "Working with Orthodox Wealth Management helped me understand that financial planning is more than investing alone. The advice I received connected my income, spending, investment strategy, and long-term goals into a much clearer financial structure. I now feel more disciplined and confident about my financial future",
    author: "Joshua, Interior Designer",
    role: "Personal Financial Planning & Personal Investing"
  },
  {
    quote: "Orthodox Wealth Management helped me better structure both my business activities and tax planning in a way that felt organized, efficient, and sustainable. What I appreciated most was the strategic perspective — the advice was not only technically sound, but also aligned with my long-term objectives.",
    author: "Jevon, IT Professional",
    role: "Tax Planning & Corporate Structuring"
  }
];

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
      const response = await fetch("api/contact", {
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
    src={logoLight}
    alt="Orthodox Wealth Management Light Logo"
    className="h-18 w-auto object-contain cursor-pointer"
    loading="lazy"
  />
            {/* <span className="font-sans text-md tracking-[0.2em] uppercase hidden lg:block">
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
              <span className="relative z-10">Request Consultation</span>
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
            alt="Wall Street Building"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/70 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-10 md:px-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light mt-4 mb-4 sm:mb-10 leading-[1.1]">
              Building Wealth<br />
              <span className="italic font-sans ">That Lasts Across Generations</span>
            </h1>
            <p className="text-base sm:text-md md:text-lg text-white/60 max-w-2xl mx-auto mb-10 sm:mb-16 font-light leading-relaxed px-4">
              We design fully integrated financial strategies that align your investments, taxes, insurance, debt structures, business interests, estate planning, and asset protection into one cohesive plan.
Built on time-tested “orthodox” principles, our approach ensures your wealth is not only grown, but also protected, financed wisely, and sustained across generations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 max-w-2xl mx-auto mt-9 sm:mt-18">
            <div className="text-center">
              <Counter value={100} suffix="M+" duration={2.5} />
              <p className=" uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-3 font-semibold">Assets Under Management</p>
            </div>
            <div className="text-center">
              <Counter value={100} suffix="+" duration={2} />
              <p className=" uppercase tracking-[0.2em] text-[10px] sm:text-xs mt-3 font-semibold">Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Problems */}
      <section className="py-24 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
          <SectionHeading subtitle="THE PROBLEM WE SOLVE">
            Most financial decisions are made in isolation. <br />
            That’s where the problem begins.
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                title: "Disconnected Financial Decisions",
                desc: "Investment, tax, insurance, and debt decisions are often made separately — weakening overall outcomes.",
                icon: BarChart3,
                purpose: "Plan Your Finance Journey",
              },
              {
                title: "Inefficient Financial Structure",
                desc: "Borrowing, tax, and protection strategies are frequently misaligned — creating unnecessary costs and risk.",
                icon: ShieldCheck,
                purpose: "See How Structure Changes Outcomes",
              },
              {
                title: "Wealth Without a System",
                desc: "High income does not guarantee lasting wealth — without structure, growth often comes with hidden risk.",
                icon: Briefcase,
                purpose: "Learn More About Our System",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 group hover:border-gold/50 transition-all cursor-pointer h-full flex flex-col"
                onClick={() => {
                  if (window.location.hash === "#contact") {
                    history.replaceState(null, "", " ");
                  }
                  window.location.hash = "contact";
                }}
              >
                {/* Icon */}
                <item.icon className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />

                {/* Title */}
                <h3 className="text-2xl mb-4 min-h-[64px]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 mb-8 font-light leading-relaxed flex-grow line-clamp-4">
                  {item.desc}
                </p>

                {/* CTA */}
                <button className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold group-hover:gap-4 transition-all mt-auto">
                  {item.purpose} <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagram Flow */}
      <section className="py-28 bg-[#0f0f0f] border-y border-white/5">
  <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">

    {/* Header */}
    <div className="text-center mb-20">
      <SectionHeading subtitle="HOW IT SHOULD WORK">
        A Structured Financial Flow
      </SectionHeading>
    </div>

    {/* Flow */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-6">

      {[
        "Income",
        "Tax",
        "Debt",
        "Investment",
        "Protection",
        "Estate"
      ].map((step, i) => (
        <div key={i} className="flex items-center">

          {/* Step */}
          <div className="text-center group">
            <div className="font-sans text-3xl text-white/20 group-hover:text-gold transition-colors">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/70">
              {step}
            </div>
          </div>

          {/* Divider */}
          {i < 5 && (
            <div className="hidden md:block w-16 h-[1px] bg-white/10 mx-6" />
          )}
        </div>
      ))}

    </div>

    {/* Bottom statement */}
    <div className="mt-20 text-center max-w-3xl mx-auto">
      <p className="text-white/70 font-light text-lg leading-relaxed">
        When structured correctly, each decision reinforces the next — creating a system that is efficient, protected, and built to last.
      </p>
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
  Orthodox Wealth Management (OWM) is a financial advisory firm founded in 2024 by Adriel Reynaldo Louis, CFP®, with professional experience across Australia and Indonesia since 2020.
</p>

<p>
  We work with high-net-worth individuals, entrepreneurs, and professionals whose financial lives have reached a level of complexity where decisions can no longer be made in isolation. At the same time, we partner with emerging affluent individuals, helping them move beyond income generation and build structured, long-term wealth.
</p>

<p>
  Our approach is not built around products, but around systems. We integrate how you earn, invest, borrow, protect, and transfer wealth into one cohesive financial structure.
</p>

<p>
  Our philosophy is rooted in “orthodox wealth strategies” — disciplined, time-tested principles used by sophisticated investors and families to build, protect, and sustain wealth across generations.
</p>

<p>
  By combining personal financial planning, corporate financial strategy, and debt structuring into one integrated framework, we ensure that every financial decision supports the next.
</p>
<p>
  This integrated perspective allows us to deliver advice that is not only technically sound, but also strategically aligned — helping clients build wealth that is efficient, protected, and designed to last.</p>
                
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative mb-[250px]"
            >
              <div className="absolute -inset-4 border border-gold/20 translate-x-4 translate-y-4" />
              <img
                src={aboutPhoto}
                className="w-full h-[500px] object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                alt="Client Meeting Logo for Wealth Planning"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services & Differentiation */}
      <section id="services" className="py-24 bg-[#0f0f0f]">
  <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
    
    {/* Header */}
    <div className="text-center mb-20 max-w-2xl mx-auto">
      <SectionHeading>Our Expertise</SectionHeading>
      <p className="text-white/60 font-light leading-relaxed">
        Each component is designed individually — but structured to work as one integrated system.
      </p>
    </div>

    {/* Grid */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-stretch">
      {[
        {
          title: "Estate Planning (Core Expertise)",
          desc: "Structured strategies to ensure efficient, conflict-free transfer of wealth across generations.",
          icon: Landmark
        },
        {
          title: "Asset Protection (Core Expertise)",
          desc: "Legal and financial frameworks designed to protect your wealth from business, personal, and external risks.",
          icon: ShieldCheck
        },
        {
          title: "Tax Planning & Optimization",
          desc: "Proactive structuring to legally minimize tax and improve overall financial efficiency.",
          icon: Percent
        },
        {
          title: "Insurance Planning",
          desc: "Right-sized coverage aligned with your financial structure — avoiding both underinsurance and unnecessary cost.",
          icon: Umbrella
        },
        {
          title: "Retirement Planning",
          desc: "Sustainable income strategies to secure your future lifestyle.",
          icon: Hourglass
        },
        {
          title: "Loan Broking & Debt Structuring",
          desc: "Strategic design of personal and business borrowing to optimize cashflow, manage risk, and support long-term wealth accumulation.",
          icon: Banknote
        },
        {
          title: "Corporate Financial Planning",
          desc: "Financial visibility and forward planning to support scalable and sustainable business growth.",
          icon: BarChart3
        },
        {
          title: "Corporate Structuring",
          desc: "Efficient entity and ownership structures aligned with both business objectives and personal wealth strategy.",
          icon: Building2
        }
      ].map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center h-full"
        >
          {/* Icon */}
          <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mb-6 rotate-45 group hover:bg-gold transition-all">
            <item.icon className="w-8 h-8 rotate-[-45deg] group-hover:text-black transition-colors" />
          </div>

          {/* Title */}
          <h4 className="text-lg font-medium mb-3 min-h-[56px]">
            {item.title}
          </h4>

          {/* Description */}
          <p className="text-white/50 text-sm font-light leading-relaxed flex-grow line-clamp-4">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Bottom Statement (FULL WIDTH) */}
    <div className="mt-16 text-center max-w-3xl mx-auto">
      <p className="text-white/70 font-light text-lg leading-relaxed">
        Each element is interconnected. When structured correctly, every decision strengthens the next.
      </p>
    </div>

  </div>
</section>

      {/* What Makes Us Different */}
      <section className="py-28 bg-[#0f0f0f] border-y border-white/5">
  <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-32">
    
    <div className="text-center mb-20">
      <SectionHeading subtitle="This is why we are fundamentally different">
        A Structured, Institutional Approach to Wealth
      </SectionHeading>
    </div>

    <div className="space-y-16">
      {[
{
    title: "We Integrate What Others Separate",
    desc: "Most advisors focus on individual areas — investments, tax, insurance, or debt. We align every financial decision into one cohesive system."
  },
  {
    title: "Expertise Where It Matters Most",
    desc: "Estate planning and asset protection are often overlooked — yet they determine whether wealth truly lasts."
  },
  {
    title: "We Structure Both Assets and Liabilities",
    desc: "Most advisors focus on growing wealth. We ensure how you borrow supports — not weakens — your overall financial strategy."
  },
  {
    title: "Strategy Before Products",
    desc: "Our advice is not driven by products or commissions. Every recommendation is designed solely around your long-term outcome."
  },
  {
    title: "Global Perspective, Local Relevance",
    desc: "Experience across Australia and Indonesia enables more disciplined and sophisticated financial structuring."
  },
  {
    title: "Direct, High-Touch Advisory",
    desc: "You work directly with the advisor — ensuring depth, continuity, and consistent strategic oversight."
  },
  {
    title: "Built to Evolve With You",
    desc: "From early wealth building to complex structures, your financial system evolves as your life grows."
  }
      ].map((item, i) => (
        <div
          key={i}
          className="grid md:grid-cols-12 gap-6 md:gap-10 items-start group"
        >
          {/* Number */}
          <div className="md:col-span-2">
            <span className="font-sans text-4xl text-white/20 group-hover:text-gold transition-colors">
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
    <div className="mt-16 text-center max-w-3xl mx-auto">
      <p className="text-white/70 font-light text-lg leading-relaxed">
        Wealth is not built through isolated decisions.
It is built through structure, alignment, and discipline over time.
      </p>
    </div>
  </div>
</section>

      {/* How We Help & Portfolio */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <SectionHeading subtitle="Our strategic process">How We Structure Your Financial System</SectionHeading>
              <div className="space-y-12">
                {[
  {
    step: "01",
    title: "Deep Financial Understanding",
    desc: "We go beyond surface-level data to understand your financial structure, decision patterns, risk exposure, liabilities, and long-term objectives."
  },
  {
    step: "02",
    title: "Integrated Strategy Design",
    desc: "We design a cohesive financial system that aligns your investments, tax structure, debt position, protection, and long-term legacy."
  },
  {
    step: "03",
    title: "Coordinated Execution",
    desc: "We guide execution across multiple areas — ensuring each decision is implemented in alignment, not in isolation."
  },
  {
    step: "04",
    title: "Continuous Alignment & Refinement",
    desc: "As your life, business, and financial complexity evolve, your strategy is continuously refined to maintain efficiency, protection, and alignment."
  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8">
                    <span className="font-sans text-4xl /30">{item.step}</span>
                    <div>
                      <h5 className="text-xl mb-2">{item.title}</h5>
                      <p className="text-white/50 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
            <div>
              <SectionHeading subtitle="Client Portfolio">How We Allocate Capital Strategically</SectionHeading>
              <p className="text-white/60 font-light leading-relaxed max-w-xl mb-16">
  Allocation is not about chasing returns — it is about structuring capital across risk, liquidity, and long-term objectives. Each portfolio is designed to align with your financial position and overall strategy.
</p>
              <div className="space-y-3 md:space-y-4">
                {[
                  { label: "Public Equity", value: "35%", color: "bg-gold" },
                  { label: "Private Equities", value: "25%", color: "bg-gold-dark" },
                  { label: "Real Estate", value: "20%", color: "bg-white/20" },
                  { label: "Fixed Income", value: "15%", color: "bg-white/10" },
                  { label: "Cash/Liquidity", value: "5%", color: "bg-white/5" }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs md:text-sm uppercase tracking-widest">
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
              <div className="mt-12">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="pb-12 md:pb-10"
              >
                {testimonials.map((item, i) => (
                  <SwiperSlide key={i} className="flex justify-center">
                    <div className="p-8 border border-white/10 bg-white/5 text-white/80 text-center w-full max-w-2xl h-[300px] flex flex-col justify-center">
                      
                      {/* Quote */}
                      <p className="italic text-md leading-relaxed line-clamp-6">
                        "{item.quote}"
                      </p>

                      {/* Author */}
                      <p className="mt-6 text-white not-italic font-medium uppercase tracking-widest text-xs">
                        — {item.author} <br/>{item.role}
                      </p>

                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            </div>
          </div>
          <p className="font-sans text-xl md:text-2xl text-white/30 my-10 md:my-14 px-4 md:px-0 text-center">You do not just receive advice, you gain a structured and long-term strategic partner to building, protecting, and sustaining wealth.</p>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="contact" className="py-24 bg-[#0f0f0f] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-10 md:px-16">
          <div className="text-center mb-16">
            <SectionHeading subtitle="Private Consultation">
    Begin a Structured Approach to Your Wealth
  </SectionHeading>

  {/* Main paragraph */}
  <p className="text-white/60 font-light leading-relaxed mt-6">
    Your financial life should not be managed in isolation.<br />
    It requires structure, alignment, and a long-term strategy..
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
            <span className="font-sans text-sm tracking-widest uppercase">
              Orthodox Wealth <span className="">Management</span>
            </span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span>© 2026 Orthodox Wealth Management</span>
            <div className="flex"><Mail className="w-4 h-4 text-white/40"/><p className="flex ml-4">info@orthodoxwm.com</p></div>
          </div>
          <div className="flex gap-4">
            <a
                href="https://www.linkedin.com/company/orthodox-wealth-management/?viewAsMember=true"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-gold transition-colors"
              >
                <FaLinkedinIn className="w-4 h-4 text-white/40" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/orthodoxwealthmanagement?igsh=MXdyZG9mbWd2eHg5bQ=="
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/10 flex items-center justify-center hover:border-gold transition-colors"
              >
                <FaInstagram className="w-4 h-4 text-white/40" />
              </a>
              <a
                href="https://wa.me/6285111218413"
                target="_blank"
                rel="noopener noreferrer"
                className="wa-contact"
              >
                <i className="fab fa-whatsapp"></i>
                {/* <span>Contact Us</span> */}
              </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


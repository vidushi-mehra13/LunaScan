import { motion } from "framer-motion";
import { Globe, ShieldCheck, Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Globe,
    title: "Web Crawling",
    description: "Discover pages, forms, and endpoints across your target site automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Security Header Analysis",
    description: "Check for missing headers like CSP, HSTS, and X-Frame-Options.",
  },
  {
    icon: Bug,
    title: "Reflected XSS Detection",
    description: "Identify reflected cross-site scripting vulnerabilities in URL parameters.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border/40">
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          Luna<span className="text-primary">Scan</span>
        </span>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-foreground mb-4 text-glow">
            LunaScan
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
            Lightweight Web Vulnerability Assessment
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/scan")}
            className="rounded-full px-10 py-6 text-base font-semibold glow-lavender hover:glow-lavender-strong transition-shadow duration-300"
          >
            Start Scan
          </Button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-4xl w-full"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card p-7 flex flex-col items-start gap-4 hover:glow-lavender transition-shadow duration-300"
            >
              <div className="p-3 rounded-xl bg-primary/10">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border/30">
        <p>MADE BY : Vidushi Mehra (LunaTech)</p>
      </footer>
    </div>
  );
};

export default LandingPage;

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { runMockScan, ScanResult } from "@/lib/scanner";
import ScanResults from "@/components/ScanResults";

const ScanPage = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setScanning(true);
    setResult(null);
    try {
      const res = await runMockScan(url.trim());
      setResult(res);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center gap-4 px-8 py-5 border-b border-border/40">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          Luna<span className="text-primary">Scan</span>
        </span>
      </nav>

      <main className="flex-1 px-6 py-12 max-w-3xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">New Scan</h2>
          <p className="text-muted-foreground mb-8">Enter a target URL to begin vulnerability assessment.</p>

          <form onSubmit={handleScan} className="flex gap-3 mb-10">
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="flex-1 h-12 rounded-xl bg-secondary border-border/50 text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
            <Button
              type="submit"
              disabled={scanning}
              className="h-12 px-6 rounded-xl glow-lavender hover:glow-lavender-strong transition-shadow"
            >
              {scanning ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Search className="w-4 h-4 mr-2" />}
              {scanning ? "Scanning…" : "Run Scan"}
            </Button>
          </form>

          {scanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-8 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
              <p className="text-foreground font-medium mb-1">Scanning target…</p>
              <p className="text-sm text-muted-foreground">Crawling pages, analyzing headers, testing for XSS</p>
            </motion.div>
          )}

          {result && !scanning && <ScanResults result={result} />}
        </motion.div>
      </main>
    </div>
  );
};

export default ScanPage;

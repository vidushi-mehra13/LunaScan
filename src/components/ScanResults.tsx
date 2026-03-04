import { motion } from "framer-motion";
import { Globe, FileText, ShieldAlert, Bug, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScanResult, generateHtmlReport } from "@/lib/scanner";

const severityColor: Record<string, string> = {
  high: "bg-destructive/20 text-destructive",
  medium: "bg-warning/20 text-warning",
  low: "bg-primary/20 text-primary",
};

const ScanResults = ({ result }: { result: ScanResult }) => {
  const handleDownload = () => {
    const html = generateHtmlReport(result);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lunascan-report-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground">Scan Complete</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {result.url} — {new Date(result.timestamp).toLocaleString()}
          </p>
        </div>
        <Button onClick={handleDownload} variant="outline" className="rounded-xl gap-2 border-border/50 hover:glow-lavender">
          <Download className="w-4 h-4" /> Download Report
        </Button>
      </div>

      {/* Visited URLs */}
      <Section icon={Globe} title="Visited URLs" count={result.visitedUrls.length}>
        <div className="space-y-1">
          {result.visitedUrls.map((u, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground py-1.5 px-3 rounded-lg hover:bg-secondary/50 transition-colors">
              <ExternalLink className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate">{u}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Forms */}
      <Section icon={FileText} title="Extracted Forms" count={result.forms.length}>
        <div className="space-y-3">
          {result.forms.map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-secondary/40 border border-border/30">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">{f.method}</span>
                <span className="text-sm text-foreground truncate">{f.action}</span>
              </div>
              <p className="text-xs text-muted-foreground">Inputs: {f.inputs.join(", ")}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Missing Headers */}
      <Section icon={ShieldAlert} title="Missing Security Headers" count={result.missingHeaders.length}>
        <div className="space-y-3">
          {result.missingHeaders.map((h, i) => (
            <div key={i} className="p-4 rounded-xl bg-secondary/40 border border-border/30 flex items-start gap-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${severityColor[h.severity]}`}>
                {h.severity}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground font-mono">{h.header}</p>
                <p className="text-xs text-muted-foreground mt-1">{h.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* XSS */}
      <Section icon={Bug} title="Reflected XSS Findings" count={result.xssFindings.length}>
        <div className="space-y-3">
          {result.xssFindings.map((x, i) => (
            <div key={i} className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
              <p className="text-sm text-foreground truncate mb-2">{x.url}</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Param: <code className="text-primary">{x.parameter}</code></span>
                <span>Payload: <code className="text-destructive">{x.payload}</code></span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </motion.div>
  );
};

const Section = ({ icon: Icon, title, count, children }: { icon: any; title: string; count: number; children: React.ReactNode }) => (
  <div className="glass-card p-6">
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h4 className="font-display text-lg font-semibold text-foreground">{title}</h4>
      <span className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{count}</span>
    </div>
    {children}
  </div>
);

export default ScanResults;

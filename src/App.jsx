import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, BrainCircuit, Check, LineChart, Newspaper, Search, Sparkles, TrendingUp, Wrench } from "lucide-react";

const navLinks = ["Home", "Agents", "Dashboard", "Demo"];

const workflowSteps = [
  {
    Icon: Search,
    title: "Fetching market data",
    detail: "Streaming prices, order flow, and on-chain signals into the agent graph.",
  },
  {
    Icon: Newspaper,
    title: "Analyzing news sentiment",
    detail: "Parsing market narratives, social signals, and macro headlines in real time.",
  },
  {
    Icon: Wrench,
    title: "Calling tools (price, trend)",
    detail: "Using specialized tools to validate momentum, volatility, and trend shifts.",
  },
  {
    Icon: BrainCircuit,
    title: "Multi-agent reasoning",
    detail: "Independent agents debate scenarios, risks, and timing before convergence.",
  },
  {
    Icon: Sparkles,
    title: "Generating insights",
    detail: "Producing structured recommendations with confidence and risk framing.",
  },
];

const liveAgentSteps = [
  { Icon: Search, title: "Searching market data", detail: "Scanning price, momentum, and order flow signals." },
  { Icon: Newspaper, title: "Fetching news", detail: "Pulling market headlines and sentiment shifts." },
  { Icon: Wrench, title: "Calling tools", detail: "Running pricing and trend utilities across active pairs." },
  { Icon: BrainCircuit, title: "Analyzing trends", detail: "Cross-checking trend structure, volatility, and consensus." },
  { Icon: Sparkles, title: "Generating recommendation", detail: "Formatting the final recommendation with confidence." },
];

const toolLogEntries = [
  { stepIndex: 2, label: "Calling tool: getCryptoPrice" },
  { stepIndex: 3, label: "Calling tool: getMarketTrend" },
];

const signalsUsed = [
  { Icon: LineChart, label: "Price Data" },
  { Icon: TrendingUp, label: "Market Trend" },
  { Icon: Newspaper, label: "News Sentiment" },
  { Icon: Activity, label: "Volatility Signals" },
];

const features = [
  {
    title: "Multi-Agent Intelligence",
    description: "Multiple AI agents collaborate to analyze data, compare scenarios, and refine conviction before surfacing insights.",
  },
  {
    title: "Tool Calling System",
    description: "Connected tools fetch live crypto prices, market structure, and trend signals so output stays grounded in fresh data.",
  },
  {
    title: "Structured Insights",
    description: "Clear risk analysis, trend summaries, and recommendation framing designed for faster, calmer decision-making.",
  },
];

const footerLinks = ["Privacy", "Terms", "Contact"];

function GlassCard({ className = "", children }) {
  return (
    <div
      className={`rounded-[20px] border border-white/8 bg-white/[0.045] shadow-[0_18px_60px_rgba(4,8,20,0.42)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("What is the current outlook for Bitcoin and Ethereum?");
  const [workflowVisible, setWorkflowVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [workflowFinished, setWorkflowFinished] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [typedRecommendation, setTypedRecommendation] = useState("");
  const [isTypingRecommendation, setIsTypingRecommendation] = useState(false);
  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  const [queryHistory, setQueryHistory] = useState([]);
  const timerRef = useRef([]);
  const typeTimerRef = useRef(null);

  const recommendationText = useMemo(() => {
    if (workflowFinished) {
      return "Momentum remains constructive with improving breadth. Watch for continuation above local resistance while keeping risk medium.";
    }

    return "Recommendation is assembling as the agents validate live pricing, market trend, and sentiment signals.";
  }, [workflowFinished]);

  const recommendationConfidence = 0.78;

  useEffect(() => {
    return () => {
      timerRef.current.forEach((timer) => window.clearTimeout(timer));
      if (typeTimerRef.current) {
        window.clearTimeout(typeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!workflowFinished) {
      setTypedRecommendation("");
      setIsTypingRecommendation(false);
      setAnimatedConfidence(0);
      if (typeTimerRef.current) {
        window.clearTimeout(typeTimerRef.current);
      }
      return;
    }

    const fullText = recommendationText;
    const typingDelayMs = 25;

    setTypedRecommendation("");
    setIsTypingRecommendation(true);

    let index = 0;
    const tick = () => {
      index += 1;
      setTypedRecommendation(fullText.slice(0, index));

      if (index < fullText.length) {
        typeTimerRef.current = window.setTimeout(tick, typingDelayMs);
      } else {
        setIsTypingRecommendation(false);
      }
    };

    typeTimerRef.current = window.setTimeout(tick, 320);

    setAnimatedConfidence(0);
    const confidenceTimer = window.setTimeout(() => {
      setAnimatedConfidence(Math.round(recommendationConfidence * 100));
    }, 360);
    timerRef.current.push(confidenceTimer);

    return () => {
      if (typeTimerRef.current) {
        window.clearTimeout(typeTimerRef.current);
      }
    };
  }, [workflowFinished, recommendationText, recommendationConfidence]);

  const clearWorkflowTimers = () => {
    timerRef.current.forEach((timer) => window.clearTimeout(timer));
    timerRef.current = [];
  };

  const runQuery = (nextQuery) => {
    const normalizedQuery = (nextQuery ?? "").trim();
    if (!normalizedQuery) {
      return;
    }

    setQuery(normalizedQuery);
    setQueryHistory((current) => {
      const deduped = [normalizedQuery, ...current.filter((item) => item !== normalizedQuery)];
      return deduped.slice(0, 3);
    });

    clearWorkflowTimers();
    setWorkflowVisible(true);
    setWorkflowFinished(false);
    setActiveStep(0);
    setVisibleLogs([]);
    setTypedRecommendation("");
    setIsTypingRecommendation(false);
    setAnimatedConfidence(0);

    liveAgentSteps.forEach((_, index) => {
      if (index === 0) {
        return;
      }

      const timer = window.setTimeout(() => {
        setActiveStep(index);
      }, index * 600);

      timerRef.current.push(timer);
    });

    toolLogEntries.forEach((log, index) => {
      const timer = window.setTimeout(() => {
        setVisibleLogs((current) => [...current, { ...log, id: `${log.label}-${index}` }]);
      }, log.stepIndex * 600 + 220);

      timerRef.current.push(timer);
    });

    const finishTimer = window.setTimeout(() => {
      setWorkflowFinished(true);
    }, liveAgentSteps.length * 600);

    timerRef.current.push(finishTimer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runQuery(query);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0B0F19_0%,#080B14_52%,#05070D_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(139,92,246,0.22),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_68%_62%,rgba(236,72,153,0.12),transparent_24%)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 backdrop-blur-[110px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-10 pt-6 sm:px-10 lg:px-12">
        <header className="animate-[fadeUp_800ms_ease-out_both]">
          <GlassCard className="px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(168,85,247,0.85),rgba(59,130,246,0.75),rgba(236,72,153,0.72))] shadow-[0_0_36px_rgba(99,102,241,0.36)]">
                  <span className="text-sm font-semibold">C</span>
                </div>
                <div>
                  <div className="text-base font-semibold">CoinSage AI</div>
                  <div className="text-sm text-white/48">Agentic crypto intelligence</div>
                </div>
              </div>

              <nav className="flex flex-wrap items-center gap-5 text-sm text-white/62">
                {navLinks.map((link) => (
                  <a key={link} href="#" className="transition hover:text-white">
                    {link}
                  </a>
                ))}
              </nav>

              <button className="inline-flex h-11 items-center justify-center rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#3B82F6_52%,#EC4899_100%)] px-5 text-sm font-medium text-white shadow-[0_0_28px_rgba(99,102,241,0.42)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_38px_rgba(236,72,153,0.28)]">
                Launch App
              </button>
            </div>
          </GlassCard>
        </header>

        <section className="relative flex flex-1 items-center py-18 lg:py-24">
          <div className="grid w-full gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex animate-[fadeScale_900ms_ease-out_120ms_both] items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/70">
                <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#8B5CF6,#3B82F6,#EC4899)] shadow-[0_0_20px_rgba(139,92,246,0.85)]" />
                Real-time reasoning for digital asset research
              </div>

              <h1 className="mt-8 max-w-xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl animate-[fadeScale_950ms_ease-out_180ms_both]">
                Smarter Crypto Decisions
              </h1>

              <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/70 animate-[fadeUp_950ms_ease-out_280ms_both]">
                Powered by Multi-Agent AI and Real-Time Data
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/56 animate-[fadeUp_1000ms_ease-out_360ms_both]">
                CoinSage AI uses autonomous agents, tool-calling, and reasoning workflows to analyze crypto markets, track trends, and generate intelligent investment insights.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-[fadeUp_1000ms_ease-out_460ms_both]">
                <button className="inline-flex h-14 items-center justify-center rounded-[18px] bg-[linear-gradient(90deg,#8B5CF6_0%,#3B82F6_52%,#EC4899_100%)] px-7 text-base font-medium text-white shadow-[0_0_34px_rgba(99,102,241,0.4)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgba(236,72,153,0.24)]">
                  Start Analysis
                </button>
                <button className="inline-flex h-14 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.025] px-7 text-base font-medium text-white/82 backdrop-blur-xl transition duration-300 hover:border-white/18 hover:bg-white/[0.045]">
                  View Demo
                </button>
              </div>

              <GlassCard className="mt-8 animate-[fadeUp_1050ms_ease-out_540ms_both] p-4 sm:p-5">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[18px] border border-white/6 bg-[#0E1424]/84 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Ask CoinSage AI about Bitcoin momentum, ETH rotation, or market risk..."
                      className="h-14 flex-1 rounded-[16px] border border-white/6 bg-white/[0.035] px-4 text-base text-white outline-none transition duration-300 focus:border-violet-400/35 focus:bg-white/[0.05] placeholder:text-white/32"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-14 shrink-0 items-center justify-center rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#3B82F6_52%,#EC4899_100%)] px-6 text-base font-medium text-white shadow-[0_0_30px_rgba(99,102,241,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(236,72,153,0.2)]"
                    >
                      Run Query
                    </button>
                  </div>
                </form>

                {queryHistory.length ? (
                  <div className="mt-3">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/32">Recent queries</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {queryHistory.map((item) => (
                        <button
                          key={item}
                          type="button"
                          className="query-history-pill"
                          onClick={() => runQuery(item)}
                          title="Re-run query"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {workflowVisible ? (
                  <div className="mt-5 rounded-[20px] border border-white/6 bg-[#0B1120]/82 p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] animate-[fadeScale_420ms_ease-out_both]">
                    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1.2fr_0.8fr]">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-sm text-white/42">Active query</div>
                            <div className="mt-1 text-base font-medium text-white">{query}</div>
                          </div>
                          <div className="workflow-status">
                            <span className={`workflow-status-dot ${workflowFinished ? "workflow-status-dot-complete" : ""}`} />
                            <span className="workflow-status-text">
                              {workflowFinished ? "Analysis Complete" : "Live Analysis Running"}
                            </span>
                          </div>
                        </div>

                        <div className="agent-run-list mx-auto mt-6 max-w-[580px] space-y-4">
                          {liveAgentSteps.map((step, index) => {
                            const isCompleted = workflowFinished || index < activeStep;
                            const isActive = !workflowFinished && index === activeStep;
                            const isSegmentComplete = workflowFinished || index < activeStep - 1;
                            const isSegmentActive = !workflowFinished && index === activeStep - 1;

                            return (
                              <div key={step.title} className="agent-run-step-item">
                                <div
                                  className={`agent-run-node ${isCompleted ? "agent-run-node-complete" : ""} ${
                                    isActive ? "agent-run-node-active" : ""
                                  }`}
                                  aria-hidden="true"
                                >
                                  {isCompleted ? <Check size={12} strokeWidth={3} /> : <span className="agent-run-node-hollow" />}
                                </div>

                                {index < liveAgentSteps.length - 1 ? (
                                  <div
                                    className={`agent-run-connector ${
                                      isSegmentComplete ? "agent-run-connector-complete" : ""
                                    } ${isSegmentActive ? "agent-run-connector-active" : ""}`}
                                  />
                                ) : null}

                                <div
                                  className={`agent-run-step ${isActive ? "agent-run-step-active" : ""} ${isCompleted ? "agent-run-step-complete" : ""}`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div
                                      className={`agent-run-icon ${isCompleted ? "agent-run-icon-complete" : ""} ${
                                        isActive ? "agent-run-icon-active" : ""
                                      }`}
                                    >
                                      <step.Icon
                                        size={18}
                                        strokeWidth={2}
                                        className={isActive ? "text-white" : isCompleted ? "text-emerald-200" : "text-[#9CA3AF]"}
                                      />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center justify-between gap-3">
                                        <div className="text-sm font-medium text-white sm:text-base">{step.title}</div>
                                        <div className="text-xs text-white/32">0{index + 1}</div>
                                      </div>
                                      <div className="mt-1 text-sm leading-6 text-white/48">{step.detail}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-[18px] border border-white/6 bg-[#0D1322]/86 p-5">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-white">Tool Call Logs</div>
                          <div className="flex items-center gap-2 text-xs text-white/36">
                            <span className={`h-2 w-2 rounded-full ${workflowFinished ? "bg-emerald-400" : "bg-violet-400 animate-pulse"}`} />
                            {workflowFinished ? "Complete" : "Streaming"}
                          </div>
                        </div>

                        <div className="tool-terminal mt-4">
                          {toolLogEntries.map((log) => {
                            const visible = visibleLogs.some((entry) => entry.label === log.label);

                            return (
                              <div key={log.label} className={`tool-terminal-line ${visible ? "tool-terminal-line-visible" : ""}`}>
                                <span className="tool-terminal-dot" aria-hidden="true" />
                                <span className="tool-terminal-text">{log.label}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="recommendation-shell mt-5">
                          <div className="recommendation-card">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="recommendation-title">AI Recommendation</div>
                                <div
                                  className={`recommendation-text ${workflowFinished ? "recommendation-typed-in" : ""}`}
                                  aria-live="polite"
                                >
                                  {workflowFinished ? typedRecommendation : recommendationText}
                                  <span
                                    className={`type-cursor ${workflowFinished ? "" : "type-cursor-muted"} ${
                                      workflowFinished ? "type-cursor-blink" : ""
                                    }`}
                                    aria-hidden="true"
                                  >
                                    {workflowFinished ? (isTypingRecommendation ? "▍" : "▍") : ""}
                                  </span>
                                </div>
                              </div>
                              <div className="recommendation-chip">{Math.round(recommendationConfidence * 100)}%</div>
                            </div>

                            {workflowFinished ? (
                              <div className="confidence-meter mt-5">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="text-sm font-medium text-white/84">Confidence Level</div>
                                  <div className="text-sm text-white/64">{animatedConfidence}%</div>
                                </div>
                                <div className="mt-2 text-xs text-white/44">
                                  Based on data consistency and signal agreement
                                </div>
                                <div className="confidence-bar mt-3" aria-hidden="true">
                                  <div className="confidence-bar-fill" style={{ width: `${animatedConfidence}%` }} />
                                </div>
                              </div>
                            ) : null}

                            <div className="mt-5">
                              <div className="text-xs font-medium uppercase tracking-[0.18em] text-white/38">
                                Signals Used
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {signalsUsed.map((signal) => (
                                  <span key={signal.label} className="signal-pill">
                                    <signal.Icon size={14} strokeWidth={2} />
                                    <span>{signal.label}</span>
                                  </span>
                                ))}
                              </div>
                              <div className="mt-3 text-xs leading-6 text-white/40">
                                Transparency note: these signals inform the agent’s final framing and confidence.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </GlassCard>

              <div className="mt-12 grid max-w-xl gap-4 sm:grid-cols-3 animate-[fadeUp_1050ms_ease-out_540ms_both]">
                {[
                  ["94%", "Signal clarity"],
                  ["18+", "Linked tools"],
                  ["<1m", "Insight cycles"],
                ].map(([value, label]) => (
                  <GlassCard key={label} className="px-4 py-5">
                    <div className="text-2xl font-semibold text-white">{value}</div>
                    <div className="mt-2 text-sm text-white/50">{label}</div>
                  </GlassCard>
                ))}
              </div>
            </div>

            <div className="animate-[fadeScale_1100ms_ease-out_240ms_both]">
              <div className="relative mx-auto flex aspect-[1.02] w-full max-w-[580px] items-center justify-center">
                <div className="absolute inset-[10%] rounded-full border border-white/8 bg-[radial-gradient(circle,rgba(99,102,241,0.22),transparent_58%)] blur-3xl" />
                <div className="absolute inset-[18%] rounded-full border border-white/8 bg-[radial-gradient(circle,rgba(236,72,153,0.14),transparent_64%)] blur-3xl" />

                <GlassCard className="relative h-[76%] w-[76%] overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(15,20,36,0.94),rgba(8,11,20,0.92))] p-6">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.16),transparent_34%,rgba(59,130,246,0.12)_70%,rgba(236,72,153,0.12))]" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-white/46">Agentic market board</div>
                        <div className="mt-2 text-2xl font-semibold text-white">Live Decision Graph</div>
                      </div>
                      <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                        Online
                      </div>
                    </div>

                    <div className="relative mt-8 flex-1">
                      <div className="absolute left-[6%] top-[8%] floating-card rounded-[20px] border border-white/10 bg-[#11172A]/86 px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F7931A,#FFCF70)] text-lg font-semibold text-[#1A1205] shadow-[0_0_24px_rgba(247,147,26,0.35)]">
                            BTC
                          </div>
                          <div>
                            <div className="text-sm text-white/46">Bitcoin</div>
                            <div className="mt-1 text-lg font-semibold">$68,240</div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute right-[4%] top-[22%] floating-card-delayed rounded-[20px] border border-white/10 bg-[#10192D]/86 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#627EEA,#A8B8FF)] text-lg font-semibold text-white shadow-[0_0_24px_rgba(98,126,234,0.35)]">
                            ETH
                          </div>
                          <div>
                            <div className="text-sm text-white/46">Ethereum</div>
                            <div className="mt-1 text-lg font-semibold">$3,420</div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-[10%] left-[12%] right-[10%] rounded-[20px] border border-white/10 bg-[#0D1322]/86 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.34)]">
                        <div className="flex items-center justify-between text-sm text-white/46">
                          <span>Trend engine</span>
                          <span className="text-fuchsia-300">Bullish momentum</span>
                        </div>
                        <div className="mt-5">
                          <div className="chart-line h-28 w-full rounded-[18px]" />
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                          <div>
                            <div className="text-sm text-white/46">Confidence</div>
                            <div className="mt-1 text-2xl font-semibold">82%</div>
                          </div>
                          <div className="rounded-full border border-fuchsia-400/18 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200">
                            Agent consensus +12%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="animate-[fadeUp_1000ms_ease-out_180ms_both]">
            <div className="max-w-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-white/38">Workflow</div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">How CoinSage AI Works</h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-5">
              {workflowSteps.map((step, index) => (
                <GlassCard
                  key={step.title}
                  className="group px-5 py-6 transition duration-300 hover:-translate-y-1 hover:border-white/18 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="workflow-icon-shell">
                      <div className="workflow-icon-glow" />
                      <div className="workflow-icon-core">
                        <step.Icon size={22} strokeWidth={1.9} className="workflow-icon-svg" />
                      </div>
                    </div>
                    <div className="text-xs text-white/28">0{index + 1}</div>
                  </div>
                  <div className="mt-5 text-lg font-medium text-white">{step.title}</div>
                  <div className="mt-3 text-sm leading-7 text-white/54">{step.detail}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-18">
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="animate-[fadeUp_1000ms_ease-out_240ms_both]">
              <div className="text-sm uppercase tracking-[0.24em] text-white/38">Features</div>
              <h2 className="mt-4 max-w-md text-3xl font-semibold text-white sm:text-4xl">
                Built for high-context crypto research teams
              </h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-white/56">
                CoinSage AI combines real-time market intelligence with agentic reasoning so every signal is weighed, challenged, and structured before it reaches you.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 animate-[fadeUp_1050ms_ease-out_320ms_both]">
              {features.map((feature) => (
                <GlassCard
                  key={feature.title}
                  className="group px-5 py-6 transition duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.07]"
                >
                    <div className="inline-flex rounded-full border border-white/8 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/38">
                    Core
                  </div>
                  <div className="mt-5 text-xl font-semibold text-white">{feature.title}</div>
                  <div className="mt-4 text-sm leading-7 text-white/56">{feature.description}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="animate-[fadeUp_1000ms_ease-out_260ms_both]">
              <div className="text-sm uppercase tracking-[0.24em] text-white/38">Preview</div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">A dashboard that turns noise into action</h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-white/56">
                Signals, risk framing, and agent confidence stay visible in one place so you can move from research to decision with less friction.
              </p>
            </div>

            <GlassCard className="animate-[fadeScale_1050ms_ease-out_320ms_both] overflow-hidden p-6">
              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[20px] border border-white/6 bg-[#0D1322]/86 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/44">Trend</div>
                      <div className="mt-2 text-3xl font-semibold text-white">Bullish</div>
                    </div>
                    <div className="rounded-full border border-emerald-400/16 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                      Live
                    </div>
                  </div>
                  <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/8">
                    <div className="glow-progress h-full w-[78%] rounded-full bg-[linear-gradient(90deg,#8B5CF6_0%,#3B82F6_50%,#EC4899_100%)]" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/42">
                    <span>Momentum score</span>
                    <span>78 / 100</span>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[20px] border border-white/6 bg-[#0D1322]/86 p-5">
                    <div className="text-sm text-white/44">Risk</div>
                    <div className="mt-3 text-2xl font-semibold text-white">Medium</div>
                    <div className="mt-3 text-sm text-white/52">Volatility elevated, structure intact</div>
                  </div>
                  <div className="rounded-[20px] border border-white/6 bg-[#0D1322]/86 p-5">
                    <div className="text-sm text-white/44">Confidence</div>
                    <div className="mt-3 text-2xl font-semibold text-white">82%</div>
                    <div className="mt-3 text-sm text-white/52">Consensus across 5 active agents</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        <footer className="mt-16 border-t border-white/8 py-8">
          <div className="flex flex-col gap-4 text-sm text-white/44 sm:flex-row sm:items-center sm:justify-between">
            <div>Powered by Agentic AI</div>
            <div className="flex flex-wrap items-center gap-5">
              {footerLinks.map((link) => (
                <a key={link} href="#" className="transition hover:text-white/70">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

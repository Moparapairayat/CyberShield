import {
  AlertTriangle,
  Binary,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  Database,
  Fingerprint,
  GitBranch,
  Gauge,
  KeyRound,
  Layers3,
  Network,
  Route,
  ShieldCheck,
  Siren,
  UserCog
} from "lucide-react";
import { motion } from "framer-motion";
import CyberCard from "../components/CyberCard.jsx";

const concepts = [
  {
    title: "Class and Object",
    icon: Boxes,
    detail: "CyberShield creates real objects from classes such as User, Admin, ThreatDetector, RiskAnalyzer, AlertSystem, and AttackSimulator.",
    proof: "Objects are created inside service files such as authService and securityService.",
    files: "backend/src/classes/*.js"
  },
  {
    title: "Constructor",
    icon: Binary,
    detail: "Constructors initialize user identity, access permissions, detector dependencies, simulator data, and scoring rules.",
    proof: "new User(payload), new Admin(payload), new ThreatDetector()",
    files: "User.js, Admin.js, ThreatDetector.js"
  },
  {
    title: "Inheritance",
    icon: GitBranch,
    detail: "Admin extends User, reuses common profile behavior, and adds administrator permissions for simulations and reports.",
    proof: "Admin inherits User behavior and customizes role-based access.",
    files: "Admin.js extends User.js"
  },
  {
    title: "Encapsulation",
    icon: KeyRound,
    detail: "Sensitive data and scoring rules are hidden behind class methods, so outside modules cannot directly modify internal state.",
    proof: "Private fields protect password hashes and risk weights.",
    files: "#passwordHash, #weights"
  },
  {
    title: "Polymorphism",
    icon: AlertTriangle,
    detail: "Warning and danger alerts share a common alert contract but format different messages, levels, and recommendations.",
    proof: "Different alert types use the same method structure but return different outputs.",
    files: "AlertSystem.js"
  },
  {
    title: "Abstraction",
    icon: Layers3,
    detail: "The threat analysis layer hides scoring complexity and exposes a clean workflow to the service layer.",
    proof: "ThreatDetector handles analysis, so controllers remain simple.",
    files: "BaseThreatAnalyzer.js"
  }
];

const classes = [
  ["User", "Represents a normal SOC analyst with profile data and shared user behavior."],
  ["Admin", "Specialized user with elevated permissions for attack simulation and reports."],
  ["LoginAttempt", "Stores successful, failed, blocked, and suspicious login activity in MongoDB."],
  ["ThreatDetector", "Reads login context and detects brute-force, rapid requests, unknown users, and risky IP signals."],
  ["RiskAnalyzer", "Calculates numerical risk score and predicts Low, Medium, High, or Critical threat level."],
  ["AlertSystem", "Generates warning or danger alerts with recommendations using polymorphic alert formatting."],
  ["ThreatLogger", "Creates structured threat log records for dashboard tables, history, and reports."],
  ["DashboardManager", "Aggregates MongoDB collections into stat cards, charts, risk meter, and activity feed."],
  ["AttackSimulator", "Creates safe demo events for presentation without targeting any real system."]
];

const flow = [
  { label: "React UI", icon: Network },
  { label: "Axios API", icon: Binary },
  { label: "Express Routes", icon: GitBranch },
  { label: "Controllers", icon: Layers3 },
  { label: "Services", icon: BrainCircuit },
  { label: "OOP Classes", icon: Boxes },
  { label: "MongoDB", icon: Database }
];

const projectStats = [
  ["Project", "CyberShield", ShieldCheck],
  ["Architecture", "MERN + MVC + OOP", Route],
  ["AI Logic", "Risk Score Engine", BrainCircuit],
  ["Threat Levels", "Low to Critical", Gauge]
];

const vivaPoints = [
  "This project is more than basic CRUD. It has real domain classes for users, alerts, risk analysis, logging, dashboard aggregation, and attack simulation.",
  "MVC is used for clean separation: routes receive requests, controllers coordinate, services run business logic, OOP classes handle cyber intelligence, and models persist data.",
  "The AI-like part is rule-based intelligence: it analyzes failed logins, request speed, suspicious IP behavior, unknown users, and simulation metadata to predict a threat level.",
  "The project is safe for classroom demonstration because attack simulation creates controlled database events instead of targeting any real system."
];

const collections = [
  ["users", "Analyst/admin accounts, bcrypt password hash, role, preferences, lockout state"],
  ["loginAttempts", "Authentication event trail used for brute-force and abnormal pattern detection"],
  ["alerts", "Generated warning/danger alerts with level, score, recommendation, and status"],
  ["threatLogs", "Security timeline for dashboard, search, filter, and report generation"],
  ["riskAnalysis", "AI-like scoring records with factors and recommendations"]
];

export default function OopDesignPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <CyberCard className="corner-brackets">
          <p className="font-mono text-sm uppercase text-cyber-lime">BITHM College Of Professional</p>
          <h1 className="mt-2 text-3xl font-extrabold text-white light:text-slate-950">CyberShield OOP Architecture</h1>
          <p className="mt-3 max-w-3xl text-slate-400 light:text-slate-600">
            CyberShield is an AI-based cyber threat detection and alert system built with MERN, MVC, JWT authentication, MongoDB, and a dedicated OOP threat-intelligence layer.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {projectStats.map(([label, value, Icon]) => (
              <div key={label} className="rounded-md border border-white/10 bg-white/[0.04] p-4 light:border-slate-200 light:bg-white/70">
                <Icon className="h-5 w-5 text-cyber-cyan" />
                <p className="mt-3 text-xs uppercase text-slate-400 light:text-slate-600">{label}</p>
                <p className="mt-1 text-sm font-extrabold text-white light:text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </CyberCard>

        <CyberCard className="corner-brackets">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-cyber-red text-white shadow-danger">
              <Siren className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white light:text-slate-950">Presentation Identity</h2>
              <p className="text-sm text-slate-400 light:text-slate-600">Prepared for project presentation and viva questions.</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              ["Project Type", "University CSE OOP Project"],
              ["Core Feature", "AI-like threat detection and alert generation"],
              ["Security Focus", "Login abuse, brute-force behavior, suspicious IP, abnormal activity"],
              ["Demo Mode", "Safe simulated attacks for classroom presentation"]
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-4 rounded-md border border-white/10 bg-white/[0.04] p-3 light:border-slate-200 light:bg-white/70">
                <span className="text-xs uppercase text-slate-400 light:text-slate-600">{label}</span>
                <span className="text-right text-sm font-bold text-white light:text-slate-950">{value}</span>
              </div>
            ))}
          </div>
        </CyberCard>
      </div>

      <CyberCard>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-cyber-cyan text-slate-950">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white light:text-slate-950">System Architecture Flow</h2>
            <p className="text-sm text-slate-400 light:text-slate-600">MVC structure with a separate OOP layer for threat analysis.</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-7">
          {flow.map((item, index) => (
            <div key={item.label} className="relative rounded-md border border-white/10 bg-white/[0.04] p-4 text-center light:border-slate-200 light:bg-white/70">
              <item.icon className="mx-auto h-6 w-6 text-cyber-cyan" />
              <p className="mt-3 text-sm font-bold text-white light:text-slate-950">{item.label}</p>
              {index < flow.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyber-cyan/60 md:block" />
              )}
            </div>
          ))}
        </div>
      </CyberCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {concepts.map((concept) => (
          <CyberCard key={concept.title}>
            <concept.icon className="mb-4 h-7 w-7 text-cyber-cyan" />
            <h2 className="text-lg font-bold text-white light:text-slate-950">{concept.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-700">{concept.detail}</p>
            <div className="mt-4 flex gap-3 rounded-md border border-cyber-lime/20 bg-cyber-lime/[0.07] p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyber-lime" />
              <p className="text-xs leading-5 text-slate-300 light:text-slate-700">{concept.proof}</p>
            </div>
            <p className="mt-4 rounded bg-cyber-cyan/10 px-3 py-2 font-mono text-xs text-cyber-cyan light:text-sky-700">
              {concept.files}
            </p>
          </CyberCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <CyberCard>
          <div className="mb-5 flex items-center gap-3">
            <UserCog className="h-6 w-6 text-cyber-lime" />
            <h2 className="text-lg font-bold text-white light:text-slate-950">Main Class Responsibilities</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {classes.map(([name, detail]) => (
              <div key={name} className="rounded-md border border-white/10 bg-white/[0.04] p-4 light:border-slate-200 light:bg-white/70">
                <p className="font-mono text-sm font-bold text-cyber-cyan">{name}</p>
                <p className="mt-2 text-sm text-slate-300 light:text-slate-700">{detail}</p>
              </div>
            ))}
          </div>
        </CyberCard>

        <CyberCard>
          <div className="mb-5 flex items-center gap-3">
            <BrainCircuit className="h-6 w-6 text-cyber-violet" />
            <h2 className="text-lg font-bold text-white light:text-slate-950">Threat Detection Pipeline</h2>
          </div>
          <div className="space-y-3">
            {[
              "Each login attempt is stored in loginAttempts.",
              "ThreatDetector checks failed attempts, request speed, IP behavior, and simulation flags.",
              "RiskAnalyzer calculates score and predicts Low, Medium, High, or Critical.",
              "AlertSystem creates smart alerts and recommendations.",
              "DashboardManager aggregates analytics for charts and reports."
            ].map((step, index) => (
              <div key={step} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3 light:border-slate-200 light:bg-white/70">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-cyber-cyan text-sm font-extrabold text-slate-950">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-300 light:text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </CyberCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <CyberCard>
          <div className="mb-5 flex items-center gap-3">
            <Database className="h-6 w-6 text-cyber-cyan" />
            <h2 className="text-lg font-bold text-white light:text-slate-950">MongoDB Collections Used</h2>
          </div>
          <div className="space-y-3">
            {collections.map(([name, purpose]) => (
              <div key={name} className="rounded-md border border-white/10 bg-white/[0.04] p-4 light:border-slate-200 light:bg-white/70">
                <p className="font-mono text-sm font-bold text-cyber-cyan">{name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300 light:text-slate-700">{purpose}</p>
              </div>
            ))}
          </div>
        </CyberCard>

        <CyberCard>
          <div className="mb-5 flex items-center gap-3">
            <Fingerprint className="h-6 w-6 text-cyber-lime" />
            <h2 className="text-lg font-bold text-white light:text-slate-950">Viva-Ready Explanation</h2>
          </div>
          <div className="space-y-3">
            {vivaPoints.map((point, index) => (
              <div key={point} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.04] p-4 light:border-slate-200 light:bg-white/70">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-cyber-lime text-sm font-extrabold text-slate-950">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-300 light:text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </CyberCard>
      </div>
    </motion.div>
  );
}

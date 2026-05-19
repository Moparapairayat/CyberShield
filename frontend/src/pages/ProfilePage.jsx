import { BadgeCheck, KeyRound, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import CyberCard from "../components/CyberCard.jsx";
import StatusIndicator from "../components/StatusIndicator.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProfilePage() {
  const { user, isAdmin } = useAuth();
  const security = user?.security || {};
  const lockStatus = security.isLocked ? "Locked" : "Protected";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <p className="font-mono text-sm uppercase text-cyber-lime">Account Overview</p>
        <h1 className="mt-1 text-3xl font-extrabold text-white light:text-slate-950">Profile</h1>
        <p className="mt-2 max-w-3xl text-slate-400 light:text-slate-600">
          View the signed-in user, role, session status, and account security information.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <CyberCard>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-cyber-cyan text-slate-950 shadow-neon">
              <UserRound className="h-10 w-10" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white light:text-slate-950">{user?.name}</h2>
              <p className="text-slate-400 light:text-slate-600">{user?.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <StatusIndicator label="Role" status={isAdmin ? "Active" : "Online"} />
            <StatusIndicator label="Department" status={user?.department || "Active"} />
            <StatusIndicator label="Session" status="Online" />
            <StatusIndicator label="Account Protection" status={lockStatus} />
          </div>
        </CyberCard>

        <CyberCard>
          <h2 className="mb-5 text-lg font-bold text-white light:text-slate-950">Security Summary</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
              <ShieldCheck className="mb-4 h-7 w-7 text-cyber-lime" />
              <p className="text-sm text-slate-400">JWT Session</p>
              <p className="mt-2 font-bold text-white light:text-slate-950">Verified</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
              <KeyRound className="mb-4 h-7 w-7 text-cyber-cyan" />
              <p className="text-sm text-slate-400">Password</p>
              <p className="mt-2 font-bold text-white light:text-slate-950">Protected Hash</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
              <BadgeCheck className="mb-4 h-7 w-7 text-cyber-amber" />
              <p className="text-sm text-slate-400">Access</p>
              <p className="mt-2 font-bold text-white light:text-slate-950">{isAdmin ? "Admin" : "Analyst"}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
              <LockKeyhole className={security.isLocked ? "mb-4 h-7 w-7 text-cyber-red" : "mb-4 h-7 w-7 text-cyber-lime"} />
              <p className="text-sm text-slate-400">Lockout</p>
              <p className="mt-2 font-bold text-white light:text-slate-950">
                {security.isLocked ? "Locked" : "Clear"}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Failed attempts: {security.failedLoginCount || 0}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-cyan-300/20 bg-cyber-cyan/10 p-4 text-sm leading-6 text-cyan-100 light:text-sky-900">
            Presentation note: the backend creates a `User` or `Admin` domain object after authentication. `Admin extends User`, while account lockout data remains part of the user's protected security state.
          </div>
        </CyberCard>
      </div>
    </motion.div>
  );
}

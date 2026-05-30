import { useState, useEffect, useCallback, useRef } from "react";

// ─── Icons ───
const Icons = {
  Home: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Plus: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Send: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Settings: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Edit: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Calendar: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  List: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Sparkle: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>,
  ChevLeft: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Trash: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Copy: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Loader: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  ExternalLink: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Filter: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Phone: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Globe: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Share: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  Key: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
  Image: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Refresh: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  FileText: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
  Message: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Download: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Cloud: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
};

// ─── Constants ───
const STATUS_CONFIG = {
  draft: { label: "Entwurf", color: "bg-amber-100 text-amber-800 border-amber-300", dot: "bg-amber-500" },
  review: { label: "Freigabe", color: "bg-blue-100 text-blue-800 border-blue-300", dot: "bg-blue-500" },
  changes: { label: "Änderung", color: "bg-rose-100 text-rose-800 border-rose-300", dot: "bg-rose-500" },
  ready: { label: "Bereit", color: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-500" },
  sent: { label: "Versendet", color: "bg-slate-100 text-slate-600 border-slate-300", dot: "bg-slate-500" },
};

const TONALITIES = [
  "Sachlich & informativ", "Motivierend & begeisternd", "Feierlich & würdigend",
  "Dringend & aufrufend", "Locker & nahbar", "Offiziell & förmlich",
];

const SEND_METHODS = [
  { value: "whatsapp", label: "WhatsApp", icon: "Phone" },
  { value: "email", label: "E-Mail", icon: "Mail" },
  { value: "web", label: "Web/CMS", icon: "Globe" },
  { value: "share", label: "Teilen-Menü", icon: "Share" },
];

const ROLES = [
  { value: "admin", label: "Administrator", desc: "Volle Rechte: Konfiguration, Freigabe, Versand" },
  { value: "editor", label: "Redakteur", desc: "Entwürfe erstellen, bearbeiten, freigeben" },
  { value: "author", label: "Autor", desc: "Entwürfe erstellen und bearbeiten" },
];

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

// ─── Helpers ───
const genId = () => Math.random().toString(36).slice(2, 10);
const today = () => new Date().toISOString().slice(0, 10);
const formatDate = (d) => {
  if (!d) return "–";
  return new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
};
const formatTime = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
};
const getWeekDates = (offset = 0) => {
  const now = new Date();
  now.setDate(now.getDate() + offset * 7);
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
};
const canApprove = (role) => ["admin", "editor"].includes(role);
const canSend = (role) => ["admin", "editor"].includes(role);
const canConfig = (role) => role === "admin";

// ─── API Client ───
const CONN_KEY = "mcc-connection";
const USER_KEY = "mcc-current-user";
const getConn = () => { try { return JSON.parse(localStorage.getItem(CONN_KEY)) || {}; } catch { return {}; } };
const setConn = (c) => localStorage.setItem(CONN_KEY, JSON.stringify(c));

const api = {
  async call(path, opts = {}) {
    const { workerUrl, teamKey } = getConn();
    if (!workerUrl) throw new Error("Keine Backend-URL konfiguriert");
    const headers = { ...(opts.headers || {}) };
    if (teamKey) headers["x-team-key"] = teamKey;
    if (opts.body && typeof opts.body === "string" && !headers["Content-Type"]) headers["Content-Type"] = "application/json";
    const res = await fetch(workerUrl.replace(/\/$/, "") + path, { ...opts, headers });
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch { data = { raw: text }; }
    if (!res.ok) throw new Error(data.error || `Fehler ${res.status}`);
    return data;
  },
  health() { return this.call("/api/health"); },
  state() { return this.call("/api/state"); },
  saveDraft(d) { return this.call(`/api/drafts/${d.id}`, { method: "PUT", body: JSON.stringify(d) }); },
  deleteDraft(id) { return this.call(`/api/drafts/${id}`, { method: "DELETE" }); },
  putConfig(key, val) { return this.call(`/api/config/${key}`, { method: "PUT", body: JSON.stringify(val) }); },
  generate(params) { return this.call("/api/generate", { method: "POST", body: JSON.stringify(params) }); },
  getActivity(id) { return this.call(`/api/activity/${id}`); },
  addActivity(a) { return this.call("/api/activity", { method: "POST", body: JSON.stringify(a) }); },
  uploadImage(file) { return this.call("/api/upload", { method: "POST", body: file, headers: { "Content-Type": file.type } }); },
};

// ─── UI Components ───
function Toast({ message, kind, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const bg = kind === "error" ? "bg-rose-600" : "bg-slate-900";
  return (
    <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 ${bg} text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-fade-in max-w-md text-center`}>
      {message}
    </div>
  );
}

function StatusBadge({ status, small }) {
  const c = STATUS_CONFIG[status];
  if (!c) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${c.color} ${small ? "text-[10px] px-2 py-0.5" : ""}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />{c.label}
    </span>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><Icons.X className="w-5 h-5" /></button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}

// Reusable editor for simple string lists (audiences, goals)
function StringListEditor({ title, items, onSave, canEdit, notify, placeholder }) {
  const [newItem, setNewItem] = useState("");
  const add = () => {
    const v = newItem.trim();
    if (!v) return;
    if (items.includes(v)) { notify && notify("Eintrag existiert bereits", "error"); return; }
    onSave([...items, v]);
    setNewItem("");
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="font-bold text-sm mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {items.length === 0 && <span className="text-xs text-slate-300 italic">Noch keine Einträge</span>}
        {items.map((item, i) => (
          <span key={item} className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-slate-100 text-sm font-medium text-slate-700">
            {item}
            {canEdit && <button onClick={() => onSave(items.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-rose-600"><Icons.X className="w-3.5 h-3.5" /></button>}
          </span>
        ))}
      </div>
      {canEdit && (
        <div className="flex gap-2">
          <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder={placeholder} className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm" />
          <button onClick={add} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700">Hinzufügen</button>
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App() {
  const [booted, setBooted] = useState(false);
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);

  const [view, setView] = useState("dashboard");
  const [settingsTab, setSettingsTab] = useState("club");
  const [dashTab, setDashTab] = useState("overview");
  const [weekOffset, setWeekOffset] = useState(0);
  const [toast, setToast] = useState(null);
  const [selectedDraftId, setSelectedDraftId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem(USER_KEY) || "u1");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Data (from backend)
  const [drafts, setDrafts] = useState([]);
  const [channels, setChannels] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [clubSettings, setClubSettings] = useState({ clubName: "", hashtags: "", signature: "", toneExamples: "" });
  const [templates, setTemplates] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [goals, setGoals] = useState([]);
  const [activity, setActivity] = useState([]);

  // Connection form
  const conn = getConn();
  const [connUrl, setConnUrl] = useState(conn.workerUrl || "");
  const [connKey, setConnKey] = useState(conn.teamKey || "");

  // Draft form
  const emptyForm = {
    occasion: "", department: "", targetAudience: "", goal: "", deadline: "",
    channels: [], tonality: TONALITIES[0],
    coreMessage: "", subject: "", channelTexts: {}, checklist: [], imageUrl: "",
  };
  const [draftForm, setDraftForm] = useState(emptyForm);
  const [aiLoading, setAiLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [commentModal, setCommentModal] = useState(null); // { draftId }
  const [commentText, setCommentText] = useState("");
  const fileInputRef = useRef(null);

  const currentUser = users.find(u => u.id === currentUserId) || users[0] || { role: "admin", name: "—" };
  const selectedDraft = drafts.find(d => d.id === selectedDraftId);

  const notify = (msg, kind) => setToast({ msg, kind });

  // ─── Load state from backend ───
  const refreshState = useCallback(async (silent) => {
    if (!silent) setSyncing(true);
    try {
      const s = await api.state();
      setDrafts(s.drafts || []);
      setChannels(s.channels || []);
      setDepartments(s.departments || []);
      setUsers(s.users || []);
      setClubSettings(s.settings || { clubName: "", hashtags: "", signature: "", toneExamples: "" });
      setTemplates(s.templates || []);
      setAudiences(s.audiences || []);
      setGoals(s.goals || []);
      setConnected(true);
      setLastSync(new Date());
    } catch (err) {
      if (!silent) notify(err.message, "error");
      setConnected(false);
    } finally {
      if (!silent) setSyncing(false);
    }
  }, []);

  // ─── Boot ───
  useEffect(() => {
    (async () => {
      if (getConn().workerUrl) {
        await refreshState();
      }
      setBooted(true);
    })();
  }, [refreshState]);

  // ─── Polling (nur auf Dashboard, alle 20s) ───
  useEffect(() => {
    if (!connected || view !== "dashboard") return;
    const t = setInterval(() => refreshState(true), 20000);
    return () => clearInterval(t);
  }, [connected, view, refreshState]);

  // ─── Connect ───
  const handleConnect = async () => {
    if (!connUrl.trim()) { notify("Bitte Backend-URL eingeben", "error"); return; }
    setConn({ workerUrl: connUrl.trim(), teamKey: connKey.trim() });
    setSyncing(true);
    await refreshState();
    setSyncing(false);
  };

  // ─── Config save helpers ───
  const saveChannels = async (next) => { setChannels(next); try { await api.putConfig("channels", next); } catch (e) { notify(e.message, "error"); } };
  const saveDepartments = async (next) => { setDepartments(next); try { await api.putConfig("departments", next); } catch (e) { notify(e.message, "error"); } };
  const saveUsers = async (next) => { setUsers(next); try { await api.putConfig("users", next); } catch (e) { notify(e.message, "error"); } };
  const saveTemplates = async (next) => { setTemplates(next); try { await api.putConfig("templates", next); } catch (e) { notify(e.message, "error"); } };
  const saveAudiences = async (next) => { setAudiences(next); try { await api.putConfig("audiences", next); } catch (e) { notify(e.message, "error"); } };
  const saveGoals = async (next) => { setGoals(next); try { await api.putConfig("goals", next); } catch (e) { notify(e.message, "error"); } };
  const saveClubSettings = async (next) => { setClubSettings(next); try { await api.putConfig("settings", next); notify("Vereinsprofil gespeichert"); } catch (e) { notify(e.message, "error"); } };

  // ─── Activity logging ───
  const logActivity = async (draftId, action, note) => {
    try { await api.addActivity({ draftId, userName: currentUser.name, action, note }); } catch { /* non-critical */ }
  };

  // ─── Draft actions ───
  const persistDraft = async (draftObj) => {
    const saved = await api.saveDraft(draftObj);
    setDrafts(prev => {
      const exists = prev.some(d => d.id === saved.id);
      return exists ? prev.map(d => d.id === saved.id ? saved : d) : [saved, ...prev];
    });
    return saved;
  };

  const saveDraft = async (formData, existingId) => {
    try {
      const base = existingId ? drafts.find(d => d.id === existingId) : null;
      const obj = {
        id: existingId || genId(),
        ...formData,
        status: base?.status || "draft",
        createdAt: base?.createdAt || new Date().toISOString(),
        createdBy: base?.createdBy || currentUserId,
        sentChannels: base?.sentChannels || [],
      };
      await persistDraft(obj);
      notify(existingId ? "Entwurf aktualisiert" : "Entwurf gespeichert");
      setView("dashboard");
    } catch (err) { notify(err.message, "error"); }
  };

  const deleteDraft = async (id) => {
    try {
      await api.deleteDraft(id);
      setDrafts(prev => prev.filter(d => d.id !== id));
      if (selectedDraftId === id) setSelectedDraftId(null);
      setView("dashboard");
      notify("Entwurf gelöscht");
    } catch (err) { notify(err.message, "error"); }
  };

  const setStatus = async (id, status, note) => {
    try {
      const d = drafts.find(x => x.id === id);
      if (!d) return;
      const updated = { ...d, status, lastComment: status === "changes" ? note : d.lastComment };
      await persistDraft(updated);
      await logActivity(id, `status:${status}`, note);
      notify(`Status: ${STATUS_CONFIG[status].label}`);
    } catch (err) { notify(err.message, "error"); }
  };

  const confirmChannelSent = async (draftId, channelId, channelName) => {
    try {
      const d = drafts.find(x => x.id === draftId);
      if (!d) return;
      const sc = d.sentChannels?.includes(channelId) ? d.sentChannels : [...(d.sentChannels || []), channelId];
      await persistDraft({ ...d, sentChannels: sc });
      await logActivity(draftId, `sent:${channelName}`);
      notify(`${channelName} als gesendet bestätigt`);
    } catch (err) { notify(err.message, "error"); }
  };

  // ─── Filtering & KPI ───
  const filteredDrafts = drafts.filter(d => {
    if (filterDept !== "all" && d.department !== filterDept) return false;
    if (filterStatus !== "all" && d.status !== filterStatus) return false;
    return true;
  });
  const kpi = {
    total: drafts.length,
    draft: drafts.filter(d => d.status === "draft").length,
    review: drafts.filter(d => d.status === "review").length,
    changes: drafts.filter(d => d.status === "changes").length,
    ready: drafts.filter(d => d.status === "ready").length,
  };

  // ─── AI generate (channel-specific) ───
  const handleGenerate = async () => {
    if (!draftForm.occasion.trim()) { notify("Bitte Anlass angeben", "error"); return; }
    setAiLoading(true);
    try {
      const result = await api.generate({
        occasion: draftForm.occasion,
        department: draftForm.department,
        targetAudience: draftForm.targetAudience,
        goal: draftForm.goal,
        tonality: draftForm.tonality,
        channels: draftForm.channels.length ? draftForm.channels : channels.filter(c => c.active).map(c => c.name),
        ...clubSettings,
      });
      setDraftForm(prev => ({
        ...prev,
        coreMessage: result.coreMessage || "",
        subject: result.subject || "",
        channelTexts: result.channelTexts || {},
        checklist: (result.checklist || []).map(item => ({ text: item, checked: false })),
      }));
      notify("Kanalgerechte Texte erstellt!");
    } catch (err) { notify(err.message, "error"); }
    setAiLoading(false);
  };

  // ─── Image upload ───
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { notify("Bitte eine Bilddatei wählen", "error"); return; }
    setUploadLoading(true);
    try {
      const res = await api.uploadImage(file);
      if (res.url) {
        setDraftForm(prev => ({ ...prev, imageUrl: res.url }));
        notify("Bild hochgeladen");
      } else {
        notify("Hochgeladen, aber keine öffentliche URL (PUBLIC_IMAGE_BASE im Worker setzen)", "error");
      }
    } catch (err) { notify(err.message, "error"); }
    setUploadLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Navigation helpers ───
  const openEdit = (draft) => {
    setSelectedDraftId(draft.id);
    setDraftForm({
      occasion: draft.occasion || "", department: draft.department || "",
      targetAudience: draft.targetAudience || "", goal: draft.goal || "",
      deadline: draft.deadline || "", channels: draft.channels || [],
      tonality: draft.tonality || TONALITIES[0], coreMessage: draft.coreMessage || "",
      subject: draft.subject || "", channelTexts: draft.channelTexts || {},
      checklist: draft.checklist || [], imageUrl: draft.imageUrl || "",
    });
    api.getActivity(draft.id).then(r => setActivity(r.items || [])).catch(() => setActivity([]));
    setView("editDraft");
  };

  const openNew = (template) => {
    setSelectedDraftId(null);
    if (template) {
      setDraftForm({
        ...emptyForm,
        occasion: template.occasion || "",
        department: template.department || "",
        tonality: template.tonality || TONALITIES[0],
        channels: template.channels || [],
        targetAudience: template.targetAudience || "",
        goal: template.goal || "",
      });
      notify(`Vorlage "${template.name}" geladen`);
    } else {
      setDraftForm(emptyForm);
    }
    setActivity([]);
    setView("newDraft");
  };

  const openDispatch = (draft) => { setSelectedDraftId(draft.id); setView("dispatch"); };

  const copyText = (text) => {
    navigator.clipboard.writeText(text || "").then(() => notify("Kopiert!")).catch(() => notify("Kopieren fehlgeschlagen", "error"));
  };

  const channelText = (draft, channelName) => draft.channelTexts?.[channelName] || draft.coreMessage || "";

  const handleChannelAction = (channel, draft) => {
    const text = channelText(draft, channel.name);
    switch (channel.sendMethod) {
      case "whatsapp": {
        const url = channel.target
          ? `https://wa.me/${channel.target.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`
          : `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank"); break;
      }
      case "email": {
        const subj = encodeURIComponent(draft.subject || draft.occasion || "");
        const body = encodeURIComponent(text + (draft.imageUrl ? `\n\nBild: ${draft.imageUrl}` : ""));
        window.open(channel.target ? `mailto:${channel.target}?subject=${subj}&body=${body}` : `mailto:?subject=${subj}&body=${body}`, "_blank"); break;
      }
      case "web": {
        if (channel.target) window.open(channel.target, "_blank");
        else { copyText(text); notify("Text kopiert – bitte im CMS einfügen"); } break;
      }
      case "share": {
        if (navigator.share) navigator.share({ title: draft.subject || draft.occasion, text }).catch(() => {});
        else copyText(text);
        break;
      }
    }
  };

  // ─── Export ───
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ drafts, channels, departments, users, settings: clubSettings, templates, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `mcc-export-${today()}.json`; a.click();
    URL.revokeObjectURL(url);
    notify("Export erstellt");
  };

  // ═══════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════
  if (!booted) {
    return <div className="h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin"><Icons.Loader className="w-8 h-8 text-indigo-500" /></div></div>;
  }

  // ─── Connection setup screen ───
  if (!connected) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-7 w-full max-w-md">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Icons.Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">MultiChannelCockpit</h1>
              <p className="text-xs text-slate-400">Mit dem Team-Backend verbinden</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Backend-URL (Cloudflare Worker)</label>
              <input type="url" value={connUrl} onChange={e => setConnUrl(e.target.value)}
                placeholder="https://mcc-api.dein-account.workers.dev"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Team-Schlüssel</label>
              <input type="password" value={connKey} onChange={e => setConnKey(e.target.value)}
                placeholder="Gemeinsames Passwort des Teams"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm" />
              <p className="text-[10px] text-slate-400 mt-1">Wird vom Admin im Worker als <code>TEAM_KEY</code> gesetzt.</p>
            </div>
            <button onClick={handleConnect} disabled={syncing}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors">
              {syncing ? <><div className="animate-spin"><Icons.Loader className="w-4 h-4" /></div> Verbinde…</> : <>Verbinden</>}
            </button>
          </div>
        </div>
        {toast && <Toast message={toast.msg} kind={toast.kind} onClose={() => setToast(null)} />}
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Cockpit", icon: Icons.Home },
    { id: "newDraft", label: "Neu", icon: Icons.Plus },
    { id: "settings", label: "Einstellungen", icon: Icons.Settings },
  ];

  const activeChannels = channels.filter(c => c.active);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {(view === "editDraft" || view === "dispatch" || view === "newDraft") && (
              <button onClick={() => setView("dashboard")} className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100"><Icons.ChevLeft className="w-5 h-5" /></button>
            )}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><Icons.Send className="w-4 h-4 text-white" /></div>
            <span className="font-bold text-base tracking-tight hidden sm:block">MultiChannelCockpit</span>
            <span className="font-bold text-base tracking-tight sm:hidden">MCC</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => refreshState()} title="Aktualisieren" className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
              <div className={syncing ? "animate-spin" : ""}><Icons.Refresh className="w-4 h-4" /></div>
            </button>
            <select value={currentUserId} onChange={e => { setCurrentUserId(e.target.value); localStorage.setItem(USER_KEY, e.target.value); }}
              className="text-xs bg-slate-100 border-0 rounded-lg px-2.5 py-1.5 font-medium text-slate-600 cursor-pointer focus:ring-2 focus:ring-indigo-200">
              {users.map(u => <option key={u.id} value={u.id}>{u.name} ({ROLES.find(r => r.value === u.role)?.label})</option>)}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-24 pt-4">
        {/* ═══ DASHBOARD ═══ */}
        {view === "dashboard" && (
          <div className="animate-fade-in space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { label: "Gesamt", value: kpi.total, color: "from-slate-500 to-slate-700" },
                { label: "Entwürfe", value: kpi.draft, color: "from-amber-400 to-amber-600" },
                { label: "Freigabe", value: kpi.review, color: "from-blue-400 to-blue-600" },
                { label: "Änderung", value: kpi.changes, color: "from-rose-400 to-rose-600" },
                { label: "Bereit", value: kpi.ready, color: "from-emerald-400 to-emerald-600" },
              ].map(k => (
                <div key={k.label} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                  <p className="text-xs font-medium text-slate-500 mb-1">{k.label}</p>
                  <p className={`text-2xl font-bold bg-gradient-to-r ${k.color} bg-clip-text text-transparent`}>{k.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
                {[
                  { id: "overview", label: "Übersicht", icon: Icons.List },
                  { id: "week", label: "Woche", icon: Icons.Calendar },
                  { id: "checklist", label: "Checkliste", icon: Icons.Check },
                ].map(t => (
                  <button key={t.id} onClick={() => setDashTab(t.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${dashTab === t.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                    <t.icon className="w-4 h-4" />{t.label}
                  </button>
                ))}
              </div>
              {lastSync && <span className="text-[10px] text-slate-400">Aktualisiert: {formatTime(lastSync)}</span>}
            </div>

            {/* Overview */}
            {dashTab === "overview" && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <Icons.Filter className="w-4 h-4 text-slate-400" />
                  <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium">
                    <option value="all">Alle Sparten</option>
                    {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                  <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium">
                    <option value="all">Alle Status</option>
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>

                {filteredDrafts.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <Icons.Edit className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="font-medium">Noch keine Entwürfe</p>
                    <button onClick={() => openNew()} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700">
                      <Icons.Plus className="w-4 h-4" /> Neuer Entwurf
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredDrafts.map(draft => {
                      const dept = departments.find(d => d.name === draft.department);
                      return (
                        <div key={draft.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <StatusBadge status={draft.status} small />
                                {dept && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: dept.color + "20", color: dept.color }}>{dept.name}</span>}
                                {draft.imageUrl && <Icons.Image className="w-3 h-3 text-slate-400" />}
                                {draft.deadline && <span className="text-[10px] text-slate-400 font-medium">⏰ {formatDate(draft.deadline)}</span>}
                              </div>
                              <h4 className="font-semibold text-sm text-slate-900 line-clamp-2">{draft.occasion || "Ohne Titel"}</h4>
                              {draft.coreMessage && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{draft.coreMessage}</p>}
                              {draft.status === "changes" && draft.lastComment && (
                                <p className="text-xs text-rose-600 mt-1.5 bg-rose-50 rounded-lg px-2 py-1">✏️ {draft.lastComment}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {draft.status === "draft" && canApprove(currentUser.role) && (
                                <button onClick={() => setStatus(draft.id, "review")} title="Zur Freigabe" className="p-2 rounded-lg hover:bg-blue-50 text-blue-500"><Icons.Check className="w-4 h-4" /></button>
                              )}
                              {(draft.status === "review" || draft.status === "changes") && canApprove(currentUser.role) && (
                                <>
                                  <button onClick={() => setStatus(draft.id, "ready")} title="Freigeben" className="p-2 rounded-lg hover:bg-emerald-50 text-emerald-500"><Icons.Check className="w-4 h-4" /></button>
                                  <button onClick={() => { setCommentModal({ draftId: draft.id }); setCommentText(""); }} title="Änderung anfordern" className="p-2 rounded-lg hover:bg-rose-50 text-rose-500"><Icons.Message className="w-4 h-4" /></button>
                                </>
                              )}
                              {draft.status === "ready" && canSend(currentUser.role) && (
                                <button onClick={() => openDispatch(draft)} title="Versandzentrale" className="p-2 rounded-lg hover:bg-violet-50 text-violet-500"><Icons.Send className="w-4 h-4" /></button>
                              )}
                              <button onClick={() => openEdit(draft)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><Icons.Edit className="w-4 h-4" /></button>
                            </div>
                          </div>
                          {draft.channels?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2.5">
                              {draft.channels.map(ch => {
                                const cid = channels.find(c => c.name === ch)?.id;
                                const isSent = draft.sentChannels?.includes(cid);
                                return <span key={ch} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${isSent ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{isSent ? "✓ " : ""}{ch}</span>;
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Week */}
            {dashTab === "week" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <button onClick={() => setWeekOffset(w => w - 1)} className="p-2 rounded-lg hover:bg-slate-200"><Icons.ChevLeft className="w-4 h-4" /></button>
                  <span className="text-sm font-semibold">
                    {formatDate(getWeekDates(weekOffset)[0])} – {formatDate(getWeekDates(weekOffset)[6])}
                  </span>
                  <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 rounded-lg hover:bg-slate-200"><Icons.ChevRight className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {getWeekDates(weekOffset).map((date, i) => {
                    const dayDrafts = drafts.filter(d => d.deadline === date);
                    const isToday = date === today();
                    return (
                      <div key={date} className={`rounded-xl p-2 min-h-[100px] border ${isToday ? "bg-indigo-50 border-indigo-300" : "bg-white border-slate-200"}`}>
                        <p className={`text-[10px] font-bold mb-1 ${isToday ? "text-indigo-600" : "text-slate-400"}`}>{WEEKDAYS[i]} <span className="font-normal">{new Date(date).getDate()}.{new Date(date).getMonth() + 1}.</span></p>
                        {dayDrafts.map(d => (
                          <button key={d.id} onClick={() => openEdit(d)} className="block w-full text-left mb-1 p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100">
                            <StatusBadge status={d.status} small />
                            <p className="text-[10px] font-medium mt-0.5 line-clamp-2 text-slate-700">{d.occasion}</p>
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Checklist */}
            {dashTab === "checklist" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">Wochenroutine – Status deiner Kommunikation</p>
                {[
                  { phase: "📝 Planung (Mo–Di)", items: drafts.filter(d => d.status === "draft" || d.status === "changes"), desc: "Entwürfe erstellen und überarbeiten" },
                  { phase: "✅ Freigabe (Mi–Do)", items: drafts.filter(d => d.status === "review"), desc: "Inhalte prüfen und freigeben" },
                  { phase: "🚀 Versand (Fr–Sa)", items: drafts.filter(d => d.status === "ready"), desc: "Freigegebene Inhalte versenden" },
                ].map(phase => (
                  <div key={phase.phase} className="bg-white rounded-xl border border-slate-200 p-4">
                    <h4 className="font-bold text-sm mb-0.5">{phase.phase}</h4>
                    <p className="text-xs text-slate-400 mb-3">{phase.desc}</p>
                    {phase.items.length === 0 ? <p className="text-xs text-slate-300 italic">Keine Einträge</p> : (
                      <div className="space-y-2">
                        {phase.items.map(d => (
                          <div key={d.id} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-slate-700 truncate">{d.occasion}</p>
                              <p className="text-[10px] text-slate-400">{d.department} · {formatDate(d.deadline)}</p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg hover:bg-white text-slate-400"><Icons.Edit className="w-3.5 h-3.5" /></button>
                              {d.status === "ready" && <button onClick={() => openDispatch(d)} className="p-1.5 rounded-lg hover:bg-violet-50 text-violet-500"><Icons.Send className="w-3.5 h-3.5" /></button>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══ NEW / EDIT DRAFT ═══ */}
        {(view === "newDraft" || view === "editDraft") && (
          <div className="animate-fade-in max-w-2xl mx-auto space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{view === "newDraft" ? "Neuer Entwurf" : "Entwurf bearbeiten"}</h2>
              {view === "editDraft" && selectedDraft && (
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedDraft.status} />
                  <button onClick={() => { if (confirm("Entwurf wirklich löschen?")) deleteDraft(selectedDraft.id); }} className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>
                </div>
              )}
            </div>

            {/* Template quick start (only new) */}
            {view === "newDraft" && templates.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Aus Vorlage starten</p>
                <div className="flex flex-wrap gap-2">
                  {templates.map(t => (
                    <button key={t.id} onClick={() => openNew(t)} className="text-xs px-3 py-1.5 rounded-full font-medium border border-slate-200 bg-white hover:border-indigo-300 hover:text-indigo-600">
                      <Icons.FileText className="w-3 h-3 inline mr-1" />{t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Base data */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Basisdaten</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Anlass / Thema *</label>
                <input type="text" value={draftForm.occasion} onChange={e => setDraftForm(f => ({ ...f, occasion: e.target.value }))} placeholder="z.B. Saisonstart Handball, Mitgliederversammlung..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Sparte / Abteilung</label>
                  <select value={draftForm.department} onChange={e => setDraftForm(f => ({ ...f, department: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm">
                    <option value="">Auswählen…</option>
                    {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Zielgruppe</label>
                  <select value={draftForm.targetAudience} onChange={e => setDraftForm(f => ({ ...f, targetAudience: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm">
                    <option value="">Auswählen…</option>
                    {audiences.map(a => <option key={a} value={a}>{a}</option>)}
                    {draftForm.targetAudience && !audiences.includes(draftForm.targetAudience) && <option value={draftForm.targetAudience}>{draftForm.targetAudience}</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Kommunikationsziel</label>
                  <select value={draftForm.goal} onChange={e => setDraftForm(f => ({ ...f, goal: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm">
                    <option value="">Auswählen…</option>
                    {goals.map(g => <option key={g} value={g}>{g}</option>)}
                    {draftForm.goal && !goals.includes(draftForm.goal) && <option value={draftForm.goal}>{draftForm.goal}</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Deadline</label>
                  <input type="date" value={draftForm.deadline} onChange={e => setDraftForm(f => ({ ...f, deadline: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tonalität</label>
                <div className="flex flex-wrap gap-2">
                  {TONALITIES.map(t => (
                    <button key={t} onClick={() => setDraftForm(f => ({ ...f, tonality: t }))} className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${draftForm.tonality === t ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kanäle</label>
                <div className="flex flex-wrap gap-2">
                  {activeChannels.map(c => {
                    const sel = draftForm.channels.includes(c.name);
                    return <button key={c.id} onClick={() => setDraftForm(f => ({ ...f, channels: sel ? f.channels.filter(x => x !== c.name) : [...f.channels, c.name] }))} className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${sel ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300"}`}>{c.name}</button>;
                  })}
                </div>
              </div>
              {/* Image */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Bild (optional)</label>
                {draftForm.imageUrl ? (
                  <div className="relative inline-block">
                    <img src={draftForm.imageUrl} alt="Vorschau" className="max-h-40 rounded-lg border border-slate-200" />
                    <button onClick={() => setDraftForm(f => ({ ...f, imageUrl: "" }))} className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow"><Icons.X className="w-3.5 h-3.5" /></button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 items-center">
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploadLoading} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 text-sm font-medium hover:border-indigo-300 disabled:opacity-50">
                      {uploadLoading ? <div className="animate-spin"><Icons.Loader className="w-4 h-4" /></div> : <Icons.Image className="w-4 h-4" />} Bild hochladen
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <span className="text-xs text-slate-400">oder URL:</span>
                    <input type="url" placeholder="https://..." onBlur={e => e.target.value && setDraftForm(f => ({ ...f, imageUrl: e.target.value }))} className="flex-1 min-w-[140px] px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                  </div>
                )}
              </div>
            </div>

            {/* AI button */}
            <button onClick={handleGenerate} disabled={aiLoading || !draftForm.occasion.trim()} className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold text-sm hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200">
              {aiLoading ? <><div className="animate-spin"><Icons.Loader className="w-4 h-4" /></div> KI erstellt kanalgerechte Texte…</> : <><Icons.Sparkle className="w-4 h-4" /> Mit KI generieren</>}
            </button>

            {/* Generated content */}
            {(draftForm.coreMessage || Object.keys(draftForm.channelTexts).length > 0) && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Generierte Texte</h3>
                <div>
                  <div className="flex items-center justify-between mb-1"><label className="text-xs font-semibold text-slate-600">Kernbotschaft</label><button onClick={() => copyText(draftForm.coreMessage)} className="p-1 text-slate-300 hover:text-slate-500"><Icons.Copy className="w-3.5 h-3.5" /></button></div>
                  <textarea rows={2} value={draftForm.coreMessage} onChange={e => setDraftForm(f => ({ ...f, coreMessage: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm resize-none" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1"><label className="text-xs font-semibold text-slate-600">Betreffzeile</label><button onClick={() => copyText(draftForm.subject)} className="p-1 text-slate-300 hover:text-slate-500"><Icons.Copy className="w-3.5 h-3.5" /></button></div>
                  <input type="text" value={draftForm.subject} onChange={e => setDraftForm(f => ({ ...f, subject: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm" />
                </div>
                {/* Per-channel texts */}
                {draftForm.channels.map(chName => (
                  <div key={chName}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-500" />{chName}</label>
                      <button onClick={() => copyText(draftForm.channelTexts[chName])} className="p-1 text-slate-300 hover:text-slate-500"><Icons.Copy className="w-3.5 h-3.5" /></button>
                    </div>
                    <textarea rows={chName === "Website" || chName === "Newsletter" || chName === "Presse" ? 6 : 3} value={draftForm.channelTexts[chName] || ""} onChange={e => setDraftForm(f => ({ ...f, channelTexts: { ...f.channelTexts, [chName]: e.target.value } }))} placeholder={`Text für ${chName}…`} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm resize-none" />
                  </div>
                ))}
                {draftForm.checklist.length > 0 && (
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-2">Freigabe-Checkliste</label>
                    <div className="space-y-1.5">
                      {draftForm.checklist.map((item, i) => (
                        <label key={i} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                          <input type="checkbox" checked={item.checked} onChange={() => { const cl = [...draftForm.checklist]; cl[i] = { ...cl[i], checked: !cl[i].checked }; setDraftForm(f => ({ ...f, checklist: cl })); }} className="w-4 h-4 rounded border-slate-300 text-indigo-600" />
                          <span className={`text-sm ${item.checked ? "line-through text-slate-400" : "text-slate-700"}`}>{item.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Activity history */}
            {view === "editDraft" && activity.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-3">Verlauf</h3>
                <div className="space-y-2">
                  {activity.map(a => (
                    <div key={a.id} className="flex items-start gap-2 text-xs">
                      <span className="text-slate-400 shrink-0 w-24">{formatTime(a.createdAt)}</span>
                      <span className="font-medium text-slate-600">{a.userName || "—"}</span>
                      <span className="text-slate-500">{actionLabel(a.action)}{a.note ? `: „${a.note}"` : ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save / status buttons */}
            <div className="flex flex-wrap gap-2">
              <button onClick={() => saveDraft(draftForm, selectedDraftId)} className="flex-1 sm:flex-none px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800">💾 Speichern</button>
              {view === "editDraft" && selectedDraft && (
                <>
                  {(selectedDraft.status === "draft" || selectedDraft.status === "changes") && canApprove(currentUser.role) && (
                    <button onClick={async () => { await saveDraft(draftForm, selectedDraftId); setStatus(selectedDraftId, "review"); }} className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700">Zur Freigabe</button>
                  )}
                  {(selectedDraft.status === "review" || selectedDraft.status === "changes") && canApprove(currentUser.role) && (
                    <button onClick={async () => { await saveDraft(draftForm, selectedDraftId); setStatus(selectedDraftId, "ready"); }} className="px-5 py-3 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700">✅ Freigeben</button>
                  )}
                  {selectedDraft.status === "ready" && canSend(currentUser.role) && (
                    <button onClick={async () => { await saveDraft(draftForm, selectedDraftId); openDispatch(selectedDraft); }} className="px-5 py-3 bg-violet-600 text-white rounded-xl font-semibold text-sm hover:bg-violet-700">🚀 Versandzentrale</button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ═══ DISPATCH ═══ */}
        {view === "dispatch" && selectedDraft && (
          <div className="animate-fade-in max-w-2xl mx-auto space-y-5">
            <div><h2 className="text-lg font-bold">Versandzentrale</h2><p className="text-sm text-slate-500 mt-0.5">{selectedDraft.occasion}</p></div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Vorschau</h3>
              {selectedDraft.imageUrl && <img src={selectedDraft.imageUrl} alt="" className="max-h-44 rounded-lg border border-slate-200" />}
              {selectedDraft.subject && <div><p className="text-[10px] font-semibold text-slate-400 mb-0.5">BETREFF</p><p className="text-sm font-medium">{selectedDraft.subject}</p></div>}
              <div><p className="text-[10px] font-semibold text-slate-400 mb-0.5">KERNBOTSCHAFT</p><p className="text-sm text-slate-700">{selectedDraft.coreMessage || "–"}</p></div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-800"><strong>Hinweis:</strong> „Öffnen" startet nur die jeweilige App mit dem Text. Erst nach dem tatsächlichen Absenden „Gesendet bestätigen" drücken.</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Kanäle</h3>
              {channels.filter(c => c.active && (selectedDraft.channels || []).includes(c.name)).map(channel => {
                const isSent = selectedDraft.sentChannels?.includes(channel.id);
                const method = SEND_METHODS.find(m => m.value === channel.sendMethod);
                const MethodIcon = Icons[method?.icon || "Share"];
                return (
                  <div key={channel.id} className={`bg-white rounded-xl border p-4 transition-all ${isSent ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200"}`}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isSent ? "bg-emerald-100" : "bg-slate-100"}`}><MethodIcon className={`w-4 h-4 ${isSent ? "text-emerald-600" : "text-slate-500"}`} /></div>
                        <div className="min-w-0"><p className="text-sm font-semibold">{channel.name}</p><p className="text-[10px] text-slate-400 truncate">{method?.label}{channel.target ? ` · ${channel.target}` : " · Manuell"}</p></div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => copyText(channelText(selectedDraft, channel.name))} title="Text kopieren" className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><Icons.Copy className="w-4 h-4" /></button>
                        <button onClick={() => handleChannelAction(channel, selectedDraft)} className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700">Öffnen</button>
                        {isSent ? (
                          <span className="text-[10px] font-bold text-emerald-600 px-2">✓ Gesendet</span>
                        ) : (
                          <button onClick={() => confirmChannelSent(selectedDraft.id, channel.id, channel.name)} className="px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Gesendet bestätigen</button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 bg-slate-50 rounded-lg p-2 line-clamp-3 whitespace-pre-line">{channelText(selectedDraft, channel.name)}</p>
                  </div>
                );
              })}
            </div>

            {selectedDraft.status !== "sent" && (
              <button onClick={() => setStatus(selectedDraft.id, "sent")} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700">✅ Alle Kanäle erledigt – als versendet markieren</button>
            )}
          </div>
        )}

        {/* ═══ SETTINGS ═══ */}
        {view === "settings" && (
          <div className="animate-fade-in max-w-2xl mx-auto space-y-5">
            <h2 className="text-lg font-bold">Einstellungen</h2>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
              {[
                { id: "club", label: "Verein" },
                { id: "channels", label: "Kanäle" },
                { id: "departments", label: "Sparten" },
                { id: "lists", label: "Listen" },
                { id: "templates", label: "Vorlagen" },
                { id: "users", label: "Benutzer" },
                { id: "whatsapp", label: "WhatsApp" },
                { id: "data", label: "Daten" },
              ].map(t => (
                <button key={t.id} onClick={() => setSettingsTab(t.id)} className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${settingsTab === t.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{t.label}</button>
              ))}
            </div>

            {/* Club profile */}
            {settingsTab === "club" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <p className="text-xs text-slate-500">Diese Angaben fließen in jede KI-Generierung ein und sorgen für einheitliche, treffsichere Texte.</p>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Vereinsname</label><input type="text" value={clubSettings.clubName} onChange={e => setClubSettings(s => ({ ...s, clubName: e.target.value }))} placeholder="z.B. TSV Musterstadt 1900" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Standard-Hashtags (Instagram)</label><input type="text" value={clubSettings.hashtags} onChange={e => setClubSettings(s => ({ ...s, hashtags: e.target.value }))} placeholder="#tsvmusterstadt #gemeinsamstark" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Grußformel / Signatur</label><input type="text" value={clubSettings.signature} onChange={e => setClubSettings(s => ({ ...s, signature: e.target.value }))} placeholder="Sportliche Grüße, euer TSV-Team" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm" /></div>
                <div><label className="block text-xs font-semibold text-slate-600 mb-1">Tonalität / Stil-Beispiele</label><textarea rows={3} value={clubSettings.toneExamples} onChange={e => setClubSettings(s => ({ ...s, toneExamples: e.target.value }))} placeholder="Wie spricht der Verein? Beispielsätze, Duzen/Siezen, typische Formulierungen…" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 outline-none text-sm resize-none" /></div>
                <button onClick={() => saveClubSettings(clubSettings)} disabled={!canConfig(currentUser.role)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">💾 Speichern</button>
                {!canConfig(currentUser.role) && <p className="text-[10px] text-slate-400">Nur Administratoren können das Vereinsprofil ändern.</p>}
              </div>
            )}

            {/* Channels */}
            {settingsTab === "channels" && (
              <div className="space-y-3">
                {channels.map((ch, idx) => (
                  <div key={ch.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={ch.active} onChange={() => { if (!canConfig(currentUser.role)) return notify("Nur Admins", "error"); const u = [...channels]; u[idx] = { ...u[idx], active: !u[idx].active }; saveChannels(u); }} className="sr-only peer" />
                          <div className="w-9 h-5 bg-slate-200 peer-checked:bg-indigo-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                        <input type="text" value={ch.name} onChange={e => { if (!canConfig(currentUser.role)) return; const u = [...channels]; u[idx] = { ...u[idx], name: e.target.value }; setChannels(u); }} onBlur={() => canConfig(currentUser.role) && saveChannels(channels)} className="font-semibold text-sm bg-transparent border-0 focus:ring-0 p-0" />
                      </div>
                      {ch.isCustom && <button onClick={() => { if (!canConfig(currentUser.role)) return notify("Nur Admins", "error"); saveChannels(channels.filter((_, i) => i !== idx)); }} className="p-1.5 text-red-400 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><label className="text-[10px] font-semibold text-slate-400 block mb-1">VERSANDART</label>
                        <select value={ch.sendMethod} onChange={e => { if (!canConfig(currentUser.role)) return; const u = [...channels]; u[idx] = { ...u[idx], sendMethod: e.target.value }; saveChannels(u); }} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">{SEND_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}</select>
                      </div>
                      <div><label className="text-[10px] font-semibold text-slate-400 block mb-1">ZIEL</label>
                        <input type="text" value={ch.target} onChange={e => { if (!canConfig(currentUser.role)) return; const u = [...channels]; u[idx] = { ...u[idx], target: e.target.value }; setChannels(u); }} onBlur={() => canConfig(currentUser.role) && saveChannels(channels)} placeholder={ch.sendMethod === "whatsapp" ? "+49..." : ch.sendMethod === "email" ? "verteiler@verein.de" : ch.sendMethod === "web" ? "https://cms..." : "Hinweis"} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => { if (!canConfig(currentUser.role)) return notify("Nur Admins", "error"); saveChannels([...channels, { id: genId(), name: "Neuer Kanal", active: true, sendMethod: "share", target: "", isCustom: true }]); }} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:border-slate-400">+ Kanal hinzufügen</button>
              </div>
            )}

            {/* Departments */}
            {settingsTab === "departments" && (
              <div className="space-y-3">
                {departments.map((dept, idx) => (
                  <div key={dept.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
                    <input type="color" value={dept.color} onChange={e => { if (!canConfig(currentUser.role)) return; const u = [...departments]; u[idx] = { ...u[idx], color: e.target.value }; saveDepartments(u); }} className="w-8 h-8 rounded-lg border-0 cursor-pointer" />
                    <input type="text" value={dept.name} onChange={e => { if (!canConfig(currentUser.role)) return; const u = [...departments]; u[idx] = { ...u[idx], name: e.target.value }; setDepartments(u); }} onBlur={() => canConfig(currentUser.role) && saveDepartments(departments)} className="flex-1 font-semibold text-sm bg-transparent border-0 focus:ring-0 p-0" />
                    <button onClick={() => { if (!canConfig(currentUser.role)) return notify("Nur Admins", "error"); saveDepartments(departments.filter((_, i) => i !== idx)); }} className="p-1.5 text-red-400 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => { if (!canConfig(currentUser.role)) return notify("Nur Admins", "error"); saveDepartments([...departments, { id: genId(), name: "Neue Abteilung", color: "#8b5cf6" }]); }} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:border-slate-400">+ Sparte hinzufügen</button>
              </div>
            )}

            {/* Lists (audiences & goals) */}
            {settingsTab === "lists" && (
              <div className="space-y-5">
                <p className="text-xs text-slate-500">Pflegbare Auswahllisten für das Entwurfs-Formular. Diese Einträge erscheinen als Dropdown bei „Zielgruppe" und „Kommunikationsziel".</p>
                <StringListEditor title="Zielgruppen" items={audiences} onSave={saveAudiences} canEdit={canConfig(currentUser.role)} notify={notify} placeholder="z.B. Mitglieder" />
                <StringListEditor title="Kommunikationsziele" items={goals} onSave={saveGoals} canEdit={canConfig(currentUser.role)} notify={notify} placeholder="z.B. Einladen" />
                {!canConfig(currentUser.role) && <p className="text-[10px] text-slate-400">Nur Administratoren können die Listen ändern.</p>}
              </div>
            )}

            {/* Templates */}
            {settingsTab === "templates" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Vorlagen für wiederkehrende Anlässe (z.B. Spielbericht, Saisonstart). Sie belegen Sparte, Tonalität, Zielgruppe, Ziel und Kanäle vor.</p>
                {templates.map((tpl, idx) => (
                  <div key={tpl.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <input type="text" value={tpl.name} onChange={e => { const u = [...templates]; u[idx] = { ...u[idx], name: e.target.value }; setTemplates(u); }} onBlur={() => canConfig(currentUser.role) && saveTemplates(templates)} placeholder="Vorlagen-Name" className="flex-1 font-semibold text-sm bg-transparent border-0 focus:ring-0 p-0" />
                      <button onClick={() => { if (!canConfig(currentUser.role)) return notify("Nur Admins", "error"); saveTemplates(templates.filter((_, i) => i !== idx)); }} className="p-1.5 text-red-400 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select value={tpl.department || ""} onChange={e => { const u = [...templates]; u[idx] = { ...u[idx], department: e.target.value }; saveTemplates(u); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm"><option value="">Sparte…</option>{departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}</select>
                      <select value={tpl.tonality || TONALITIES[0]} onChange={e => { const u = [...templates]; u[idx] = { ...u[idx], tonality: e.target.value }; saveTemplates(u); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm">{TONALITIES.map(t => <option key={t} value={t}>{t}</option>)}</select>
                      <select value={tpl.targetAudience || ""} onChange={e => { const u = [...templates]; u[idx] = { ...u[idx], targetAudience: e.target.value }; saveTemplates(u); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm"><option value="">Zielgruppe…</option>{audiences.map(a => <option key={a} value={a}>{a}</option>)}</select>
                      <select value={tpl.goal || ""} onChange={e => { const u = [...templates]; u[idx] = { ...u[idx], goal: e.target.value }; saveTemplates(u); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm"><option value="">Ziel…</option>{goals.map(g => <option key={g} value={g}>{g}</option>)}</select>
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">KANÄLE</label>
                      <div className="flex flex-wrap gap-1.5">
                        {activeChannels.map(c => { const sel = (tpl.channels || []).includes(c.name); return <button key={c.id} onClick={() => { const u = [...templates]; const chs = sel ? (tpl.channels || []).filter(x => x !== c.name) : [...(tpl.channels || []), c.name]; u[idx] = { ...u[idx], channels: chs }; saveTemplates(u); }} className={`text-[10px] px-2 py-1 rounded-full font-medium border ${sel ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-500 border-slate-200"}`}>{c.name}</button>; })}
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => { if (!canConfig(currentUser.role)) return notify("Nur Admins", "error"); saveTemplates([...templates, { id: genId(), name: "Neue Vorlage", department: "", tonality: TONALITIES[0], channels: [] }]); }} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:border-slate-400">+ Vorlage hinzufügen</button>
              </div>
            )}

            {/* Users */}
            {settingsTab === "users" && (
              <div className="space-y-3">
                {users.map((user, idx) => (
                  <div key={user.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">{user.name.charAt(0)}</div>
                      <input type="text" value={user.name} onChange={e => { if (!canConfig(currentUser.role)) return; const u = [...users]; u[idx] = { ...u[idx], name: e.target.value }; setUsers(u); }} onBlur={() => canConfig(currentUser.role) && saveUsers(users)} className="flex-1 font-semibold text-sm bg-transparent border-0 focus:ring-0 p-0" />
                      {users.length > 1 && <button onClick={() => { if (!canConfig(currentUser.role)) return notify("Nur Admins", "error"); if (user.id === currentUserId) return notify("Aktiven Benutzer nicht löschen", "error"); saveUsers(users.filter((_, i) => i !== idx)); }} className="p-1.5 text-red-400 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>}
                    </div>
                    <select value={user.role} onChange={e => { if (!canConfig(currentUser.role)) return; const u = [...users]; u[idx] = { ...u[idx], role: e.target.value }; saveUsers(u); }} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">{ROLES.map(r => <option key={r.value} value={r.value}>{r.label} – {r.desc}</option>)}</select>
                  </div>
                ))}
                <button onClick={() => { if (!canConfig(currentUser.role)) return notify("Nur Admins", "error"); saveUsers([...users, { id: genId(), name: "Neuer Benutzer", role: "author" }]); }} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:border-slate-400">+ Benutzer hinzufügen</button>
              </div>
            )}

            {/* WhatsApp */}
            {settingsTab === "whatsapp" && (() => {
              const waIdx = channels.findIndex(c => c.id === "wa" || c.name === "WhatsApp");
              const wa = channels[waIdx];
              return (
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center"><Icons.Phone className="w-5 h-5 text-white" /></div><div><h3 className="font-bold text-sm">WhatsApp-Konfiguration</h3><p className="text-xs text-slate-400">Einstellungen für den WhatsApp-Versand</p></div></div>
                  {!wa ? <p className="text-sm text-slate-400">Kein WhatsApp-Kanal gefunden</p> : (
                    <>
                      <div><label className="text-xs font-semibold text-slate-600 block mb-1">Telefonnummer (Einzelkontakt)</label>
                        <input type="tel" value={wa.target} onChange={e => { if (!canConfig(currentUser.role)) return; const u = [...channels]; u[waIdx] = { ...u[waIdx], target: e.target.value }; setChannels(u); }} onBlur={() => canConfig(currentUser.role) && saveChannels(channels)} placeholder="+4917612345678 (leer = manuelle Auswahl)" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-200 outline-none text-sm" />
                        <p className="text-[10px] text-slate-400 mt-1">Leer lassen, um beim Versand WhatsApp zu öffnen und manuell einen Chat/Gruppe zu wählen.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200"><p className="text-xs text-amber-800"><strong>Hinweis:</strong> WhatsApp-Gruppen können nicht als feste Adresse hinterlegt werden. Gruppen werden manuell in WhatsApp ausgewählt.</p></div>
                      <button onClick={() => window.open(wa.target ? `https://wa.me/${wa.target.replace(/[^0-9]/g, "")}?text=Test%20vom%20MultiChannelCockpit` : `https://wa.me/?text=Test%20vom%20MultiChannelCockpit`, "_blank")} className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700"><Icons.ExternalLink className="w-4 h-4" /> WhatsApp-Test öffnen</button>
                    </>
                  )}
                </div>
              );
            })()}

            {/* Data */}
            {settingsTab === "data" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                  <h3 className="font-bold text-sm">Backend-Verbindung</h3>
                  <p className="text-xs text-slate-500 break-all">URL: {getConn().workerUrl}</p>
                  <button onClick={() => { localStorage.removeItem(CONN_KEY); setConnected(false); }} className="text-sm font-semibold text-rose-600 hover:text-rose-700">Verbindung trennen</button>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                  <h3 className="font-bold text-sm">Daten-Export</h3>
                  <p className="text-xs text-slate-500">Sichere alle Entwürfe und Einstellungen als JSON-Datei.</p>
                  <button onClick={exportData} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800"><Icons.Download className="w-4 h-4" /> Export herunterladen</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex justify-around">
          {navItems.map(item => {
            const isActive = view === item.id || (item.id === "dashboard" && (view === "editDraft" || view === "dispatch"));
            return (
              <button key={item.id} onClick={() => { if (item.id === "newDraft") openNew(); else setView(item.id); }} className={`flex flex-col items-center gap-0.5 py-2.5 px-4 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}>
                {item.id === "newDraft" ? <div className="w-10 h-10 -mt-5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200"><Icons.Plus className="w-5 h-5 text-white" /></div> : <item.icon className="w-5 h-5" />}
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Comment modal (request changes) */}
      <Modal open={!!commentModal} onClose={() => setCommentModal(null)} title="Änderung anfordern">
        <p className="text-sm text-slate-500 mb-3">Beschreibe, was geändert werden soll. Der Entwurf wird auf „Änderung" gesetzt.</p>
        <textarea rows={4} value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="z.B. Bitte das Datum korrigieren und einen Aufruf zur Anmeldung ergänzen." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-200 outline-none text-sm resize-none" />
        <div className="flex gap-2 mt-4">
          <button onClick={async () => { if (!commentText.trim()) return notify("Bitte Kommentar eingeben", "error"); await setStatus(commentModal.draftId, "changes", commentText.trim()); setCommentModal(null); }} className="flex-1 py-2.5 bg-rose-600 text-white rounded-xl font-semibold text-sm hover:bg-rose-700">Anfordern</button>
          <button onClick={() => setCommentModal(null)} className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold text-sm">Abbrechen</button>
        </div>
      </Modal>

      {toast && <Toast message={toast.msg} kind={toast.kind} onClose={() => setToast(null)} />}
    </div>
  );
}

// Activity label helper
function actionLabel(action) {
  if (!action) return "";
  if (action.startsWith("status:")) {
    const s = action.split(":")[1];
    return `Status → ${STATUS_CONFIG[s]?.label || s}`;
  }
  if (action.startsWith("sent:")) return `Gesendet via ${action.split(":")[1]}`;
  return action;
}

import { useState, useEffect, useCallback } from "react";

// ─── Icons (inline SVG components) ───
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
  Users: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Loader: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>,
  ExternalLink: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  Filter: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Phone: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Globe: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Share: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  Key: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
};

// ─── Constants ───
const STATUS_CONFIG = {
  draft: { label: "Entwurf", color: "bg-amber-100 text-amber-800 border-amber-300", dot: "bg-amber-500" },
  review: { label: "Freigabe", color: "bg-blue-100 text-blue-800 border-blue-300", dot: "bg-blue-500" },
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

const DEFAULT_CHANNELS = [
  { id: "wa", name: "WhatsApp", active: true, sendMethod: "whatsapp", target: "", isCustom: false },
  { id: "ig", name: "Instagram", active: true, sendMethod: "share", target: "", isCustom: false },
  { id: "nl", name: "Newsletter", active: true, sendMethod: "email", target: "", isCustom: false },
  { id: "web", name: "Website", active: true, sendMethod: "web", target: "", isCustom: false },
  { id: "press", name: "Presse", active: true, sendMethod: "email", target: "", isCustom: false },
  { id: "board", name: "Aushang", active: false, sendMethod: "share", target: "", isCustom: false },
];

const DEFAULT_DEPARTMENTS = [
  { id: "ges", name: "Gesamtverein", color: "#6366f1" },
  { id: "hb", name: "Handball", color: "#f59e0b" },
  { id: "tu", name: "Turnen", color: "#10b981" },
  { id: "fb", name: "Fußball", color: "#3b82f6" },
];

const DEFAULT_USERS = [
  { id: "u1", name: "Kommunikationsleitung", role: "admin" },
  { id: "u2", name: "Redakteur", role: "editor" },
];

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

// ─── Helpers ───
const genId = () => Math.random().toString(36).slice(2, 10);
const today = () => new Date().toISOString().slice(0, 10);
const formatDate = (d) => {
  if (!d) return "–";
  const dt = new Date(d);
  return dt.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
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

// ─── Storage helpers (localStorage) ───
const STORAGE_KEY = "mcc-data";
const API_KEY_STORAGE = "mcc-apikey";
const WORKER_URL_STORAGE = "mcc-worker-url";

const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};
const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) { console.error("Save error:", e); }
};

// ─── AI Generation ───
const generateWithAI = async (params) => {
  const apiKey = localStorage.getItem(API_KEY_STORAGE) || "";
  const workerUrl = localStorage.getItem(WORKER_URL_STORAGE) || "";

  if (!apiKey && !workerUrl) {
    throw new Error("Bitte zuerst einen API-Key oder Worker-URL in den Einstellungen hinterlegen.");
  }

  const systemPrompt = `Du bist ein Kommunikationsexperte für einen Mehrspartenverein. Du erstellst präzise, kanalgerechte Kommunikationstexte. Antworte IMMER als valides JSON ohne Markdown-Backticks. Antworte auf Deutsch.

Format:
{
  "coreMessage": "Kernbotschaft in 1-2 Sätzen",
  "shortText": "Kurztext für Social Media / WhatsApp (max 280 Zeichen)",
  "longText": "Ausführlicher Text für Website oder Newsletter (3-5 Absätze)",
  "subject": "Betreffzeile für E-Mail/Newsletter",
  "checklist": ["Prüfpunkt 1", "Prüfpunkt 2", "Prüfpunkt 3", "Prüfpunkt 4"]
}`;

  const userPrompt = `Erstelle Kommunikationstexte für folgenden Anlass:
- Anlass/Thema: ${params.occasion}
- Sparte: ${params.department}
- Zielgruppe: ${params.targetAudience}
- Kommunikationsziel: ${params.goal}
- Tonalität: ${params.tonality}
- Kanäle: ${params.channels}

Erstelle die Texte passend zur gewünschten Tonalität und Zielgruppe.`;

  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  };

  // Use Worker URL if configured, otherwise direct API call
  const url = workerUrl || "https://api.anthropic.com/v1/messages";
  const headers = { "Content-Type": "application/json" };

  if (!workerUrl && apiKey) {
    headers["x-api-key"] = apiKey;
    headers["anthropic-version"] = "2023-06-01";
    headers["anthropic-dangerous-direct-browser-access"] = "true";
  }
  if (workerUrl && apiKey) {
    headers["x-api-key"] = apiKey;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API-Fehler (${response.status}): ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  const text = data.content?.map(c => c.text || "").join("") || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};

// ─── Toast Component ───
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-fade-in max-w-sm text-center">
      {message}
    </div>
  );
}

// ─── StatusBadge ───
function StatusBadge({ status, small }) {
  const c = STATUS_CONFIG[status];
  if (!c) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${c.color} ${small ? "text-[10px] px-2 py-0.5" : ""}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App() {
  // ─── State ───
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("dashboard");
  const [settingsTab, setSettingsTab] = useState("channels");
  const [dashTab, setDashTab] = useState("overview");
  const [weekOffset, setWeekOffset] = useState(0);
  const [toast, setToast] = useState(null);
  const [selectedDraftId, setSelectedDraftId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("u1");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // ─── Data ───
  const [drafts, setDrafts] = useState([]);
  const [channels, setChannels] = useState(DEFAULT_CHANNELS);
  const [departments, setDepartments] = useState(DEFAULT_DEPARTMENTS);
  const [users, setUsers] = useState(DEFAULT_USERS);

  // ─── API Config ───
  const [apiKey, setApiKey] = useState("");
  const [workerUrl, setWorkerUrl] = useState("");

  // ─── Draft form ───
  const [draftForm, setDraftForm] = useState({
    occasion: "", department: "", targetAudience: "", goal: "", deadline: "",
    channels: [], tonality: TONALITIES[0],
    coreMessage: "", shortText: "", longText: "", subject: "",
    checklist: [],
  });
  const [aiLoading, setAiLoading] = useState(false);

  const currentUser = users.find(u => u.id === currentUserId) || users[0];
  const selectedDraft = drafts.find(d => d.id === selectedDraftId);

  // ─── Load ───
  useEffect(() => {
    const data = loadData();
    if (data) {
      if (data.drafts) setDrafts(data.drafts);
      if (data.channels) setChannels(data.channels);
      if (data.departments) setDepartments(data.departments);
      if (data.users) setUsers(data.users);
      if (data.currentUserId) setCurrentUserId(data.currentUserId);
    }
    setApiKey(localStorage.getItem(API_KEY_STORAGE) || "");
    setWorkerUrl(localStorage.getItem(WORKER_URL_STORAGE) || "");
    setLoading(false);
  }, []);

  // ─── Save ───
  useEffect(() => {
    if (!loading) {
      saveData({ drafts, channels, departments, users, currentUserId });
    }
  }, [drafts, channels, departments, users, currentUserId, loading]);

  const notify = (msg) => setToast(msg);

  const saveApiConfig = (key, url) => {
    localStorage.setItem(API_KEY_STORAGE, key);
    localStorage.setItem(WORKER_URL_STORAGE, url);
    setApiKey(key);
    setWorkerUrl(url);
    notify("API-Konfiguration gespeichert");
  };

  // ─── Draft Actions ───
  const saveDraft = (formData, existingId) => {
    const now = new Date().toISOString();
    if (existingId) {
      setDrafts(prev => prev.map(d => d.id === existingId ? { ...d, ...formData, updatedAt: now } : d));
      notify("Entwurf aktualisiert");
    } else {
      const newDraft = {
        id: genId(), ...formData, status: "draft",
        createdAt: now, updatedAt: now, createdBy: currentUserId, sentChannels: [],
      };
      setDrafts(prev => [newDraft, ...prev]);
      notify("Entwurf gespeichert");
    }
    setView("dashboard");
  };

  const deleteDraft = (id) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
    if (selectedDraftId === id) setSelectedDraftId(null);
    setView("dashboard");
    notify("Entwurf gelöscht");
  };

  const setStatus = (id, status) => {
    setDrafts(prev => prev.map(d => d.id === id ? { ...d, status, updatedAt: new Date().toISOString() } : d));
    notify(`Status: ${STATUS_CONFIG[status].label}`);
  };

  const markChannelSent = (draftId, channelId) => {
    setDrafts(prev => prev.map(d => {
      if (d.id !== draftId) return d;
      const sc = d.sentChannels.includes(channelId) ? d.sentChannels : [...d.sentChannels, channelId];
      return { ...d, sentChannels: sc, updatedAt: new Date().toISOString() };
    }));
  };

  // ─── Filtered drafts ───
  const filteredDrafts = drafts.filter(d => {
    if (filterDept !== "all" && d.department !== filterDept) return false;
    if (filterStatus !== "all" && d.status !== filterStatus) return false;
    return true;
  });

  // ─── KPI ───
  const kpi = {
    total: drafts.length,
    draft: drafts.filter(d => d.status === "draft").length,
    review: drafts.filter(d => d.status === "review").length,
    ready: drafts.filter(d => d.status === "ready").length,
    sent: drafts.filter(d => d.status === "sent").length,
  };

  // ─── AI Generate ───
  const handleGenerate = async () => {
    if (!draftForm.occasion.trim()) { notify("Bitte Anlass angeben"); return; }
    setAiLoading(true);
    try {
      const result = await generateWithAI({
        occasion: draftForm.occasion,
        department: draftForm.department || "Gesamtverein",
        targetAudience: draftForm.targetAudience || "Vereinsmitglieder",
        goal: draftForm.goal || "Informieren",
        tonality: draftForm.tonality,
        channels: draftForm.channels.join(", ") || "Alle",
      });
      setDraftForm(prev => ({
        ...prev,
        coreMessage: result.coreMessage || "",
        shortText: result.shortText || "",
        longText: result.longText || "",
        subject: result.subject || "",
        checklist: (result.checklist || []).map(item => ({ text: item, checked: false })),
      }));
      notify("KI-Texte erstellt!");
    } catch (err) {
      console.error(err);
      notify(err.message || "Fehler bei KI-Generierung");
    }
    setAiLoading(false);
  };

  const openEdit = (draft) => {
    setSelectedDraftId(draft.id);
    setDraftForm({
      occasion: draft.occasion || "",
      department: draft.department || "",
      targetAudience: draft.targetAudience || "",
      goal: draft.goal || "",
      deadline: draft.deadline || "",
      channels: draft.channels || [],
      tonality: draft.tonality || TONALITIES[0],
      coreMessage: draft.coreMessage || "",
      shortText: draft.shortText || "",
      longText: draft.longText || "",
      subject: draft.subject || "",
      checklist: draft.checklist || [],
    });
    setView("editDraft");
  };

  const openNew = () => {
    setSelectedDraftId(null);
    setDraftForm({
      occasion: "", department: "", targetAudience: "", goal: "", deadline: "",
      channels: [], tonality: TONALITIES[0],
      coreMessage: "", shortText: "", longText: "", subject: "", checklist: [],
    });
    setView("newDraft");
  };

  const openDispatch = (draft) => {
    setSelectedDraftId(draft.id);
    setView("dispatch");
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => notify("Kopiert!")).catch(() => notify("Kopieren fehlgeschlagen"));
  };

  const handleChannelAction = (channel, draft) => {
    const text = draft.shortText || draft.coreMessage || "";
    const longText = draft.longText || text;
    switch (channel.sendMethod) {
      case "whatsapp": {
        const encoded = encodeURIComponent(text);
        const url = channel.target
          ? `https://wa.me/${channel.target.replace(/[^0-9]/g, "")}?text=${encoded}`
          : `https://wa.me/?text=${encoded}`;
        window.open(url, "_blank");
        break;
      }
      case "email": {
        const subj = encodeURIComponent(draft.subject || draft.occasion || "");
        const body = encodeURIComponent(longText);
        const mailto = channel.target
          ? `mailto:${channel.target}?subject=${subj}&body=${body}`
          : `mailto:?subject=${subj}&body=${body}`;
        window.open(mailto, "_blank");
        break;
      }
      case "web": {
        if (channel.target) window.open(channel.target, "_blank");
        else { copyText(longText); notify("Text kopiert – bitte im CMS einfügen"); }
        break;
      }
      case "share": {
        if (navigator.share) {
          navigator.share({ title: draft.subject || draft.occasion, text }).catch(() => {});
        } else {
          copyText(text);
        }
        break;
      }
    }
    markChannelSent(draft.id, channel.id);
  };

  // ═══════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin"><Icons.Loader className="w-8 h-8 text-indigo-500" /></div>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Cockpit", icon: Icons.Home },
    { id: "newDraft", label: "Neu", icon: Icons.Plus },
    { id: "settings", label: "Einstellungen", icon: Icons.Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* ─── Top Header ─── */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {(view === "editDraft" || view === "dispatch") && (
              <button onClick={() => setView("dashboard")} className="p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <Icons.ChevLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Icons.Send className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight hidden sm:block">MultiChannelCockpit</span>
            <span className="font-bold text-base tracking-tight sm:hidden">Cockpit</span>
          </div>
          <div className="flex items-center gap-2">
            <select value={currentUserId} onChange={e => setCurrentUserId(e.target.value)}
              className="text-xs bg-slate-100 border-0 rounded-lg px-2.5 py-1.5 font-medium text-slate-600 cursor-pointer focus:ring-2 focus:ring-indigo-200">
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({ROLES.find(r => r.value === u.role)?.label})</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="max-w-6xl mx-auto px-4 pb-24 pt-4">

        {/* ═══ DASHBOARD ═══ */}
        {view === "dashboard" && (
          <div className="animate-fade-in space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Gesamt", value: kpi.total, color: "from-slate-500 to-slate-700" },
                { label: "Entwürfe", value: kpi.draft, color: "from-amber-400 to-amber-600" },
                { label: "Freigabe", value: kpi.review, color: "from-blue-400 to-blue-600" },
                { label: "Bereit", value: kpi.ready, color: "from-emerald-400 to-emerald-600" },
              ].map(k => (
                <div key={k.label} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                  <p className="text-xs font-medium text-slate-500 mb-1">{k.label}</p>
                  <p className={`text-2xl font-bold bg-gradient-to-r ${k.color} bg-clip-text text-transparent`}>{k.value}</p>
                </div>
              ))}
            </div>

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

            {/* Overview Tab */}
            {dashTab === "overview" && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <Icons.Filter className="w-4 h-4 text-slate-400" />
                  <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
                    className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium focus:ring-2 focus:ring-indigo-200">
                    <option value="all">Alle Sparten</option>
                    {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                  <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                    className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium focus:ring-2 focus:ring-indigo-200">
                    <option value="all">Alle Status</option>
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>

                {filteredDrafts.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <Icons.Edit className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="font-medium">Noch keine Entwürfe</p>
                    <p className="text-sm mt-1">Erstelle deinen ersten Kommunikationsentwurf</p>
                    <button onClick={openNew} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
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
                                {dept && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: dept.color + "20", color: dept.color }}>
                                    {dept.name}
                                  </span>
                                )}
                                {draft.deadline && (
                                  <span className="text-[10px] text-slate-400 font-medium">⏰ {formatDate(draft.deadline)}</span>
                                )}
                              </div>
                              <h4 className="font-semibold text-sm text-slate-900 line-clamp-2">{draft.occasion || "Ohne Titel"}</h4>
                              {draft.coreMessage && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{draft.coreMessage}</p>}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {draft.status === "draft" && canApprove(currentUser.role) && (
                                <button onClick={() => setStatus(draft.id, "review")} title="Zur Freigabe" className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                                  <Icons.Check className="w-4 h-4" />
                                </button>
                              )}
                              {draft.status === "review" && canApprove(currentUser.role) && (
                                <button onClick={() => setStatus(draft.id, "ready")} title="Freigeben" className="p-2 rounded-lg hover:bg-emerald-50 text-emerald-500 transition-colors">
                                  <Icons.Check className="w-4 h-4" />
                                </button>
                              )}
                              {draft.status === "ready" && canSend(currentUser.role) && (
                                <button onClick={() => openDispatch(draft)} title="Versandzentrale" className="p-2 rounded-lg hover:bg-violet-50 text-violet-500 transition-colors">
                                  <Icons.Send className="w-4 h-4" />
                                </button>
                              )}
                              <button onClick={() => openEdit(draft)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                                <Icons.Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          {draft.channels && draft.channels.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2.5">
                              {draft.channels.map(ch => {
                                const isSent = draft.sentChannels?.includes(channels.find(c => c.name === ch)?.id);
                                return (
                                  <span key={ch} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${isSent ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                                    {isSent ? "✓ " : ""}{ch}
                                  </span>
                                );
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

            {/* Week Tab */}
            {dashTab === "week" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <button onClick={() => setWeekOffset(w => w - 1)} className="p-2 rounded-lg hover:bg-slate-200 transition-colors">
                    <Icons.ChevLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-semibold">
                    KW {(() => {
                      const dates = getWeekDates(weekOffset);
                      const d = new Date(dates[0]);
                      const onejan = new Date(d.getFullYear(), 0, 1);
                      return Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
                    })()}: {formatDate(getWeekDates(weekOffset)[0])} – {formatDate(getWeekDates(weekOffset)[6])}
                  </span>
                  <button onClick={() => setWeekOffset(w => w + 1)} className="p-2 rounded-lg hover:bg-slate-200 transition-colors">
                    <Icons.ChevRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {getWeekDates(weekOffset).map((date, i) => {
                    const dayDrafts = drafts.filter(d => d.deadline === date);
                    const isToday = date === today();
                    return (
                      <div key={date} className={`rounded-xl p-2 min-h-[100px] border ${isToday ? "bg-indigo-50 border-indigo-300" : "bg-white border-slate-200"}`}>
                        <p className={`text-[10px] font-bold mb-1 ${isToday ? "text-indigo-600" : "text-slate-400"}`}>
                          {WEEKDAYS[i]} <span className="font-normal">{new Date(date).getDate()}.{new Date(date).getMonth() + 1}.</span>
                        </p>
                        {dayDrafts.map(d => (
                          <button key={d.id} onClick={() => openEdit(d)}
                            className="block w-full text-left mb-1 p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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

            {/* Checklist Tab */}
            {dashTab === "checklist" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">Wochenroutine – Prüfe den Status deiner Kommunikation</p>
                {[
                  { phase: "📝 Planung (Mo–Di)", items: drafts.filter(d => d.status === "draft"), desc: "Entwürfe erstellen und vorbereiten" },
                  { phase: "✅ Freigabe (Mi–Do)", items: drafts.filter(d => d.status === "review"), desc: "Inhalte prüfen und freigeben" },
                  { phase: "🚀 Versand (Fr–Sa)", items: drafts.filter(d => d.status === "ready"), desc: "Freigegebene Inhalte versenden" },
                ].map(phase => (
                  <div key={phase.phase} className="bg-white rounded-xl border border-slate-200 p-4">
                    <h4 className="font-bold text-sm mb-0.5">{phase.phase}</h4>
                    <p className="text-xs text-slate-400 mb-3">{phase.desc}</p>
                    {phase.items.length === 0 ? (
                      <p className="text-xs text-slate-300 italic">Keine Einträge</p>
                    ) : (
                      <div className="space-y-2">
                        {phase.items.map(d => (
                          <div key={d.id} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-slate-700 truncate">{d.occasion}</p>
                              <p className="text-[10px] text-slate-400">{d.department} · {formatDate(d.deadline)}</p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                              <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg hover:bg-white text-slate-400">
                                <Icons.Edit className="w-3.5 h-3.5" />
                              </button>
                              {d.status === "ready" && (
                                <button onClick={() => openDispatch(d)} className="p-1.5 rounded-lg hover:bg-violet-50 text-violet-500">
                                  <Icons.Send className="w-3.5 h-3.5" />
                                </button>
                              )}
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
                  <button onClick={() => { if (confirm("Entwurf wirklich löschen?")) deleteDraft(selectedDraft.id); }}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors">
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Basisdaten</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Anlass / Thema *</label>
                <input type="text" value={draftForm.occasion} onChange={e => setDraftForm(f => ({ ...f, occasion: e.target.value }))}
                  placeholder="z.B. Saisonstart Handball, Mitgliederversammlung..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm transition-all" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Sparte / Abteilung</label>
                  <select value={draftForm.department} onChange={e => setDraftForm(f => ({ ...f, department: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm">
                    <option value="">Auswählen…</option>
                    {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Zielgruppe</label>
                  <input type="text" value={draftForm.targetAudience} onChange={e => setDraftForm(f => ({ ...f, targetAudience: e.target.value }))}
                    placeholder="z.B. Mitglieder, Eltern, Öffentlichkeit"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Kommunikationsziel</label>
                  <input type="text" value={draftForm.goal} onChange={e => setDraftForm(f => ({ ...f, goal: e.target.value }))}
                    placeholder="z.B. Informieren, Mobilisieren, Einladen"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Deadline</label>
                  <input type="date" value={draftForm.deadline} onChange={e => setDraftForm(f => ({ ...f, deadline: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tonalität</label>
                <div className="flex flex-wrap gap-2">
                  {TONALITIES.map(t => (
                    <button key={t} onClick={() => setDraftForm(f => ({ ...f, tonality: t }))}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${draftForm.tonality === t ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kanäle</label>
                <div className="flex flex-wrap gap-2">
                  {channels.filter(c => c.active).map(c => {
                    const sel = draftForm.channels.includes(c.name);
                    return (
                      <button key={c.id} onClick={() => setDraftForm(f => ({
                        ...f, channels: sel ? f.channels.filter(x => x !== c.name) : [...f.channels, c.name]
                      }))}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${sel ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300"}`}>
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button onClick={handleGenerate} disabled={aiLoading || !draftForm.occasion.trim()}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold text-sm hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200">
              {aiLoading ? (
                <><div className="animate-spin"><Icons.Loader className="w-4 h-4" /></div> KI generiert Texte…</>
              ) : (
                <><Icons.Sparkle className="w-4 h-4" /> Mit KI generieren</>
              )}
            </button>

            {(draftForm.coreMessage || draftForm.shortText || draftForm.longText) && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Generierte Texte</h3>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-600">Kernbotschaft</label>
                    <button onClick={() => copyText(draftForm.coreMessage)} className="p-1 text-slate-300 hover:text-slate-500"><Icons.Copy className="w-3.5 h-3.5" /></button>
                  </div>
                  <textarea rows={2} value={draftForm.coreMessage} onChange={e => setDraftForm(f => ({ ...f, coreMessage: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm resize-none" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-600">Betreffzeile</label>
                    <button onClick={() => copyText(draftForm.subject)} className="p-1 text-slate-300 hover:text-slate-500"><Icons.Copy className="w-3.5 h-3.5" /></button>
                  </div>
                  <input type="text" value={draftForm.subject} onChange={e => setDraftForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-600">Kurztext (Social Media / WhatsApp)</label>
                    <button onClick={() => copyText(draftForm.shortText)} className="p-1 text-slate-300 hover:text-slate-500"><Icons.Copy className="w-3.5 h-3.5" /></button>
                  </div>
                  <textarea rows={3} value={draftForm.shortText} onChange={e => setDraftForm(f => ({ ...f, shortText: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm resize-none" />
                  <p className="text-[10px] text-slate-400 mt-1">{draftForm.shortText.length} / 280 Zeichen</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-600">Langtext (Website / Newsletter)</label>
                    <button onClick={() => copyText(draftForm.longText)} className="p-1 text-slate-300 hover:text-slate-500"><Icons.Copy className="w-3.5 h-3.5" /></button>
                  </div>
                  <textarea rows={8} value={draftForm.longText} onChange={e => setDraftForm(f => ({ ...f, longText: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm resize-none" />
                </div>
                {draftForm.checklist.length > 0 && (
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-2">Freigabe-Checkliste</label>
                    <div className="space-y-1.5">
                      {draftForm.checklist.map((item, i) => (
                        <label key={i} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                          <input type="checkbox" checked={item.checked}
                            onChange={() => {
                              const cl = [...draftForm.checklist];
                              cl[i] = { ...cl[i], checked: !cl[i].checked };
                              setDraftForm(f => ({ ...f, checklist: cl }));
                            }}
                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-200" />
                          <span className={`text-sm ${item.checked ? "line-through text-slate-400" : "text-slate-700"}`}>{item.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button onClick={() => saveDraft(draftForm, selectedDraftId)}
                className="flex-1 sm:flex-none px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors">
                💾 Speichern
              </button>
              {view === "editDraft" && selectedDraft && (
                <>
                  {selectedDraft.status === "draft" && canApprove(currentUser.role) && (
                    <button onClick={() => { saveDraft(draftForm, selectedDraftId); setStatus(selectedDraftId, "review"); }}
                      className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
                      Zur Freigabe
                    </button>
                  )}
                  {selectedDraft.status === "review" && canApprove(currentUser.role) && (
                    <button onClick={() => { saveDraft(draftForm, selectedDraftId); setStatus(selectedDraftId, "ready"); }}
                      className="px-5 py-3 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors">
                      ✅ Freigeben
                    </button>
                  )}
                  {selectedDraft.status === "ready" && canSend(currentUser.role) && (
                    <button onClick={() => { saveDraft(draftForm, selectedDraftId); openDispatch(selectedDraft); }}
                      className="px-5 py-3 bg-violet-600 text-white rounded-xl font-semibold text-sm hover:bg-violet-700 transition-colors">
                      🚀 Versandzentrale
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ═══ DISPATCH ═══ */}
        {view === "dispatch" && selectedDraft && (
          <div className="animate-fade-in max-w-2xl mx-auto space-y-5">
            <div>
              <h2 className="text-lg font-bold">Versandzentrale</h2>
              <p className="text-sm text-slate-500 mt-0.5">{selectedDraft.occasion}</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Vorschau</h3>
              {selectedDraft.subject && (
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 mb-0.5">BETREFF</p>
                  <p className="text-sm font-medium">{selectedDraft.subject}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] font-semibold text-slate-400 mb-0.5">KURZTEXT</p>
                <p className="text-sm text-slate-700">{selectedDraft.shortText || selectedDraft.coreMessage || "–"}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 mb-0.5">LANGTEXT</p>
                <p className="text-sm text-slate-700 whitespace-pre-line line-clamp-4">{selectedDraft.longText || "–"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Kanäle</h3>
              {channels.filter(c => c.active && (selectedDraft.channels || []).includes(c.name)).map(channel => {
                const isSent = selectedDraft.sentChannels?.includes(channel.id);
                const method = SEND_METHODS.find(m => m.value === channel.sendMethod);
                const MethodIcon = Icons[method?.icon || "Share"];
                return (
                  <div key={channel.id} className={`bg-white rounded-xl border p-4 flex items-center justify-between gap-3 transition-all ${isSent ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200"}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isSent ? "bg-emerald-100" : "bg-slate-100"}`}>
                        <MethodIcon className={`w-4 h-4 ${isSent ? "text-emerald-600" : "text-slate-500"}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{channel.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {method?.label}{channel.target ? ` · ${channel.target}` : " · Manuell"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isSent && <span className="text-[10px] font-bold text-emerald-600">✓ Geöffnet</span>}
                      <button onClick={() => handleChannelAction(channel, selectedDraft)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${isSent ? "bg-slate-100 text-slate-500 hover:bg-slate-200" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}>
                        {isSent ? "Erneut" : "Öffnen"}
                      </button>
                    </div>
                  </div>
                );
              })}
              {channels.filter(c => c.active && (selectedDraft.channels || []).includes(c.name)).length === 0 && (
                <p className="text-sm text-slate-400 text-center py-8">Keine aktiven Kanäle für diesen Entwurf konfiguriert</p>
              )}
            </div>

            {selectedDraft.status !== "sent" && (
              <button onClick={() => { setStatus(selectedDraft.id, "sent"); notify("Als versendet markiert"); }}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors">
                ✅ Alle Kanäle erledigt – als versendet markieren
              </button>
            )}
          </div>
        )}

        {/* ═══ SETTINGS ═══ */}
        {view === "settings" && (
          <div className="animate-fade-in max-w-2xl mx-auto space-y-5">
            <h2 className="text-lg font-bold">Einstellungen</h2>

            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
              {[
                { id: "channels", label: "Kanäle" },
                { id: "departments", label: "Sparten" },
                { id: "users", label: "Benutzer" },
                { id: "whatsapp", label: "WhatsApp" },
                { id: "api", label: "KI / API" },
              ].map(t => (
                <button key={t.id} onClick={() => setSettingsTab(t.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${settingsTab === t.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Channels */}
            {settingsTab === "channels" && (
              <div className="space-y-3">
                {channels.map((ch, idx) => (
                  <div key={ch.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={ch.active} onChange={() => {
                            if (!canConfig(currentUser.role)) { notify("Nur Admins können Kanäle konfigurieren"); return; }
                            const upd = [...channels]; upd[idx] = { ...upd[idx], active: !upd[idx].active }; setChannels(upd);
                          }} className="sr-only peer" />
                          <div className="w-9 h-5 bg-slate-200 peer-checked:bg-indigo-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                        <input type="text" value={ch.name}
                          onChange={e => {
                            if (!canConfig(currentUser.role)) return;
                            const upd = [...channels]; upd[idx] = { ...upd[idx], name: e.target.value }; setChannels(upd);
                          }}
                          className="font-semibold text-sm bg-transparent border-0 focus:ring-0 p-0" />
                      </div>
                      {ch.isCustom && (
                        <button onClick={() => {
                          if (!canConfig(currentUser.role)) { notify("Nur Admins"); return; }
                          setChannels(channels.filter((_, i) => i !== idx));
                        }} className="p-1.5 text-red-400 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">VERSANDART</label>
                        <select value={ch.sendMethod} onChange={e => {
                          if (!canConfig(currentUser.role)) return;
                          const upd = [...channels]; upd[idx] = { ...upd[idx], sendMethod: e.target.value }; setChannels(upd);
                        }} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-200">
                          {SEND_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">ZIEL</label>
                        <input type="text" value={ch.target} onChange={e => {
                          if (!canConfig(currentUser.role)) return;
                          const upd = [...channels]; upd[idx] = { ...upd[idx], target: e.target.value }; setChannels(upd);
                        }} placeholder={ch.sendMethod === "whatsapp" ? "+49..." : ch.sendMethod === "email" ? "verteiler@verein.de" : ch.sendMethod === "web" ? "https://cms..." : "Hinweis"}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-200" />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => {
                  if (!canConfig(currentUser.role)) { notify("Nur Admins"); return; }
                  setChannels([...channels, { id: genId(), name: "Neuer Kanal", active: true, sendMethod: "share", target: "", isCustom: true }]);
                }} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors">
                  + Kanal hinzufügen
                </button>
              </div>
            )}

            {/* Departments */}
            {settingsTab === "departments" && (
              <div className="space-y-3">
                {departments.map((dept, idx) => (
                  <div key={dept.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
                    <input type="color" value={dept.color} onChange={e => {
                      if (!canConfig(currentUser.role)) return;
                      const upd = [...departments]; upd[idx] = { ...upd[idx], color: e.target.value }; setDepartments(upd);
                    }} className="w-8 h-8 rounded-lg border-0 cursor-pointer" />
                    <input type="text" value={dept.name} onChange={e => {
                      if (!canConfig(currentUser.role)) return;
                      const upd = [...departments]; upd[idx] = { ...upd[idx], name: e.target.value }; setDepartments(upd);
                    }} className="flex-1 font-semibold text-sm bg-transparent border-0 focus:ring-0 p-0" />
                    <button onClick={() => {
                      if (!canConfig(currentUser.role)) { notify("Nur Admins"); return; }
                      setDepartments(departments.filter((_, i) => i !== idx));
                    }} className="p-1.5 text-red-400 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => {
                  if (!canConfig(currentUser.role)) { notify("Nur Admins"); return; }
                  setDepartments([...departments, { id: genId(), name: "Neue Abteilung", color: "#8b5cf6" }]);
                }} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors">
                  + Sparte hinzufügen
                </button>
              </div>
            )}

            {/* Users */}
            {settingsTab === "users" && (
              <div className="space-y-3">
                {users.map((user, idx) => (
                  <div key={user.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <input type="text" value={user.name} onChange={e => {
                        if (!canConfig(currentUser.role)) return;
                        const upd = [...users]; upd[idx] = { ...upd[idx], name: e.target.value }; setUsers(upd);
                      }} className="flex-1 font-semibold text-sm bg-transparent border-0 focus:ring-0 p-0" />
                      {users.length > 1 && (
                        <button onClick={() => {
                          if (!canConfig(currentUser.role)) { notify("Nur Admins"); return; }
                          if (user.id === currentUserId) { notify("Aktiven Benutzer nicht löschen"); return; }
                          setUsers(users.filter((_, i) => i !== idx));
                        }} className="p-1.5 text-red-400 hover:text-red-600"><Icons.Trash className="w-4 h-4" /></button>
                      )}
                    </div>
                    <select value={user.role} onChange={e => {
                      if (!canConfig(currentUser.role)) return;
                      const upd = [...users]; upd[idx] = { ...upd[idx], role: e.target.value }; setUsers(upd);
                    }} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-200">
                      {ROLES.map(r => <option key={r.value} value={r.value}>{r.label} – {r.desc}</option>)}
                    </select>
                  </div>
                ))}
                <button onClick={() => {
                  if (!canConfig(currentUser.role)) { notify("Nur Admins"); return; }
                  setUsers([...users, { id: genId(), name: "Neuer Benutzer", role: "author" }]);
                }} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-semibold text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors">
                  + Benutzer hinzufügen
                </button>
              </div>
            )}

            {/* WhatsApp */}
            {settingsTab === "whatsapp" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                    <Icons.Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">WhatsApp-Konfiguration</h3>
                    <p className="text-xs text-slate-400">Einstellungen für den WhatsApp-Versand</p>
                  </div>
                </div>
                {(() => {
                  const waChannel = channels.find(c => c.id === "wa" || c.name === "WhatsApp");
                  const waIdx = channels.findIndex(c => c.id === "wa" || c.name === "WhatsApp");
                  if (!waChannel) return <p className="text-sm text-slate-400">Kein WhatsApp-Kanal gefunden</p>;
                  return (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Telefonnummer (Einzelkontakt)</label>
                        <input type="tel" value={waChannel.target} onChange={e => {
                          if (!canConfig(currentUser.role)) return;
                          const upd = [...channels]; upd[waIdx] = { ...upd[waIdx], target: e.target.value }; setChannels(upd);
                        }} placeholder="+4917612345678 (leer = manuelle Auswahl)"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none text-sm" />
                        <p className="text-[10px] text-slate-400 mt-1">Leer lassen, um beim Versand WhatsApp zu öffnen und manuell einen Chat oder eine Gruppe auszuwählen.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="text-xs text-amber-800">
                          <strong>Hinweis:</strong> WhatsApp-Gruppen können nicht als feste Adresse hinterlegt werden. Gruppen werden aktuell manuell in WhatsApp ausgewählt.
                        </p>
                      </div>
                      <button onClick={() => {
                        const url = waChannel.target
                          ? `https://wa.me/${waChannel.target.replace(/[^0-9]/g, "")}?text=Test%20vom%20MultiChannelCockpit`
                          : `https://wa.me/?text=Test%20vom%20MultiChannelCockpit`;
                        window.open(url, "_blank");
                      }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
                        <Icons.ExternalLink className="w-4 h-4" /> WhatsApp-Test öffnen
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* API Config */}
            {settingsTab === "api" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                    <Icons.Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">KI-Anbindung (Claude API)</h3>
                    <p className="text-xs text-slate-400">Für die automatische Texterstellung</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-xs text-blue-800">
                    <strong>Option A – Direkt:</strong> Anthropic API-Key hier eintragen. Geeignet für Tests.
                    <br/><strong>Option B – Sicher (empfohlen):</strong> Cloudflare Worker als Proxy nutzen. Der Worker hält den API-Key serverseitig.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Cloudflare Worker URL (empfohlen)</label>
                  <input type="url" value={workerUrl} onChange={e => setWorkerUrl(e.target.value)}
                    placeholder="https://mcc-api.deine-domain.workers.dev"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm" />
                  <p className="text-[10px] text-slate-400 mt-1">Wenn gesetzt, werden Anfragen über den Worker geleitet.</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Anthropic API-Key</label>
                  <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
                    placeholder="sk-ant-..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm" />
                  <p className="text-[10px] text-slate-400 mt-1">Wird lokal im Browser gespeichert. Bei Worker-Nutzung optional.</p>
                </div>

                <button onClick={() => saveApiConfig(apiKey, workerUrl)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
                  💾 API-Konfiguration speichern
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ─── Bottom Navigation ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-slate-200">
        <div className="max-w-6xl mx-auto flex justify-around">
          {navItems.map(item => {
            const isActive = view === item.id || (item.id === "dashboard" && (view === "editDraft" || view === "dispatch"));
            return (
              <button key={item.id}
                onClick={() => { if (item.id === "newDraft") openNew(); else setView(item.id); }}
                className={`flex flex-col items-center gap-0.5 py-2.5 px-4 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}>
                {item.id === "newDraft" ? (
                  <div className="w-10 h-10 -mt-5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                    <Icons.Plus className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <item.icon className="w-5 h-5" />
                )}
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// ============================================
// COMPLETE APP.JSX - WITH REAL AI & PROGRESS TRACKING
// ============================================

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Sparkles, Trash2, Plus, Moon, Sun, Archive, Link2, Search, 
  TrendingUp, Check, MessageSquare, Download, Upload, Share2, 
  FileText, Database, Network, Edit2, Settings, ChevronDown, ChevronUp, PlayCircle 
} from 'lucide-react';

// ============================================
// 1. HELPERS & CONFIG
// ============================================

const SYSTEM_PROMPT = `
You are an expert productivity coach and project manager. 
Analyze the user's goal. Return ONLY a valid JSON object (no markdown) with this structure:
{
  "comment": "A short, witty, or insightful specific comment about this goal.",
  "sentiment": "positive" | "neutral" | "urgent" | "skeptical",
  "category": "Career" | "Health" | "Learning" | "Creative" | "Finance" | "Other",
  "milestones": [
    "Step 1 text",
    "Step 2 text",
    "Step 3 text"
  ]
}
Generate 3 to 5 concrete, actionable milestones to achieve the goal.
`;

const INITIAL_IDEAS = [
  {
    id: 1,
    text: "Build a Billion Dollar Company",
    category: "Career",
    aiComment: "Ambitious! Start with solving one real problem first. 🚀",
    sentiment: "excited",
    completed: false,
    connections: [],
    createdAt: Date.now(),
    milestones: [
      { id: 'm1', text: "Identify a problem worth solving", done: true },
      { id: 'm2', text: "Build an MVP (Minimum Viable Product)", done: false },
      { id: 'm3', text: "Get first 100 paying customers", done: false }
    ]
  }
];

// ============================================
// 2. COMPONENTS
// ============================================

function IdeaCard({ 
  idea, ideas, isDark, showAIComments, linkingMode, linkingFrom, 
  onToggleComplete, onArchive, onDelete, onStartLinking, 
  onLinkIdeas, onEdit, onToggleMilestone, onGeneratePlan, apiKey 
}) {
  const connected = ideas.filter(i => idea.connections.includes(i.id));
  const [isEditing, setIsEditing] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [editText, setEditText] = useState(idea.text);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  // Calculate Progress
  const totalMilestones = idea.milestones?.length || 0;
  const completedMilestones = idea.milestones?.filter(m => m.done).length || 0;
  const progressPercent = totalMilestones === 0 
    ? (idea.completed ? 100 : 0) 
    : Math.round((completedMilestones / totalMilestones) * 100);

  // Color logic based on category
  const getColors = (cat) => {
    const map = {
      'Career': isDark ? "bg-purple-900/40 border-purple-700 text-purple-100" : "bg-purple-50 border-purple-200 text-purple-900",
      'Health': isDark ? "bg-emerald-900/40 border-emerald-700 text-emerald-100" : "bg-emerald-50 border-emerald-200 text-emerald-900",
      'Finance': isDark ? "bg-yellow-900/40 border-yellow-700 text-yellow-100" : "bg-yellow-50 border-yellow-200 text-yellow-900",
      'Learning': isDark ? "bg-blue-900/40 border-blue-700 text-blue-100" : "bg-blue-50 border-blue-200 text-blue-900",
      'Urgent': isDark ? "bg-red-900/40 border-red-700 text-red-100" : "bg-red-50 border-red-200 text-red-900",
    };
    return map[cat] || (isDark ? "bg-slate-800 border-slate-700 text-slate-100" : "bg-white border-slate-200 text-slate-900");
  };

  const cardStyle = getColors(idea.category);

  const handleEdit = () => {
    if (isEditing && editText.trim()) onEdit(idea.id, editText);
    setIsEditing(!isEditing);
  };

  const handleGenerateClick = async (e) => {
    e.stopPropagation();
    if (!apiKey) {
      alert("Please add your API Key in Settings first!");
      return;
    }
    setIsLoadingPlan(true);
    await onGeneratePlan(idea.id, idea.text);
    setIsLoadingPlan(false);
    setShowPlan(true);
  };

  return (
    <div
      onClick={() => linkingMode && onLinkIdeas(idea.id)}
      className={`
        ${cardStyle} border p-5 rounded-2xl relative group transition-all duration-300 flex flex-col justify-between
        ${linkingMode && linkingFrom === idea.id ? 'ring-4 ring-indigo-500 scale-105' : 'hover:shadow-xl hover:-translate-y-1'}
        ${linkingMode ? 'cursor-pointer' : ''}
        ${idea.completed ? 'opacity-70 grayscale-[0.5]' : ''}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">
          {idea.category}
        </span>
        
        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="p-1.5 hover:bg-black/10 rounded-full" title="Edit"><Edit2 size={14} /></button>
          <button onClick={(e) => { e.stopPropagation(); onStartLinking(idea.id); }} className="p-1.5 hover:bg-blue-500 hover:text-white rounded-full" title="Link"><Link2 size={14} /></button>
          <button onClick={(e) => { e.stopPropagation(); if(confirm('Archive?')) onArchive(idea.id); }} className="p-1.5 hover:bg-orange-500 hover:text-white rounded-full" title="Archive"><Archive size={14} /></button>
          <button onClick={(e) => { e.stopPropagation(); if(confirm('Delete?')) onDelete(idea.id); }} className="p-1.5 hover:bg-red-500 hover:text-white rounded-full" title="Delete"><Trash2 size={14} /></button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            className="w-full bg-transparent border-b border-current outline-none text-lg font-bold"
            autoFocus
          />
        ) : (
          <h3 className={`text-xl font-bold mb-2 leading-tight ${idea.completed ? 'line-through' : ''}`}>
            {idea.text}
          </h3>
        )}

        {/* AI Insight */}
        {showAIComments && idea.aiComment && (
          <div className="text-sm opacity-80 italic mb-4 flex items-start gap-2 bg-black/5 dark:bg-white/5 p-2 rounded-lg">
            <Sparkles size={14} className="mt-1 shrink-0 text-indigo-500" />
            {idea.aiComment}
          </div>
        )}

        {/* PROGRESS BAR */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-semibold mb-1 opacity-70">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${progressPercent === 100 ? 'bg-green-500' : 'bg-indigo-500'}`} 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Milestones / Plan Section */}
        <div className="mt-4 border-t border-black/10 dark:border-white/10 pt-3">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowPlan(!showPlan); }}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide opacity-60 hover:opacity-100 transition"
          >
            {showPlan ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            {idea.milestones?.length > 0 ? 'Action Plan' : 'No Plan Yet'}
          </button>

          {showPlan && (
            <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2">
              {idea.milestones && idea.milestones.length > 0 ? (
                idea.milestones.map(m => (
                  <div key={m.id} className="flex items-start gap-2 text-sm group/item">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onToggleMilestone(idea.id, m.id); }}
                      className={`mt-0.5 w-4 h-4 border rounded flex items-center justify-center transition ${m.done ? 'bg-green-500 border-green-500 text-white' : 'border-current opacity-40 hover:opacity-100'}`}
                    >
                      {m.done && <Check size={10} />}
                    </button>
                    <span className={`${m.done ? 'line-through opacity-50' : ''}`}>{m.text}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-2">
                   <button 
                    onClick={handleGenerateClick}
                    disabled={isLoadingPlan}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-2 mx-auto transition"
                  >
                    {isLoadingPlan ? <div className="animate-spin h-3 w-3 border-2 border-white/30 border-t-white rounded-full"/> : <Sparkles size={12}/>}
                    Generate AI Action Plan
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 3. MAIN APP
// ============================================

function App() {
  // --- STATE ---
  const [ideas, setIdeas] = useState(() => JSON.parse(localStorage.getItem("mindMosaicData")) || INITIAL_IDEAS);
  const [archived, setArchived] = useState(() => JSON.parse(localStorage.getItem("mindMosaicArchived")) || []);
  const [theme, setTheme] = useState(() => localStorage.getItem("mindMosaicTheme") || "light");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("mindMosaicApiKey") || "");
  const [showSettings, setShowSettings] = useState(false);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("mosaic"); // mosaic | list
  const [linkingMode, setLinkingMode] = useState(false);
  const [linkingFrom, setLinkingFrom] = useState(null);
  const [showAIComments, setShowAIComments] = useState(true);

  // --- EFFECTS ---
  useEffect(() => { localStorage.setItem("mindMosaicData", JSON.stringify(ideas)); }, [ideas]);
  useEffect(() => { localStorage.setItem("mindMosaicArchived", JSON.stringify(archived)); }, [archived]);
  useEffect(() => { localStorage.setItem("mindMosaicTheme", theme); document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  useEffect(() => { localStorage.setItem("mindMosaicApiKey", apiKey); }, [apiKey]);

  const isDark = theme === "dark";

  // --- REAL AI ACTION ---
  const callOpenAI = async (promptText) => {
    if (!apiKey) throw new Error("No API Key");
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Cost effective
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Goal: ${promptText}` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    // Parse the JSON string from AI
    try {
      return JSON.parse(data.choices[0].message.content);
    } catch (e) {
      console.error("AI returned invalid JSON", data.choices[0].message.content);
      return { 
        comment: "AI response error. Try again.", 
        category: "Other", 
        milestones: ["Define the goal clearly"], 
        sentiment: "neutral" 
      };
    }
  };

  // --- CORE ACTIONS ---

  const addIdea = async () => {
    if (!input.trim()) return;
    setIsProcessing(true);

    let aiData = {
      comment: "Simulated comment (Add API Key for real AI)",
      category: "Thought",
      sentiment: "neutral",
      milestones: []
    };

    if (apiKey) {
      try {
        aiData = await callOpenAI(input);
      } catch (err) {
        alert("AI Error: " + err.message);
      }
    }

    const newIdea = {
      id: Date.now(),
      text: input,
      category: aiData.category || "Thought",
      aiComment: aiData.comment,
      sentiment: aiData.sentiment,
      milestones: aiData.milestones?.map((text, i) => ({ id: `m-${Date.now()}-${i}`, text, done: false })) || [],
      completed: false,
      connections: [],
      createdAt: Date.now()
    };

    setIdeas([newIdea, ...ideas]);
    setInput("");
    setIsProcessing(false);
  };

  const generatePlanForExisting = async (id, text) => {
    try {
      const aiData = await callOpenAI(text);
      setIdeas(prev => prev.map(idea => {
        if (idea.id !== id) return idea;
        return {
          ...idea,
          milestones: aiData.milestones.map((t, i) => ({ id: `m-${Date.now()}-${i}`, text: t, done: false })),
          aiComment: aiData.comment // Refresh comment too
        };
      }));
    } catch (err) {
      alert("Could not generate plan: " + err.message);
    }
  };

  const toggleMilestone = (ideaId, milestoneId) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id !== ideaId) return idea;
      const updatedMilestones = idea.milestones.map(m => 
        m.id === milestoneId ? { ...m, done: !m.done } : m
      );
      // Auto-complete idea if all milestones done? Optional.
      const allDone = updatedMilestones.every(m => m.done);
      return { ...idea, milestones: updatedMilestones, completed: allDone ? true : idea.completed };
    }));
  };

  const toggleComplete = (id) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  const editIdea = (id, newText) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, text: newText } : i));
  };

  const archiveIdea = (id) => {
    const item = ideas.find(i => i.id === id);
    if(item) {
      setArchived([...archived, { ...item, archivedAt: Date.now() }]);
      setIdeas(ideas.filter(i => i.id !== id));
    }
  };

  const deleteIdea = (id) => setIdeas(ideas.filter(i => i.id !== id));

  // Link Logic
  const startLinking = (id) => { setLinkingMode(true); setLinkingFrom(id); };
  const linkIdeas = (toId) => {
    if (linkingFrom && linkingFrom !== toId) {
      setIdeas(prev => prev.map(i => {
        if (i.id === linkingFrom) return { ...i, connections: [...new Set([...i.connections, toId])] };
        if (i.id === toId) return { ...i, connections: [...new Set([...i.connections, linkingFrom])] };
        return i;
      }));
    }
    setLinkingMode(false); setLinkingFrom(null);
  };

  // Filter Logic
  const filteredIdeas = useMemo(() => ideas.filter(i => {
    const matchSearch = i.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === "all" || i.category === filterCategory;
    return matchSearch && matchCat;
  }), [ideas, searchQuery, filterCategory]);

  const categories = useMemo(() => ["all", ...new Set(ideas.map(i => i.category))], [ideas]);

  // --- RENDER ---
  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      
      {/* --- NAVBAR --- */}
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-2">
            Mind<span className="text-indigo-600">Mosaic</span> <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md align-middle">PRO</span>
          </h1>
          <p className="text-sm opacity-60">Turn chaotic thoughts into executed goals.</p>
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={() => setShowSettings(!showSettings)} className={`p-2.5 rounded-xl transition ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-white hover:bg-slate-200 shadow-sm"}`}>
             <Settings size={20} className={!apiKey ? "text-red-500 animate-pulse" : ""} />
          </button>
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className={`p-2.5 rounded-xl transition ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-white hover:bg-slate-200 shadow-sm"}`}>
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* --- SETTINGS MODAL --- */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl shadow-2xl ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">OpenAI API Key</label>
              <input 
                type="password" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className={`w-full p-3 rounded-lg border outline-none ${isDark ? "bg-slate-900 border-slate-700" : "bg-slate-100 border-slate-300"}`}
              />
              <p className="text-xs mt-2 opacity-60">
                Key is stored in your browser's LocalStorage. It is never sent to our servers.
                Required for "Real AI" insights and plan generation.
              </p>
            </div>
            <button 
              onClick={() => setShowSettings(false)}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              Save & Close
            </button>
          </div>
        </div>
      )}

      {/* --- INPUT AREA --- */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
           <div className={`relative p-2 rounded-2xl ${isDark ? "bg-slate-800" : "bg-white"} shadow-xl flex items-center`}>
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addIdea()}
                placeholder={apiKey ? "Describe a goal (e.g., 'Learn Python in 30 days')..." : "Enter a thought (Add API Key for AI Plans)..."}
                className="w-full bg-transparent p-4 text-lg outline-none"
              />
              <button 
                onClick={addIdea}
                disabled={isProcessing || !input.trim()}
                className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2 font-bold mx-2"
              >
                {isProcessing ? <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" /> : <Plus size={24} />}
                <span className="hidden md:inline">Add</span>
              </button>
           </div>
        </div>
      </div>

      {/* --- DASHBOARD STATS --- */}
      {/* (Simplified for brevity, kept essential structure) */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition ${
                filterCategory === cat 
                ? "bg-indigo-600 text-white shadow-lg scale-105" 
                : isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-white hover:bg-slate-200 shadow"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID --- */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {linkingMode && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl animate-bounce flex items-center gap-3">
            <span>Select another card to link</span>
            <button onClick={() => setLinkingMode(false)} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs">Cancel</button>
          </div>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${viewMode === 'list' ? '!grid-cols-1' : ''}`}>
          {filteredIdeas.map(idea => (
            <IdeaCard 
              key={idea.id} 
              idea={idea} 
              ideas={ideas}
              isDark={isDark}
              apiKey={apiKey}
              showAIComments={showAIComments}
              linkingMode={linkingMode}
              linkingFrom={linkingFrom}
              onToggleComplete={toggleComplete}
              onToggleMilestone={toggleMilestone}
              onGeneratePlan={generatePlanForExisting}
              onArchive={archiveIdea}
              onDelete={deleteIdea}
              onEdit={editIdea}
              onStartLinking={startLinking}
              onLinkIdeas={linkIdeas}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;

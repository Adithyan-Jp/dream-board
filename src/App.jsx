import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Sparkles, Trash2, Plus, Moon, Sun, Archive, Link2, Search, TrendingUp, Check, MessageSquare, Download, Upload, Share2, FileText, Database, Network, Edit2, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================
// AI COMMENTS DATABASE (100+ Comments)
// ============================================

const AI_COMMENTS = {
  roasts: [
    "Bold move! But have you thought about step 1? 🤔",
    "Dream big, but maybe start with breakfast first? 🍳",
    "I love the enthusiasm, but let's be real here... 😅",
    "That's... ambitious. Got a plan or just vibes? ✨",
    "Okay, but what are you actually going to DO? 🎯",
    "World domination? Start with your inbox. 📧",
    "So... when does this masterplan actually begin? 🗓️",
    "I admire the confidence, but where's the roadmap? 🗺️",
    "Legendary goal! Now let's see some legendary effort. 💎",
    "This sounds like 2am you talking. Morning you should review this. ☕",
    "Big energy! But can we break this down into, like, actual steps? 📝",
    "Your future self called. They want a timeline. ⏰",
    "I'm not saying it's impossible... but I'm not NOT saying that. 🤷",
    "Fascinating. Have you consulted with reality lately? 🌍",
    "Love the vision! Hate the lack of execution plan. 📊",
    "This idea needs a strategy meeting with itself. 🤝",
    "Someone's been watching too many motivational videos. 📺",
    "Plot twist: What if you started TODAY? 🚀",
    "This sounds expensive. Have you checked your bank account? 💰",
    "Cool story bro. Now make it a plan. 📋"
  ],
  
  motivational: [
    "Yes! This is the energy we need! 🔥",
    "Love this! Small steps lead to big changes. 👣",
    "You've got this! Consistency is key. 💪",
    "Smart move. This will compound over time. 📈",
    "Simple but powerful. I'm rooting for you! 🌟",
    "One habit at a time—legendary! 🏆",
    "This is how champions are built! 🥇",
    "I can already see the progress. Keep going! 🎯",
    "Every expert was once a beginner. You're on your way! 🌱",
    "This is your moment. Make it count! ⚡",
    "Small wins lead to big victories! 🎊",
    "The journey of a thousand miles starts here. 🛤️",
    "Future you is going to be so proud! 🌈",
    "This is the kind of thinking that changes lives! 💫",
    "You're already ahead of everyone who didn't start. 🏃",
    "Success loves action. And you're taking it! 🎬",
    "This is what progress looks like! 📸",
    "Building something great, one day at a time. 🏗️",
    "Your dedication is inspiring! Keep that fire alive! 🔥",
    "This is the beginning of something beautiful! 🌸"
  ],
  
  analytical: [
    "Interesting. What's your timeline on this? ⏰",
    "Good thinking. Break this into smaller chunks. 🧩",
    "This makes sense. Have you considered the obstacles? 🚧",
    "Solid idea. Execution is everything. ⚡",
    "I see the vision. Now make a roadmap. 🗺️",
    "Metrics matter—how will you measure success? 📊",
    "Strategic thinking! What's the first milestone? 🎯",
    "Smart approach. What resources do you need? 🛠️",
    "This has potential. What's your success criteria? ✅",
    "Logical move. Have you identified dependencies? 🔗",
    "Thoughtful! What could go wrong and how will you adapt? 🔄",
    "I like where this is going. What's the MVP? 🎮",
    "Solid foundation. What's the next iteration? 🔄",
    "This needs a SWOT analysis. Strengths first! 💪",
    "Great start! Now let's quantify the goals. 📏",
    "Strategic! What's the risk mitigation plan? 🛡️",
    "I see the big picture. What are the critical paths? 🛣️",
    "Analytical mind at work! What data will you track? 📈",
    "Practical thinking. What's the ROI here? 💹",
    "This deserves a proper project plan. When do we start? 📅"
  ],
  
  health: [
    "Your body will thank you for this! 💚",
    "Health is wealth, and you're investing! 💪",
    "This is self-care at its finest! 🧘",
    "Your future self is already feeling better! 🌟",
    "Physical health = mental clarity. Smart move! 🧠",
    "Small health wins = big life improvements! 🎯",
    "Your body is a temple. Time to renovate! 🏛️",
    "This is the kind of commitment that transforms lives! 🦋",
    "Doctors everywhere are nodding approvingly! 👨‍⚕️",
    "Energy levels about to go through the roof! 📈",
    "This is what self-respect looks like! 🙌",
    "Your immune system just sent a thank you note! 💌",
    "Wellness journey: INITIATED! 🚀",
    "This is an investment that always pays dividends! 💰",
    "Remember: progress over perfection! 🎨",
    "Your heart is literally jumping for joy! ❤️",
    "This is how longevity is built! ⏳",
    "Mind-body connection strengthening! 🔗",
    "Future you is already more energetic! ⚡",
    "Health goals > Everything else! 🏆"
  ],
  
  learning: [
    "Knowledge is power, and you're leveling up! 📚",
    "The best investment is in yourself! 🎓",
    "Every skill learned is a superpower earned! 🦸",
    "Curiosity is the engine of achievement! 🚂",
    "Your brain is about to get a serious upgrade! 🧠",
    "This is how experts are made! 👨‍🏫",
    "The learning curve is steep, but so is the reward! 📈",
    "Future you will be so much more capable! 🌟",
    "This is career development gold! 💼",
    "Intelligence in action! Keep that momentum! 🎯",
    "You're investing in compound knowledge! 📊",
    "This skill will pay dividends forever! 💰",
    "Learning is earning in disguise! 💡",
    "Your professional value just increased! 📈",
    "This is the kind of thing resumes dream of! 📄",
    "Mastery is just consistent practice away! 🎯",
    "Every lesson learned is a door opened! 🚪",
    "You're building an unfair advantage! 🎮",
    "This is what continuous improvement looks like! 🔄",
    "Education never stops paying returns! 🎁"
  ],
  
  urgent: [
    "High priority detected—tackle this first! 🚨",
    "Time-sensitive! Get on this NOW! ⏰",
    "This needs immediate attention! 🔴",
    "Drop everything else. This is critical! ⚠️",
    "The clock is ticking. Move fast! ⏱️",
    "Urgency level: Maximum! Let's go! 🚀",
    "This can't wait. Action required! 📢",
    "Red alert status! Handle this immediately! 🚩",
    "Time is of the essence here! ⌛",
    "This should be at the top of your list! 📋",
    "Emergency mode: ACTIVATED! 🚨",
    "Procrastination is not an option here! ⛔",
    "The deadline is real. Move! 🏃",
    "This is a NOW problem, not a later problem! ⚡",
    "Critical path item identified! 🎯",
    "Don't sleep on this. Literally. ☕",
    "This is a sprint, not a marathon! 🏃‍♂️",
    "Timer started. Get to work! ⏲️",
    "Urgent and important! Quadrant 1 vibes! 📊",
    "Your future self is begging you to do this now! 🙏"
  ],
  
  thoughtful: [
    "Deep reflection detected. Journal this further! 📖",
    "This is the kind of thinking that leads to breakthroughs! 💡",
    "Philosophical vibes! Let's explore this deeper. 🤔",
    "Your mind is in expansion mode! 🌌",
    "This deserves more time and contemplation. ☕",
    "Profound thought! What led you here? 🧭",
    "This is the seed of something bigger! 🌱",
    "Existential thinking unlocked! 🔓",
    "Your consciousness is evolving! 🦋",
    "This is wisdom in formation! 📿",
    "Deep waters ahead. Keep swimming! 🌊",
    "Meta-thinking engaged! I like it! 🎭",
    "This thought has layers. Peel them back! 🧅",
    "Introspection level: Expert! 🧘",
    "This is the stuff breakthroughs are made of! 💫",
    "Your inner philosopher is showing! 🏛️",
    "Contemplative mood detected. Embrace it! 🌙",
    "This needs a dedicated thinking session! 🪑",
    "Wisdom emerging from reflection! 📚",
    "This is how insight happens! 🔍"
  ],
  
  creative: [
    "Creative genius alert! Run with this! 🎨",
    "This idea has serious potential! ✨",
    "Innovation in progress! Document everything! 📝",
    "Your creative engine is firing! 🚀",
    "This could be your breakthrough moment! 💡",
    "Originality detected! Protect this idea! 🛡️",
    "The world needs more thinking like this! 🌍",
    "Creative problem-solving at its finest! 🧩",
    "This is how new things get invented! 🔧",
    "Your imagination is your superpower! 🦸",
    "Art meets strategy. I love it! 🎭",
    "This breaks the mold. Perfect! 🔨",
    "Conventional thinking? Not here! 🚫",
    "You're thinking outside several boxes! 📦",
    "This idea deserves a patent! 📜",
    "Creative flow state achieved! 🌊",
    "Innovation doesn't knock. You found it! 🚪",
    "This is the stuff portfolios are made of! 💼",
    "Unique angle detected! Capitalize on it! 📐",
    "Your creative voice is strong! Keep expressing! 🎤"
  ]
};

const INITIAL_IDEAS = [
  {
    id: 1,
    text: "Build a Billion Dollar Company",
    description: "Focus on solving a real problem that affects millions. Start with market research, validate the idea with potential customers, and build an MVP. Remember: every unicorn started as a small startup.",
    category: "Big Dream",
    size: "large",
    color: "bg-indigo-100 text-indigo-800",
    darkColor: "bg-indigo-900 text-indigo-200",
    aiComment: "Ambitious! Start with solving one real problem first. 🚀",
    sentiment: "excited",
    completed: false,
    connections: [],
    createdAt: Date.now(),
    tags: ["business", "entrepreneurship"]
  },
  {
    id: 2,
    text: "Drink 3L Water Daily",
    description: "Set hourly reminders to drink water. Use a large water bottle to track intake. Benefits include better skin, improved energy, enhanced focus, and healthier organs.",
    category: "Health",
    size: "small",
    color: "bg-teal-100 text-teal-800",
    darkColor: "bg-teal-900 text-teal-200",
    aiComment: "Your body will thank you for this! 💚",
    sentiment: "positive",
    completed: false,
    connections: [],
    createdAt: Date.now() - 86400000,
    tags: ["health", "hydration"]
  },
  {
    id: 3,
    text: "Master React & APIs",
    description: "Build 3 projects: a todo app, a weather dashboard using external APIs, and a full-stack application. Focus on hooks, state management, and RESTful API integration.",
    category: "Learning",
    size: "wide",
    color: "bg-blue-100 text-blue-800",
    darkColor: "bg-blue-900 text-blue-200",
    aiComment: "Knowledge is power, and you're leveling up! 📚",
    sentiment: "motivated",
    connections: [1],
    createdAt: Date.now() - 172800000,
    tags: ["coding", "web-development"]
  },
];

function IdeaCard({ idea, ideas, isDark, showAIComments, linkingMode, linkingFrom, onToggleComplete, onArchive, onDelete, onStartLinking, onLinkIdeas, onEdit }) {
  const connected = ideas.filter(i => idea.connections.includes(i.id));
  const currentColor = isDark ? idea.darkColor : idea.color;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(idea.text);
  const [editDescription, setEditDescription] = useState(idea.description || '');
  const [showDescription, setShowDescription] = useState(false);

  const handleEdit = useCallback(() => {
    if (isEditing && editText.trim()) {
      onEdit(idea.id, editText, editDescription);
    }
    setIsEditing(!isEditing);
  }, [isEditing, editText, editDescription, idea.id, onEdit]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      handleEdit();
    }
  };

  return (
    <div
      onClick={() => linkingMode && onLinkIdeas(idea.id)}
      className={`
        ${currentColor} p-6 rounded-3xl relative group hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between
        ${linkingMode && linkingFrom === idea.id ? 'ring-4 ring-indigo-600' : ''}
        ${linkingMode ? 'cursor-pointer' : 'cursor-default'}
        ${idea.completed ? 'opacity-60' : ''}
      `}
      role="article"
      aria-labelledby={`idea-${idea.id}-title`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold uppercase tracking-wider opacity-60 bg-white/50 px-2 py-1 rounded-md">
          {idea.category}
        </span>
        <div className="flex gap-2 flex-wrap justify-end">
          {connected.length > 0 && (
            <div className="bg-white/80 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Link2 size={12} />
              {connected.length}
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(idea.id);
            }}
            className={`opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full transition ${idea.completed ? 'bg-green-500 text-white opacity-100' : 'hover:bg-green-500 hover:text-white'}`}
          >
            <Check size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartLinking(idea.id);
            }}
            className="opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            <Link2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Archive this idea?')) {
                onArchive(idea.id);
              }
            }}
            className="opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full hover:bg-orange-500 hover:text-white transition"
          >
            <Archive size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Delete permanently?')) {
                onDelete(idea.id);
              }
            }}
            className="opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className={`font-bold mt-2 break-words ${idea.completed ? 'line-through' : ''} ${idea.size === 'large' ? 'text-3xl' : 'text-xl'}`}>
          {isEditing ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              className="w-full bg-transparent border-b-2 border-current outline-none text-inherit mb-2"
              autoFocus
            />
          ) : (
            <h3 id={`idea-${idea.id}-title`}>{idea.text}</h3>
          )}
        </div>

        {(idea.description || isEditing) && (
          <div className="mt-3">
            {isEditing ? (
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add a description..."
                className="w-full bg-black/10 backdrop-blur-sm p-3 rounded-xl text-sm outline-none resize-none"
                rows="3"
              />
            ) : (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDescription(!showDescription);
                  }}
                  className="flex items-center gap-2 text-sm font-semibold opacity-70 hover:opacity-100 transition"
                >
                  {showDescription ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  {showDescription ? 'Hide' : 'Show'} Details
                </button>
                {showDescription && (
                  <div className="mt-2 bg-black/10 backdrop-blur-sm p-3 rounded-xl text-sm leading-relaxed">
                    {idea.description}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {showAIComments && idea.aiComment && (
          <div className="mt-3 bg-black/10 backdrop-blur-sm p-3 rounded-xl text-sm italic">
            <div className="flex items-start gap-2">
              <Sparkles size={16} className="flex-shrink-0 mt-0.5" />
              <span>{idea.aiComment}</span>
            </div>
          </div>
        )}

        {connected.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {connected.map(c => (
              <div key={c.id} className="text-xs bg-white/30 px-2 py-1 rounded-full">
                🔗 {c.text.slice(0, 20)}{c.text.length > 20 ? '...' : ''}
              </div>
            ))}
          </div>
        )}

        {idea.tags && idea.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {idea.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {idea.size === 'large' && !idea.completed && (
        <div className="mt-4">
          <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-current opacity-50 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem("mindMosaicData");
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });

  const [archived, setArchived] = useState(() => {
    const saved = localStorage.getItem("mindMosaicArchived");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("mindMosaicTheme");
    return saved || "light";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("mosaic");
  const [linkingMode, setLinkingMode] = useState(false);
  const [linkingFrom, setLinkingFrom] = useState(null);
  const [showAIComments, setShowAIComments] = useState(true);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle");

  useEffect(() => {
    localStorage.setItem("mindMosaicData", JSON.stringify(ideas));
    if (cloudSyncEnabled) {
      syncToCloud();
    }
  }, [ideas, cloudSyncEnabled]);

  useEffect(() => {
    localStorage.setItem("mindMosaicArchived", JSON.stringify(archived));
  }, [archived]);

  useEffect(() => {
    localStorage.setItem("mindMosaicTheme", theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (cloudSyncEnabled && window.storage) {
      loadFromCloud();
    }
  }, [cloudSyncEnabled]);

  const syncToCloud = async () => {
    if (!window.storage) return;

    setSyncStatus("syncing");
    try {
      await window.storage.set('mindmosaic-ideas', JSON.stringify(ideas), true);
      await window.storage.set('mindmosaic-archived', JSON.stringify(archived), true);
      setSyncStatus("synced");
      setTimeout(() => setSyncStatus("idle"), 2000);
    } catch (error) {
      setSyncStatus("error");
    }
  };

  const loadFromCloud = async () => {
    if (!window.storage) return;

    setSyncStatus("syncing");
    try {
      const ideasResult = await window.storage.get('mindmosaic-ideas', true);
      const archivedResult = await window.storage.get('mindmosaic-archived', true);

      if (ideasResult?.value) {
        setIdeas(JSON.parse(ideasResult.value));
      }
      if (archivedResult?.value) {
        setArchived(JSON.parse(archivedResult.value));
      }

      setSyncStatus("synced");
      setTimeout(() => setSyncStatus("idle"), 2000);
    } catch (error) {
      setSyncStatus("idle");
    }
  };

  const getAIComment = useCallback((text) => {
    const lowerText = text.toLowerCase();
    
    let commentArray;
    let sentiment;

    if (lowerText.includes("billion") || lowerText.includes("million") || lowerText.includes("famous")) {
      commentArray = AI_COMMENTS.roasts;
      sentiment = "skeptical";
    } else if (lowerText.includes("gym") || lowerText.includes("exercise") || lowerText.includes("health") || lowerText.includes("water")) {
      commentArray = AI_COMMENTS.health;
      sentiment = "positive";
    } else if (lowerText.includes("learn") || lowerText.includes("read") || lowerText.includes("skill") || lowerText.includes("code")) {
      commentArray = AI_COMMENTS.learning;
      sentiment = "motivated";
    } else if (lowerText.includes("urgent") || lowerText.includes("deadline") || lowerText.includes("asap")) {
      commentArray = AI_COMMENTS.urgent;
      sentiment = "urgent";
    } else if (lowerText.includes("think") || lowerText.includes("reflect") || lowerText.includes("wonder")) {
      commentArray = AI_COMMENTS.thoughtful;
      sentiment = "thoughtful";
    } else if (lowerText.includes("create") || lowerText.includes("design") || lowerText.includes("build") || lowerText.includes("invent")) {
      commentArray = AI_COMMENTS.creative;
      sentiment = "creative";
    } else if (text.length > 100) {
      commentArray = AI_COMMENTS.thoughtful;
      sentiment = "thoughtful";
    } else {
      commentArray = AI_COMMENTS.motivational;
      sentiment = "neutral";
    }

    const comment = commentArray[Math.floor(Math.random() * commentArray.length)];
    return { comment, sentiment };
  }, []);

  const analyzeAndAdd = useCallback(async () => {
    if (!input.trim()) return;
    setAiAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let size = "small";
    let category = "Thought";
    let color = "bg-gray-100 text-gray-800";
    let darkColor = "bg-gray-800 text-gray-200";
    const text = input.toLowerCase();

    if (text.includes("money") || text.includes("business") || text.includes("invest")) {
      category = "Career";
      color = "bg-purple-100 text-purple-800";
      darkColor = "bg-purple-900 text-purple-200";
      size = "wide";
    } else if (text.includes("health") || text.includes("diet") || text.includes("sleep")) {
      category = "Health";
      color = "bg-green-100 text-green-800";
      darkColor = "bg-green-900 text-green-200";
    } else if (text.includes("learn") || text.includes("book") || text.includes("course")) {
      category = "Learning";
      color = "bg-blue-100 text-blue-800";
      darkColor = "bg-blue-900 text-blue-200";
      size = "wide";
    } else if (input.length > 100) {
      size = "large";
      category = "Deep Thought";
      color = "bg-orange-100 text-orange-800";
      darkColor = "bg-orange-900 text-orange-200";
    } else if (text.includes("urgent") || text.includes("now") || text.includes("today")) {
      category = "Urgent";
      color = "bg-red-100 text-red-800";
      darkColor = "bg-red-900 text-red-200";
      size = "tall";
    } else if (text.includes("dream") || text.includes("goal") || text.includes("future")) {
      category = "Big Dream";
      color = "bg-indigo-100 text-indigo-800";
      darkColor = "bg-indigo-900 text-indigo-200";
      size = "large";
    }

    const aiResponse = getAIComment(input);

    const newIdea = {
      id: Date.now(),
      text: input,
      description: inputDescription,
      category,
      size,
      color,
      darkColor,
      aiComment: aiResponse.comment,
      sentiment: aiResponse.sentiment,
      completed: false,
      connections: [],
      createdAt: Date.now(),
      tags: []
    };
    
    setIdeas(prev => [newIdea, ...prev]);
    setInput("");
    setInputDescription("");
    setAiAnalyzing(false);
  }, [input, inputDescription, getAIComment]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeAndAdd();
    }
  }, [analyzeAndAdd]);

  const toggleComplete = useCallback((id) => {
    setIdeas(ideas => ideas.map(idea =>
      idea.id === id ? { ...idea, completed: !idea.completed } : idea
    ));
  }, []);

  const archiveIdea = useCallback((id) => {
    const ideaToArchive = ideas.find(i => i.id === id);
    if (ideaToArchive) {
      setArchived(prev => [...prev, { ...ideaToArchive, archivedAt: Date.now() }]);
      setIdeas(ideas => ideas.filter(i => i.id !== id));
    }
  }, [ideas]);

  const deleteIdea = useCallback((id) => {
    setIdeas(ideas => ideas.filter(i => i.id !== id));
  }, []);

  const editIdea = useCallback((id, newText, newDescription) => {
    setIdeas(ideas => ideas.map(idea =>
      idea.id === id ? { ...idea, text: newText, description: newDescription } : idea
    ));
  }, []);

  const startLinking = useCallback((id) => {
    setLinkingMode(true);
    setLinkingFrom(id);
  }, []);

  const linkIdeas = useCallback((toId) => {
    if (linkingFrom && linkingFrom !== toId) {
      setIdeas(ideas => ideas.map(idea => {
        if (idea.id === linkingFrom) {
          return { ...idea, connections: [...new Set([...idea.connections, toId])] };
        }
        if (idea.id === toId) {
          return { ...idea, connections: [...new Set([...idea.connections, linkingFrom])] };
        }
        return idea;
      }));
    }
    setLinkingMode(false);
    setLinkingFrom(null);
  }, [linkingFrom]);

  const filteredIdeas = useMemo(() => 
    ideas.filter(idea => {
      const matchesSearch = idea.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            idea.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterCategory === "all" || idea.category === filterCategory;
      return matchesSearch && matchesFilter;
    }),
  [ideas, searchQuery, filterCategory]);

  const categories = useMemo(() => [...new Set(ideas.map(i => i.category))], [ideas]);
 
  const stats = useMemo(() => ({
    total: ideas.length,
    completed: ideas.filter(i => i.completed).length,
    thisWeek: ideas.filter(i => Date.now() - i.createdAt < 7 * 24 * 60 * 60 * 1000).length,
    archived: archived.length,
    mostCommonCategory: categories.length > 0 
      ? categories.reduce((a, b) => 
          ideas.filter(i => i.category === a).length >= ideas.filter(i => i.category === b).length ? a : b
        )
      : "None"
  }), [ideas, archived, categories]);

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 to-blue-50";
  const textClass = isDark ? "text-white" : "text-slate-800";
  const cardBg = isDark ? "bg-slate-800" : "bg-white";
  const inputBg = isDark ? "bg-slate-800 text-white" : "bg-white";
  const borderColor = isDark ? "border-slate-700" : "border-slate-200";

  return (
    <div className={`min-h-screen p-4 md:p-12 font-sans ${textClass} ${bgClass} transition-colors duration-300`}>
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Mind<span className="text-indigo-600">Mosaic</span>
          </h1>
          <p className={`${isDark ? "text-slate-400" : "text-slate-500"} mt-2`}>
            Your secure personal knowledge vault with AI insights
          </p>
        </div>
        
        <div className="flex gap-3 items-center flex-wrap">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`p-3 rounded-xl ${cardBg} shadow-md hover:shadow-lg transition`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setCloudSyncEnabled(!cloudSyncEnabled)}
            className={`px-4 py-3 rounded-xl ${cloudSyncEnabled ? "bg-indigo-600 text-white" : cardBg} shadow-md hover:shadow-lg transition flex items-center gap-2 relative`}
          >
            <Share2 size={18} />
            <span className="hidden md:inline">Cloud</span>
            {syncStatus === "syncing" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            )}
            {syncStatus === "synced" && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setShowAIComments(!showAIComments)}
            className={`px-4 py-3 rounded-xl ${showAIComments ? "bg-indigo-600 text-white" : cardBg} shadow-md hover:shadow-lg transition flex items-center gap-2`}
          >
            <MessageSquare size={18} />
            <span className="hidden md:inline">AI</span>
          </button>
          <button
            onClick={() => setViewMode(viewMode === "mosaic" ? "list" : "mosaic")}
            className={`px-4 py-3 rounded-xl ${cardBg} shadow-md hover:shadow-lg transition flex items-center gap-2`}
          >
            <TrendingUp size={18} />
            <span className="hidden md:inline">{viewMode === "mosaic" ? "List" : "Grid"}</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className={`${cardBg} p-4 rounded-xl shadow-md`}>
          <div className={`text-2xl font-bold ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>{stats.total}</div>
          <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Total Ideas</div>
        </div>
        <div className={`${cardBg} p-4 rounded-xl shadow-md`}>
          <div className={`text-2xl font-bold ${isDark ? "text-green-400" : "text-green-600"}`}>{stats.completed}</div>
          <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Completed</div>
        </div>
        <div className={`${cardBg} p-4 rounded-xl shadow-md`}>
          <div className={`text-2xl font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}>{stats.thisWeek}</div>
          <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>This Week</div>
        </div>
        <div className={`${cardBg} p-4 rounded-xl shadow-md`}>
          <div className={`text-2xl font-bold ${isDark ? "text-purple-400" : "text-purple-600"}`}>{stats.archived}</div>
          <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Archived</div>
        </div>
        <div className={`${cardBg} p-4 rounded-xl shadow-md`}>
          <div className={`text-lg font-bold ${isDark ? "text-orange-400" : "text-orange-600"}`}>{stats.mostCommonCategory}</div>
          <div className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Top Category</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative group">
          <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur ${isDark ? "opacity-50" : "opacity-25"} group-hover:opacity-75 transition duration-500`}></div>
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="What's on your mind? AI will react... 🤖"
              className={`block w-full p-4 rounded-t-2xl border-none shadow-xl text-lg focus:ring-2 focus:ring-indigo-500 outline-none ${inputBg}`}
            />
            <textarea
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              placeholder="Add optional description..."
              className={`block w-full p-4 pr-32 rounded-b-2xl border-none shadow-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none ${inputBg} resize-none border-t ${borderColor}`}
              rows="2"
            />
            <button
              onClick={analyzeAndAdd}
              disabled={aiAnalyzing || !input.trim()}
              className="absolute right-3 bottom-3 bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {aiAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ideas..."
            className={`w-full pl-12 pr-4 py-3 rounded-xl ${inputBg} ${borderColor} border shadow-md focus:ring-2 focus:ring-indigo-500 outline-none`}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-4 py-3 rounded-xl whitespace-nowrap transition ${
              filterCategory === "all"
                ? "bg-indigo-600 text-white shadow-lg"
                : `${cardBg} ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-3 rounded-xl whitespace-nowrap transition ${
                filterCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg"
                  : `${cardBg} ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {linkingMode && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-indigo-600 text-white p-4 rounded-xl flex justify-between items-center">
            <span>Click on another card to create a connection</span>
            <button
              onClick={() => {
                setLinkingMode(false);
                setLinkingFrom(null);
              }}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto ${viewMode === "mosaic" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4" : "space-y-4"}`}>
        {filteredIdeas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            ideas={ideas}
            isDark={isDark}
            showAIComments={showAIComments}
            linkingMode={linkingMode}
            linkingFrom={linkingFrom}
            onToggleComplete={toggleComplete}
            onArchive={archiveIdea}
            onDelete={deleteIdea}
            onStartLinking={startLinking}
            onLinkIdeas={linkIdeas}
            onEdit={editIdea}
          />
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className={`text-6xl mb-4 ${isDark ? 'opacity-20' : 'opacity-10'}`}>🤔</div>
          <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            No ideas found. Start adding some thoughts!
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Sparkles, Trash2, Plus, Moon, Sun, Archive, Link2, Search, TrendingUp, Check, MessageSquare, X } from 'lucide-react';

const INITIAL_IDEAS = [
  { id: 1, text: "Build a Billion Dollar Company", category: "Big Dream", size: "large", color: "bg-indigo-100 text-indigo-800", darkColor: "bg-indigo-900 text-indigo-200", aiComment: "Ambitious! Start with solving one real problem first. 🚀", sentiment: "excited", completed: false, connections: [], createdAt: Date.now() },
  { id: 2, text: "Drink 3L Water", category: "Health", size: "small", color: "bg-teal-100 text-teal-800", darkColor: "bg-teal-900 text-teal-200", aiComment: "Simple and powerful. Your kidneys will thank you! 💧", sentiment: "positive", completed: false, connections: [], createdAt: Date.now() - 86400000 },
  { id: 3, text: "Master React & APIs", category: "Learning", size: "wide", color: "bg-blue-100 text-blue-800", darkColor: "bg-blue-900 text-blue-200", aiComment: "This pairs perfectly with your billion dollar dream. Keep building! 💪", sentiment: "motivated", connections: [1], createdAt: Date.now() - 172800000 },
];

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

  useEffect(() => {
    localStorage.setItem("mindMosaicData", JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem("mindMosaicArchived", JSON.stringify(archived));
  }, [archived]);

  useEffect(() => {
    localStorage.setItem("mindMosaicTheme", theme);
  }, [theme]);

  const getAIComment = async (text) => {
    const lowerText = text.toLowerCase();
    
    const roasts = [
      "Bold move! But have you thought about step 1? 🤔",
      "Dream big, but maybe start with breakfast first? 🍳",
      "I love the enthusiasm, but let's be real here... 😅",
      "That's... ambitious. Got a plan or just vibes? ✨",
      "Okay, but what are you actually going to DO? 🎯",
    ];
    
    const motivational = [
      "Yes! This is the energy we need! 🔥",
      "Love this! Small steps lead to big changes. 👣",
      "You've got this! Consistency is key. 💪",
      "Smart move. This will compound over time. 📈",
      "Simple but powerful. I'm rooting for you! 🌟",
    ];
    
    const analytical = [
      "Interesting. What's your timeline on this? ⏰",
      "Good thinking. Break this into smaller chunks. 🧩",
      "This makes sense. Have you considered the obstacles? 🚧",
      "Solid idea. Execution is everything. ⚡",
      "I see the vision. Now make a roadmap. 🗺️",
    ];

    if (lowerText.includes("billion") || lowerText.includes("million") || lowerText.includes("famous") || lowerText.includes("best in the world")) {
      return { comment: roasts[Math.floor(Math.random() * roasts.length)], sentiment: "skeptical" };
    } else if (lowerText.includes("gym") || lowerText.includes("water") || lowerText.includes("sleep") || lowerText.includes("meditate")) {
      return { comment: motivational[Math.floor(Math.random() * motivational.length)], sentiment: "positive" };
    } else if (lowerText.includes("learn") || lowerText.includes("study") || lowerText.includes("practice") || lowerText.includes("improve")) {
      return { comment: analytical[Math.floor(Math.random() * analytical.length)], sentiment: "motivated" };
    } else if (lowerText.includes("urgent") || lowerText.includes("asap") || lowerText.includes("emergency")) {
      return { comment: "Alright, let's get this done NOW! ⚡", sentiment: "urgent" };
    } else if (text.length > 50) {
      return { comment: "Deep thoughts! Write this down somewhere permanent. 📝", sentiment: "thoughtful" };
    } else {
      return { comment: motivational[Math.floor(Math.random() * motivational.length)], sentiment: "neutral" };
    }
  };

  const analyzeAndAdd = async () => {
    if (!input.trim()) return;

    setAiAnalyzing(true);
    
    let size = "small";
    let category = "Thought";
    let color = "bg-gray-100 text-gray-800";
    let darkColor = "bg-gray-800 text-gray-200";
    const text = input.toLowerCase();

    if (text.includes("money") || text.includes("company") || text.includes("career") || text.includes("business")) {
        category = "Career";
        color = "bg-purple-100 text-purple-800";
        darkColor = "bg-purple-900 text-purple-200";
        size = "wide";
    } else if (text.includes("gym") || text.includes("diet") || text.includes("health") || text.includes("water") || text.includes("exercise")) {
        category = "Health";
        color = "bg-green-100 text-green-800";
        darkColor = "bg-green-900 text-green-200";
    } else if (text.includes("learn") || text.includes("study") || text.includes("course") || text.includes("master")) {
        category = "Learning";
        color = "bg-blue-100 text-blue-800";
        darkColor = "bg-blue-900 text-blue-200";
        size = "wide";
    } else if (input.length > 50) {
        size = "large";
        category = "Deep Thought";
        color = "bg-orange-100 text-orange-800";
        darkColor = "bg-orange-900 text-orange-200";
    } else if (text.includes("urgent") || text.includes("now") || text.includes("asap")) {
        category = "Urgent";
        color = "bg-red-100 text-red-800";
        darkColor = "bg-red-900 text-red-200";
        size = "tall";
    } else if (text.includes("dream") || text.includes("wish") || text.includes("someday")) {
        category = "Big Dream";
        color = "bg-indigo-100 text-indigo-800";
        darkColor = "bg-indigo-900 text-indigo-200";
        size = "large";
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    const aiResponse = await getAIComment(input);

    const newIdea = { 
      id: Date.now(), 
      text: input, 
      category, 
      size, 
      color,
      darkColor,
      aiComment: aiResponse.comment,
      sentiment: aiResponse.sentiment,
      completed: false,
      connections: [],
      createdAt: Date.now()
    };
    
    setIdeas([newIdea, ...ideas]);
    setInput("");
    setAiAnalyzing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeAndAdd();
    }
  };

  const toggleComplete = (id) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, completed: !idea.completed } : idea
    ));
  };

  const archiveIdea = (id) => {
    const ideaToArchive = ideas.find(i => i.id === id);
    setArchived([...archived, { ...ideaToArchive, archivedAt: Date.now() }]);
    setIdeas(ideas.filter(i => i.id !== id));
  };

  const deleteIdea = (id) => {
    setIdeas(ideas.filter(i => i.id !== id));
  };

  const startLinking = (id) => {
    setLinkingMode(true);
    setLinkingFrom(id);
  };

  const linkIdeas = (toId) => {
    if (linkingFrom && linkingFrom !== toId) {
      setIdeas(ideas.map(idea => {
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
  };

  const getConnectedIdeas = (id) => {
    const idea = ideas.find(i => i.id === id);
    if (!idea) return [];
    return ideas.filter(i => idea.connections.includes(i.id));
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === "all" || idea.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const categories = [...new Set(ideas.map(i => i.category))];
  
  const stats = {
    total: ideas.length,
    completed: ideas.filter(i => i.completed).length,
    thisWeek: ideas.filter(i => Date.now() - i.createdAt < 7 * 24 * 60 * 60 * 1000).length,
    archived: archived.length,
    mostCommonCategory: categories.reduce((a, b) => 
      ideas.filter(i => i.category === a).length >= ideas.filter(i => i.category === b).length ? a : b
    , categories[0] || "None")
  };

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-900" : "bg-gradient-to-br from-slate-50 to-blue-50";
  const textClass = isDark ? "text-white" : "text-slate-800";
  const cardBg = isDark ? "bg-slate-800" : "bg-white";
  const inputBg = isDark ? "bg-slate-800 text-white" : "bg-white";
  const borderColor = isDark ? "border-slate-700" : "border-slate-200";

  const getRandomIdea = () => {
    if (ideas.length === 0) return;
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setSearchQuery(randomIdea.text);
    document.getElementById('search-input')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen p-4 md:p-12 font-sans ${textClass} ${bgClass} transition-colors duration-300`}>
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Mind<span className="text-indigo-600">Mosaic</span>
          </h1>
          <p className={`${isDark ? "text-slate-400" : "text-slate-500"} mt-2`}>
            Organize your chaos with AI insights
          </p>
        </div>
        
        <div className="flex gap-3 items-center flex-wrap">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`p-3 rounded-xl ${cardBg} shadow-md hover:shadow-lg transition ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button
            onClick={getRandomIdea}
            className={`px-4 py-3 rounded-xl ${cardBg} shadow-md hover:shadow-lg transition flex items-center gap-2 ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
          >
            <Sparkles size={18} />
            <span className="hidden md:inline">Random</span>
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
            className={`px-4 py-3 rounded-xl ${cardBg} shadow-md hover:shadow-lg transition flex items-center gap-2 ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
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
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="What's on your mind? AI will roast or motivate you... 🤖"
              className={`block w-full p-6 pr-32 rounded-2xl border-none shadow-xl text-lg focus:ring-2 focus:ring-indigo-500 outline-none ${inputBg} ${isDark ? "placeholder-slate-500" : "placeholder-slate-400"} resize-none`}
              rows="2"
            />
            <button
              onClick={analyzeAndAdd}
              disabled={aiAnalyzing}
              className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-6 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              {aiAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
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
            id="search-input"
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

      <div className={`max-w-7xl mx-auto ${viewMode === "mosaic" ? "grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4" : "space-y-4"}`}>
        {filteredIdeas.map((idea) => {
          const connected = getConnectedIdeas(idea.id);
          const currentColor = isDark ? idea.darkColor : idea.color;
          
          return (
            <div
              key={idea.id}
              onClick={() => linkingMode && linkIdeas(idea.id)}
              className={`
                ${viewMode === "mosaic" ? `${idea.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''} ${idea.size === 'wide' ? 'md:col-span-2' : ''} ${idea.size === 'tall' ? 'md:row-span-2' : ''}` : ''}
                ${currentColor} p-6 rounded-3xl relative group hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between
                ${linkingMode && linkingFrom === idea.id ? 'ring-4 ring-indigo-600' : ''}
                ${linkingMode ? 'cursor-pointer' : ''}
                ${idea.completed ? 'opacity-60' : ''}
              `}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider opacity-60 bg-white/50 px-2 py-1 rounded-md">
                  {idea.category}
                </span>
                <div className="flex gap-2">
                  {connected.length > 0 && (
                    <div className="bg-white/80 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Link2 size={12} />
                      {connected.length}
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(idea.id);
                    }}
                    className={`opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full transition ${idea.completed ? 'bg-green-500 text-white opacity-100' : 'hover:bg-green-500 hover:text-white'}`}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startLinking(idea.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full hover:bg-blue-500 hover:text-white transition"
                  >
                    <Link2 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      archiveIdea(idea.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full hover:bg-orange-500 hover:text-white transition"
                  >
                    <Archive size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteIdea(idea.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className={`font-bold mt-4 break-words ${idea.completed ? 'line-through' : ''} ${idea.size === 'large' ? 'text-3xl' : 'text-xl'}`}>
                  {idea.text}
                </h3>
                
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
        })}
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

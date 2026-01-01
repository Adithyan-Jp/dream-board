import React, { useState, useEffect } from 'react';
import { Sparkles, Trash2, Plus, Share2 } from 'lucide-react';

const INITIAL_IDEAS = [
  { id: 1, text: "Build a Billion Dollar Company", category: "Big Dream", size: "large", color: "bg-indigo-100 text-indigo-800" },
  { id: 2, text: "Drink 3L Water", category: "Health", size: "small", color: "bg-teal-100 text-teal-800" },
  { id: 3, text: "Master React & APIs", category: "Learning", size: "wide", color: "bg-blue-100 text-blue-800" },
];

function App() {
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem("mindMosaicData");
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });
  
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("mindMosaicData", JSON.stringify(ideas));
  }, [ideas]);

  const analyzeAndAdd = () => {
    if (!input.trim()) return;

    let size = "small";
    let category = "Thought";
    let color = "bg-gray-100 text-gray-800";
    const text = input.toLowerCase();

    if (text.includes("money") || text.includes("company") || text.includes("career")) {
        category = "Career";
        color = "bg-purple-100 text-purple-800";
        size = "wide";
    } else if (text.includes("gym") || text.includes("diet") || text.includes("health")) {
        category = "Health";
        color = "bg-green-100 text-green-800";
    } else if (text.length > 40) {
        size = "large";
        category = "Deep Thought";
        color = "bg-orange-100 text-orange-800";
    } else if (text.includes("urgent") || text.includes("now")) {
        category = "Urgent";
        color = "bg-red-100 text-red-800";
        size = "tall";
    }

    const newIdea = { id: Date.now(), text: input, category, size, color };
    setIdeas([newIdea, ...ideas]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') analyzeAndAdd();
  };

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans text-slate-800">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-center">
        <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Mind<span className="text-indigo-600">Mosaic</span></h1>
            <p className="text-slate-500 mt-2">Organize your chaos.</p>
        </div>
      </header>
      <div className="max-w-2xl mx-auto mb-16 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder="What's on your mind? (e.g. 'Start a gym routine')" className="block w-full p-6 pr-32 rounded-2xl border-none shadow-xl text-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white placeholder-slate-400" />
            <button onClick={analyzeAndAdd} className="absolute right-3 top-3 bottom-3 bg-indigo-600 text-white px-6 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-2"><Plus size={20} /> Add</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-bento gap-4">
        {ideas.map((idea) => (
          <div key={idea.id} className={`${idea.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''} ${idea.size === 'wide' ? 'md:col-span-2' : ''} ${idea.size === 'tall' ? 'md:row-span-2' : ''} ${idea.color} p-6 rounded-3xl relative group hover:scale-[1.02] transition-transform duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between`}>
            <div className="flex justify-between items-start"><span className="text-xs font-bold uppercase tracking-wider opacity-60 bg-white/50 px-2 py-1 rounded-md">{idea.category}</span><button onClick={() => setIdeas(ideas.filter(i => i.id !== idea.id))} className="opacity-0 group-hover:opacity-100 bg-white/80 p-2 rounded-full hover:bg-red-500 hover:text-white transition"><Trash2 size={16}/></button></div>
            <h3 className={`font-bold mt-4 break-words ${idea.size === 'large' ? 'text-3xl' : 'text-xl'}`}>{idea.text}</h3>
            {idea.size === 'large' && (<div className="mt-4 flex gap-2"><div className="h-2 w-full bg-black/5 rounded-full overflow-hidden"><div className="h-full w-1/3 bg-current opacity-50"></div></div></div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

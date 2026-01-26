import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Target, 
  BookOpen, 
  Flame, 
  DollarSign, 
  Gift, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon
} from 'lucide-react';

const App = () => {
  // --- State Management ---
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState({});
  const [longTermGoals, setLongTermGoals] = useState([
    { id: 1, text: "Learn a new language", completed: false },
    { id: 2, text: "Run a marathon", completed: false }
  ]);
  const [journalEntries, setJournalEntries] = useState({});
  const [habits, setHabits] = useState([
    { id: 1, name: "Morning Meditation", completions: {} },
    { id: 2, name: "Reading 30 mins", completions: {} },
    { id: 3, name: "No Sugar", completions: {} }
  ]);
  const [expenses, setExpenses] = useState({});
  const [checklists, setChecklists] = useState({
    rewards: [
      { id: 1, text: "Buy a new video game", cost: "50 tasks", achieved: false },
    ],
    punishments: [
      { id: 2, text: "No social media tomorrow", triggered: false }
    ]
  });

  const dateKey = selectedDate.toISOString().split('T')[0];
  const isToday = new Date().toISOString().split('T')[0] === dateKey;

  // --- Helpers ---
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const daysInYear = useMemo(() => {
    const year = new Date().getFullYear();
    const start = new Date(year, 0, 1);
    const days = [];
    for (let i = 0; i < 366; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      if (d.getFullYear() !== year) break;
      days.push(d);
    }
    return days;
  }, []);

  // --- Handlers ---
  const addItem = (setter, key, item) => {
    setter(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), { id: Date.now(), ...item }]
    }));
  };

  const toggleStatus = (setter, key, id) => {
    setter(prev => ({
      ...prev,
      [key]: prev[key].map(item => item.id === id ? { ...item, completed: !item.completed } : item)
    }));
  };

  const deleteItem = (setter, key, id) => {
    setter(prev => ({
      ...prev,
      [key]: prev[key].filter(item => item.id !== id)
    }));
  };

  const updateHabit = (id) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const newCompletions = { ...habit.completions };
        newCompletions[dateKey] = !newCompletions[dateKey];
        return { ...habit, completions: newCompletions };
      }
      return habit;
    }));
  };

  // --- Sub-Components ---
  const SectionHeader = ({ icon: Icon, title, color }) => (
    <div className={`flex items-center gap-2 mb-4 font-bold text-sm uppercase tracking-wider ${color}`}>
      <Icon size={18} />
      <span>{title}</span>
    </div>
  );

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 mb-6 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Life Dashboard</h1>
            <p className="text-slate-500 font-medium">{formatDate(selectedDate)}</p>
          </div>
          <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-100 dark:border-slate-700">
            <button 
              onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-1 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            >
              Today
            </button>
            <button 
              onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Daily Core */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <SectionHeader icon={CheckCircle2} title="To-Dos for the Day" color="text-indigo-500" />
              <div className="space-y-3">
                {(todos[dateKey] || []).map(todo => (
                  <div key={todo.id} className="flex items-center justify-between group">
                    <button 
                      onClick={() => toggleStatus(setTodos, dateKey, todo.id)}
                      className="flex items-center gap-3 text-sm flex-1"
                    >
                      {todo.completed ? 
                        <CheckCircle2 size={18} className="text-emerald-500" /> : 
                        <Circle size={18} className="text-slate-300" />
                      }
                      <span className={todo.completed ? "line-through text-slate-400" : ""}>{todo.text}</span>
                    </button>
                    <button onClick={() => deleteItem(setTodos, dateKey, todo.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <input 
                    type="text" 
                    placeholder="New task..."
                    className="w-full text-sm bg-slate-50 dark:bg-slate-900 border-none rounded-lg px-3 py-2 outline-none focus:ring-2 ring-indigo-500/20"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        addItem(setTodos, dateKey, { text: e.target.value, completed: false });
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </Card>

            <Card>
              <SectionHeader icon={Target} title="Long-Term Goals" color="text-amber-500" />
              <div className="space-y-3">
                {longTermGoals.map(goal => (
                  <div key={goal.id} className="flex items-center gap-3 text-sm">
                    <Target size={14} className={goal.completed ? "text-emerald-500" : "text-amber-400"} />
                    <span className={goal.completed ? "line-through text-slate-400" : ""}>{goal.text}</span>
                  </div>
                ))}
                <button 
                  onClick={() => setLongTermGoals([...longTermGoals, { id: Date.now(), text: "New Big Goal", completed: false }])}
                  className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-4 hover:text-amber-500 transition-colors"
                >
                  <Plus size={14} /> ADD GOAL
                </button>
              </div>
            </Card>

            <Card>
              <SectionHeader icon={BookOpen} title="Journal Entry" color="text-rose-500" />
              <textarea 
                value={journalEntries[dateKey] || ""}
                onChange={(e) => setJournalEntries(prev => ({ ...prev, [dateKey]: e.target.value }))}
                placeholder="How was your day? Any reflections?"
                className="w-full h-40 bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 text-sm resize-none outline-none focus:ring-2 ring-rose-500/20"
              />
            </Card>
          </div>

          {/* CENTER COLUMN: Calendar Grid */}
          <div className="lg:col-span-6">
            <Card className="h-full">
              <div className="flex items-center justify-between mb-8">
                <SectionHeader icon={CalendarIcon} title="365-Day Life Grid" color="text-blue-500" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Year {new Date().getFullYear()}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {daysInYear.map((day, idx) => {
                  const dKey = day.toISOString().split('T')[0];
                  const isActive = dKey === dateKey;
                  const isTodayDot = new Date().toISOString().split('T')[0] === dKey;
                  
                  // Simple heat map logic (tasks + journal length)
                  const activityLevel = (todos[dKey]?.length || 0) + (journalEntries[dKey]?.length ? 1 : 0);
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(new Date(day))}
                      className={`
                        w-4 h-4 md:w-5 md:h-5 rounded-sm transition-all relative group
                        ${isActive ? 'ring-2 ring-blue-500 ring-offset-2 scale-110 z-10' : ''}
                        ${isTodayDot ? 'border-2 border-red-400' : ''}
                        ${activityLevel > 3 ? 'bg-blue-600' : 
                          activityLevel > 1 ? 'bg-blue-400' : 
                          activityLevel > 0 ? 'bg-blue-200' : 
                          'bg-slate-100 dark:bg-slate-700'}
                      `}
                    >
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                        {day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-100 dark:bg-slate-700 rounded-sm"></div> Empty</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-200 rounded-sm"></div> Low Activity</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div> High Activity</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-red-400 rounded-sm"></div> Today</div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: Habits & Finance */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <SectionHeader icon={Flame} title="Habit Tracker" color="text-orange-500" />
              <div className="space-y-4">
                {habits.map(habit => (
                  <div key={habit.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{habit.name}</span>
                    <button 
                      onClick={() => updateHabit(habit.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                        habit.completions[dateKey] 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                      }`}
                    >
                      {habit.completions[dateKey] ? 'Done' : 'Pending'}
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <SectionHeader icon={DollarSign} title="Expense Tracker" color="text-emerald-500" />
              <div className="space-y-3">
                {(expenses[dateKey] || []).map(exp => (
                  <div key={exp.id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{exp.text}</span>
                    <span className="font-mono font-bold text-emerald-600">-${exp.amount}</span>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <input 
                    type="text" 
                    id="exp_name"
                    placeholder="Item..."
                    className="w-1/2 text-xs bg-slate-50 dark:bg-slate-900 border-none rounded-lg px-2 py-2 outline-none"
                  />
                  <input 
                    type="number" 
                    id="exp_amt"
                    placeholder="$"
                    className="w-1/4 text-xs bg-slate-50 dark:bg-slate-900 border-none rounded-lg px-2 py-2 outline-none"
                  />
                  <button 
                    onClick={() => {
                      const n = document.getElementById('exp_name');
                      const a = document.getElementById('exp_amt');
                      if (n.value && a.value) {
                        addItem(setExpenses, dateKey, { text: n.value, amount: a.value });
                        n.value = ''; a.value = '';
                      }
                    }}
                    className="bg-emerald-500 text-white rounded-lg p-2 hover:bg-emerald-600 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-none">
              <SectionHeader icon={Gift} title="Checklist + Rewards" color="text-purple-400" />
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <p className="text-[10px] font-bold text-purple-400 mb-2 tracking-widest uppercase">Rewards</p>
                  {checklists.rewards.map(r => (
                    <div key={r.id} className="flex items-center gap-2 text-xs mb-1">
                      <Gift size={12} className="text-purple-400" />
                      <span>{r.text} ({r.cost})</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white/5 rounded-xl">
                  <p className="text-[10px] font-bold text-rose-400 mb-2 tracking-widest uppercase">Punishments</p>
                  {checklists.punishments.map(p => (
                    <div key={p.id} className="flex items-center gap-2 text-xs">
                      <AlertTriangle size={12} className="text-rose-400" />
                      <span>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
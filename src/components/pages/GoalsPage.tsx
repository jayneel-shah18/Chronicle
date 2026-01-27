import { useState, FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Target, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import Navigation from '../common/Navigation';
import Card from '../common/Card';
import useStore from '../../store/useStore';
import { toast } from '../common/Toast';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export default function GoalsPage() {
  const [newGoal, setNewGoal] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { goals, addGoal, updateGoalProgress, deleteGoal } = useStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      addGoal(newGoal.trim());
      toast.success('Goal added! 🎯');
      setNewGoal('');
    }
  };

  const handleProgressUpdate = (id: number, delta: number) => {
    updateGoalProgress(id, delta);
    const goal = goals.find(g => g.id === id);
    const newProgress = Math.max(0, Math.min(100, (goal?.progress || 0) + delta));
    if (newProgress === 100) {
      toast.success('Goal completed! 🎉');
    } else {
      toast.info(`Progress ${delta > 0 ? '+' : ''}${delta}%`);
    }
  };

  const handleDeleteGoal = (id: number) => {
    deleteGoal(id);
    toast.info('Goal deleted');
  };

  useKeyboardShortcuts([
    {
      key: 'n',
      callback: () => inputRef.current?.focus(),
    },
    {
      key: 'j',
      callback: () => setSelectedIndex(prev => Math.min(prev + 1, goals.length - 1)),
    },
    {
      key: 'k',
      callback: () => setSelectedIndex(prev => Math.max(prev - 1, 0)),
    },
  ]);

  return (
    <div className="min-h-screen bg-chronicle-bg-dark text-chronicle-text-light">
      <Navigation />
      <div className="p-4 md:p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-chronicle-card-bg text-chronicle-text-light px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-white/10 hover:bg-accent-amber/10 hover:border-accent-amber mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <Card>
          <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent-amber to-accent-emerald bg-clip-text text-transparent">
            Long-Term Goals
          </h1>
          <p className="text-chronicle-text-muted mb-8">
            Track your progress towards your biggest ambitions
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
            <input
              ref={inputRef}
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="What's your goal?"
              className="input flex-1"
              autoFocus
            />
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Plus size={20} />
              Add Goal
            </button>
          </form>

          <div className="space-y-6">
            {goals.length === 0 ? (
              <p className="text-center text-chronicle-text-muted py-8">
                No goals yet. Set one above to start tracking your progress!
              </p>
            ) : (
              goals.map((goal, idx) => (
                <div
                  key={goal.id}
                  className={`p-5 rounded-xl transition-all group ${
                    idx === selectedIndex
                      ? 'bg-accent-amber/20 ring-2 ring-accent-amber'
                      : 'bg-chronicle-bg-dark/60 hover:bg-chronicle-bg-dark/80'
                  }`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <Target size={20} className="text-accent-amber mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{goal.title}</h3>
                        <p className="text-sm text-chronicle-text-muted mt-1">
                          {goal.progress}% complete
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteGoal(goal.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-rose hover:scale-110 transform"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="bg-chronicle-card-bg rounded-full h-3 overflow-hidden mb-4">
                    <div
                      className="bg-gradient-to-r from-accent-amber to-accent-emerald h-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProgressUpdate(goal.id, -10);
                      }}
                      className="btn-secondary flex items-center gap-1 text-sm flex-1"
                    >
                      <ChevronDown size={16} />
                      -10%
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProgressUpdate(goal.id, -5);
                      }}
                      className="btn-secondary flex items-center gap-1 text-sm flex-1"
                    >
                      <ChevronDown size={16} />
                      -5%
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProgressUpdate(goal.id, 5);
                      }}
                      className="btn-secondary flex items-center gap-1 text-sm flex-1"
                    >
                      <ChevronUp size={16} />
                      +5%
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProgressUpdate(goal.id, 10);
                      }}
                      className="btn-secondary flex items-center gap-1 text-sm flex-1"
                    >
                      <ChevronUp size={16} />
                      +10%
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
      </div>
    </div>
  );
}

import { useState, FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Navigation from '../common/Navigation';
import useStore from '../../store/useStore';
import { getDateKey, formatDate } from '../../utils/date';
import { toast } from '../common/Toast';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export default function TodosPage() {
  const [selectedDate] = useState(new Date());
  const [newTodo, setNewTodo] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos, addTodo, toggleTodo, deleteTodo } = useStore();

  const dateKey = getDateKey(selectedDate);
  const currentTodos = todos[dateKey] || [];
  const completedCount = currentTodos.filter(t => t.completed).length;
  const remainingCount = currentTodos.length - completedCount;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(dateKey, newTodo.trim());
      toast.success('Todo added!');
      setNewTodo('');
    }
  };

  const handleToggle = (id: number) => {
    const todo = currentTodos.find(t => t.id === id);
    toggleTodo(dateKey, id);
    toast.success(todo?.completed ? 'Todo reopened' : 'Todo completed! 🎉');
  };

  const handleDelete = (id: number) => {
    deleteTodo(dateKey, id);
    toast.info('Todo deleted');
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'n',
      callback: () => inputRef.current?.focus(),
      description: 'Focus new todo input',
    },
    {
      key: 'j',
      callback: () => setSelectedIndex(prev => Math.min(prev + 1, currentTodos.length - 1)),
      description: 'Select next todo',
    },
    {
      key: 'k',
      callback: () => setSelectedIndex(prev => Math.max(prev - 1, 0)),
      description: 'Select previous todo',
    },
    {
      key: 'd',
      callback: () => {
        if (selectedIndex >= 0 && currentTodos[selectedIndex]) {
          handleDelete(currentTodos[selectedIndex].id);
          setSelectedIndex(Math.max(selectedIndex - 1, 0));
        }
      },
      description: 'Delete selected todo',
    },
    {
      key: 'Enter',
      callback: () => {
        if (selectedIndex >= 0 && currentTodos[selectedIndex]) {
          handleToggle(currentTodos[selectedIndex].id);
        }
      },
      description: 'Toggle selected todo',
    },
  ]);

  return (
    <div className="min-h-screen bg-chronicle-bg-dark text-chronicle-text-light">
      <Navigation />
      <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-chronicle-card-bg text-chronicle-text-light px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-white/10 hover:bg-accent-blue/10 hover:border-accent-blue mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <Card>
          <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent-blue to-accent-emerald bg-clip-text text-transparent">
            Daily To-Dos
          </h1>
          <p className="text-chronicle-text-muted mb-8">
            {formatDate(selectedDate)}
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
            <input
              ref={inputRef}
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What do you need to do?"
              className="input flex-1"
              autoFocus
            />
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Plus size={20} />
              Add
            </button>
          </form>

          <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-chronicle-bg-dark/60 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-blue">{currentTodos.length}</div>
              <div className="text-sm text-chronicle-text-muted">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-emerald">{completedCount}</div>
              <div className="text-sm text-chronicle-text-muted">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-amber">{remainingCount}</div>
              <div className="text-sm text-chronicle-text-muted">Remaining</div>
            </div>
          </div>

          <div className="space-y-2">
            {currentTodos.length === 0 ? (
              <p className="text-center text-chronicle-text-muted py-8">
                No tasks for today. Add one above to get started!
              </p>
            ) : (
              currentTodos.map((todo, idx) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all group ${
                    idx === selectedIndex
                      ? 'bg-accent-blue/20 ring-2 ring-accent-blue'
                      : 'bg-chronicle-bg-dark/60 hover:bg-chronicle-bg-dark/80'
                  }`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(todo.id);
                    }}
                    className="flex-shrink-0 transition-transform hover:scale-110"
                  >
                    {todo.completed ? (
                      <CheckCircle2 size={24} className="text-accent-emerald" />
                    ) : (
                      <Circle size={24} className="text-chronicle-text-muted" />
                    )}
                  </button>
                  <span
                    className={`flex-1 ${
                      todo.completed
                        ? 'line-through text-chronicle-text-muted'
                        : 'text-chronicle-text-light'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(todo.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-rose hover:scale-110 transform"
                  >
                    <Trash2 size={18} />
                  </button>
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

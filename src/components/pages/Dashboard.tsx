import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Circle, 
  Target, 
  BookOpen, 
  Flame, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import Card from '../common/Card';
import SectionHeader from '../common/SectionHeader';
import Navigation from '../common/Navigation';
import useStore from '../../store/useStore';
import { getDateKey, formatDate, getDaysInYear } from '../../utils/date';
import { formatCurrency } from '../../utils/format';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { todos, goals, journalEntries, habits, habitData, expenses } = useStore();
  
  const dateKey = getDateKey(selectedDate);
  const currentTodos = todos[dateKey] || [];
  const completedToday = currentTodos.filter(t => t.completed).length;
  const totalToday = currentTodos.length;
  
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const goToToday = () => setSelectedDate(new Date());

  const daysInYear = getDaysInYear(selectedDate.getFullYear());
  
  const getActivityLevel = (date: Date): number => {
    const key = getDateKey(date);
    const dayTodos = todos[key] || [];
    const completedCount = dayTodos.filter((t: any) => t.completed).length;
    
    if (completedCount === 0) return 0;
    if (completedCount <= 2) return 1;
    if (completedCount <= 5) return 2;
    return 3;
  };

  const activityColors = [
    'rgba(200, 189, 177, 0.15)',
    'rgba(168, 184, 150, 0.3)',
    'rgba(168, 184, 150, 0.6)',
    'rgba(122, 138, 106, 0.9)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-chronicle-cream via-chronicle-sand to-chronicle-warm-gray/30 pattern-dots">
      <Navigation />
      
      <div className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12">
        {/* Header */}
        <header className="mb-12 animate-slide-down">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                Dashboard
              </h1>
              <p className="text-chronicle-stone text-lg">
                Track your progress and stay accountable
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-card px-6 py-4 shadow-soft border border-chronicle-stone/10">
                <div className="text-sm text-chronicle-stone">Today's Progress</div>
                <div className="text-2xl font-bold text-chronicle-sage-dark mt-1">
                  {totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Date Navigator */}
        <Card className="mb-8 animate-scale-in" variant="elevated">
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeDate(-1)}
              className="p-3 hover:bg-chronicle-sage/10 rounded-soft transition-all hover:scale-110 active:scale-95 text-chronicle-charcoal"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="text-center">
              <h2 className="text-xl font-display font-semibold text-chronicle-ink">
                {formatDate(selectedDate)}
              </h2>
              {getDateKey(selectedDate) !== getDateKey(new Date()) && (
                <button
                  onClick={goToToday}
                  className="text-sm text-chronicle-sage-dark hover:text-chronicle-sage font-medium mt-1 hover:underline"
                >
                  Jump to Today
                </button>
              )}
            </div>

            <button
              onClick={() => changeDate(1)}
              className="p-3 hover:bg-chronicle-sage/10 rounded-soft transition-all hover:scale-110 active:scale-95 text-chronicle-charcoal"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </Card>

        {/* 365-Day Heatmap */}
        <Card className="mb-10 animate-fade-in" variant="soft">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-semibold text-chronicle-ink flex items-center gap-2">
              <TrendingUp size={20} className="text-chronicle-sage" />
              Your Year at a Glance
            </h3>
            <div className="flex items-center gap-2 text-xs text-chronicle-stone">
              <span>Less</span>
              {activityColors.map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded border border-chronicle-stone/10"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(14px,1fr))] gap-1.5">
            {daysInYear.map((day, idx) => {
              const level = getActivityLevel(day);
              const isSelected = getDateKey(day) === dateKey;
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(new Date(day))}
                  className={`aspect-square rounded transition-all hover:scale-125 ${ 
                    isSelected ? 'ring-2 ring-chronicle-sage shadow-medium scale-110' : ''
                  }`}
                  style={{ backgroundColor: activityColors[level] }}
                  title={`${getDateKey(day)}: ${(todos[getDateKey(day)] || []).filter((t: any) => t.completed).length} completed`}
                />
              );
            })}
          </div>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily To-Dos */}
          <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <SectionHeader 
              icon={CheckCircle2} 
              title="Today's Tasks"
              badge={`${completedToday}/${totalToday}`}
            />
            <div className="space-y-2 mb-6">
              {currentTodos.length === 0 ? (
                <div className="text-center py-8 text-chronicle-stone">
                  <Sparkles className="mx-auto mb-3 opacity-30" size={40} />
                  <p>A fresh start! Add your first task.</p>
                </div>
              ) : (
                currentTodos.slice(-3).map((todo: any) => (
                  <div key={todo.id} className="flex items-center gap-3 p-3 bg-chronicle-sand/50 rounded-soft hover:bg-chronicle-warm-gray/40 transition-all group">
                    {todo.completed ? (
                      <CheckCircle2 size={20} className="text-chronicle-sage flex-shrink-0" />
                    ) : (
                      <Circle size={20} className="text-chronicle-stone flex-shrink-0" />
                    )}
                    <span className={`flex-1 ${todo.completed ? 'line-through text-chronicle-stone' : 'text-chronicle-charcoal'}`}>
                      {todo.text}
                    </span>
                  </div>
                ))
              )}
              {currentTodos.length > 3 && (
                <p className="text-sm text-chronicle-stone text-center mt-3">
                  +{currentTodos.length - 3} more tasks
                </p>
              )}
            </div>
            <Link
              to="/todos"
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              View All Tasks
            </Link>
          </Card>

          {/* Long-Term Goals */}
          <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <SectionHeader 
              icon={Target} 
              title="Goals"
              subtitle="Your long-term ambitions"
            />
            <div className="space-y-4 mb-6">
              {goals.length === 0 ? (
                <div className="text-center py-8 text-chronicle-stone">
                  <Target className="mx-auto mb-3 opacity-30" size={40} />
                  <p>Set your first goal and start achieving.</p>
                </div>
              ) : (
                goals.slice(0, 3).map((goal: any) => (
                  <div key={goal.id}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-chronicle-charcoal">{goal.title}</span>
                      <span className="text-chronicle-sage-dark font-semibold">{goal.progress}%</span>
                    </div>
                    <div className="bg-chronicle-warm-gray/30 rounded-full h-2.5 overflow-hidden shadow-inner-soft">
                      <div
                        className="bg-gradient-to-r from-chronicle-ochre to-chronicle-sage h-full transition-all duration-500 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
              {goals.length > 3 && (
                <p className="text-sm text-chronicle-stone text-center mt-3">
                  +{goals.length - 3} more goals
                </p>
              )}
            </div>
            <Link
              to="/goals"
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              Manage Goals
            </Link>
          </Card>

          {/* Journal */}
          <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <SectionHeader 
              icon={BookOpen} 
              title="Journal"
              subtitle="Today's reflection"
            />
            <div className="mb-6">
              {journalEntries[dateKey] ? (
                <div className="p-4 bg-chronicle-sand/50 rounded-soft border border-chronicle-stone/10">
                  <p className="text-chronicle-charcoal line-clamp-4 leading-relaxed">
                    {journalEntries[dateKey]}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-chronicle-stone">
                  <BookOpen className="mx-auto mb-3 opacity-30" size={40} />
                  <p>No entry yet. Capture your thoughts.</p>
                </div>
              )}
            </div>
            <Link
              to="/journal"
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              Open Journal
            </Link>
          </Card>

          {/* Habits */}
          <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <SectionHeader 
              icon={Flame} 
              title="Habits"
              subtitle="Build consistency"
            />
            <div className="mb-6">
              {habits.length === 0 ? (
                <div className="text-center py-8 text-chronicle-stone">
                  <Flame className="mx-auto mb-3 opacity-30" size={40} />
                  <p>Start tracking your first habit.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {habits.slice(0, 3).map((habit: any) => {
                    const key = `${habit.name}-${dateKey}`;
                    const status = habitData[key] || 'none';
                    
                    return (
                      <div key={habit.id} className="flex items-center justify-between p-3 bg-chronicle-sand/50 rounded-soft">
                        <span className="text-chronicle-charcoal font-medium">{habit.name}</span>
                        <div className="flex gap-2">
                          {status === 'success' && (
                            <span className="badge-success">✓ Done</span>
                          )}
                          {status === 'fail' && (
                            <span className="badge-error">✗ Skipped</span>
                          )}
                          {status === 'none' && (
                            <span className="badge">Pending</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {habits.length > 3 && (
                    <p className="text-sm text-chronicle-stone text-center mt-3">
                      +{habits.length - 3} more habits
                    </p>
                  )}
                </div>
              )}
            </div>
            <Link
              to="/habits"
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              Track Habits
            </Link>
          </Card>

          {/* Expenses */}
          <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <SectionHeader 
              icon={DollarSign} 
              title="Expenses"
              subtitle="Track your spending"
            />
            <div className="mb-6">
              {expenses.length === 0 ? (
                <div className="text-center py-8 text-chronicle-stone">
                  <DollarSign className="mx-auto mb-3 opacity-30" size={40} />
                  <p>No expenses tracked yet.</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4 p-4 bg-chronicle-sand/50 rounded-soft">
                    <span className="text-sm text-chronicle-stone">Recent Total</span>
                    <span className="text-2xl font-bold text-chronicle-terracotta-dark">
                      {formatCurrency(expenses.slice(0, 5).reduce((sum: number, e: any) => sum + e.amount, 0))}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {expenses.slice(0, 4).map((expense: any) => (
                      <div key={expense.id} className="flex justify-between p-3 bg-chronicle-sand/50 rounded-soft">
                        <div>
                          <div className="font-medium text-chronicle-charcoal">{expense.name}</div>
                          <div className="text-sm text-chronicle-stone">{expense.category}</div>
                        </div>
                        <span className="font-semibold text-chronicle-terracotta-dark">
                          {formatCurrency(expense.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {expenses.length > 4 && (
                    <p className="text-sm text-chronicle-stone text-center mt-3">
                      +{expenses.length - 4} more expenses
                    </p>
                  )}
                </div>
              )}
            </div>
            <Link
              to="/expenses"
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              View All Expenses
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

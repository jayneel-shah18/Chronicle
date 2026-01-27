import { useState, FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, DollarSign, Trash2 } from 'lucide-react';
import Navigation from '../common/Navigation';
import Card from '../common/Card';
import useStore from '../../store/useStore';
import { formatCurrency } from '../../utils/format';
import { toast } from '../common/Toast';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Other'] as const;

export default function ExpensesPage() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('Food');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { expenses, addExpense, deleteExpense } = useStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() && amount && parseFloat(amount) > 0) {
      addExpense({
        name: name.trim(),
        amount: parseFloat(amount),
        category,
      });
      toast.success(`${formatCurrency(parseFloat(amount))} expense added`);
      setName('');
      setAmount('');
      setCategory('Food');
      nameInputRef.current?.focus();
    }
  };

  const handleDeleteExpense = (id: number) => {
    deleteExpense(id);
    toast.info('Expense deleted');
  };

  useKeyboardShortcuts([
    {
      key: 'n',
      callback: () => nameInputRef.current?.focus(),
    },
  ]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categoryTotals = CATEGORIES.map(cat => ({
    category: cat,
    total: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
  })).filter(c => c.total > 0);

  return (
    <div className="min-h-screen bg-chronicle-bg-dark text-chronicle-text-light">
      <Navigation />
      <div className="p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-chronicle-card-bg text-chronicle-text-light px-4 py-3 rounded-xl font-semibold text-sm transition-all border border-white/10 hover:bg-accent-rose/10 hover:border-accent-rose mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-accent-rose to-accent-amber bg-clip-text text-transparent">
                Expense Tracker
              </h1>
              <p className="text-chronicle-text-muted mb-8">
                Keep track of your spending
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Expense name"
                    className="input md:col-span-1"
                    autoFocus
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="input"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as typeof CATEGORIES[number])}
                    className="input"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Plus size={20} />
                  Add Expense
                </button>
              </form>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
              <div className="space-y-2">
                {expenses.length === 0 ? (
                  <p className="text-center text-chronicle-text-muted py-8">
                    No expenses tracked yet. Add one above!
                  </p>
                ) : (
                  expenses.map(expense => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 bg-chronicle-bg-dark/60 rounded-xl hover:bg-chronicle-bg-dark/80 transition-colors group"
                    >
                      <div className="flex-1">
                        <div className="font-semibold">{expense.name}</div>
                        <div className="text-sm text-chronicle-text-muted flex items-center gap-2">
                          <span>{expense.category}</span>
                          <span>·</span>
                          <span>
                            {new Date(expense.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-accent-rose">
                          {formatCurrency(expense.amount)}
                        </span>
                        <button
                          onClick={() => handleDeleteExpense(expense.id!)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-rose hover:scale-110 transform"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-accent-rose" />
                Total Spending
              </h2>
              <div className="text-4xl font-extrabold text-accent-rose">
                {formatCurrency(totalExpenses)}
              </div>
              <p className="text-sm text-chronicle-text-muted mt-2">
                {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} tracked
              </p>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4">By Category</h2>
              <div className="space-y-3">
                {categoryTotals.length === 0 ? (
                  <p className="text-chronicle-text-muted text-sm">
                    No expenses yet
                  </p>
                ) : (
                  categoryTotals.map(({ category, total }) => (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{category}</span>
                        <span className="font-semibold">{formatCurrency(total)}</span>
                      </div>
                      <div className="bg-chronicle-card-bg rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-accent-rose h-full transition-all"
                          style={{ width: `${(total / totalExpenses) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

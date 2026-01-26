import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import TodosPage from './components/pages/TodosPage';
import GoalsPage from './components/pages/GoalsPage';
import JournalPage from './components/pages/JournalPage';
import HabitsPage from './components/pages/HabitsPage';
import ExpensesPage from './components/pages/ExpensesPage';
import { ToastContainer } from './components/common/Toast';
import { useGlobalShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  useGlobalShortcuts();

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

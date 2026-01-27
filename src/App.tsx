import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import TodosPage from './components/pages/TodosPage';
import GoalsPage from './components/pages/GoalsPage';
import JournalPage from './components/pages/JournalPage';
import HabitsPage from './components/pages/HabitsPage';
import ExpensesPage from './components/pages/ExpensesPage';
import ProfilePage from './components/pages/ProfilePage';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ToastContainer } from './components/common/Toast';
import { AuthProvider } from './contexts/AuthContext';
import { useGlobalShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  useGlobalShortcuts();

  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <ProtectedRoute>
                <GoalsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <JournalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/habits"
            element={
              <ProtectedRoute>
                <HabitsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <ExpensesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

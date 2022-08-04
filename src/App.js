import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import QuizPage from './Views/QuizPage'
import RegisterPage from './Views/RegisterPage'
import VerifyEmailPage from './Views/VerifyEmailPage';
import LoginPage from './Views/LoginPage'
import { useState, useEffect } from 'react'
import { AuthProvider } from './Auths/Auth'
import { auth } from './Auths/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './Auths/PrivateRoute'
import { Navigate } from 'react-router-dom'

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          } />
          <Route path="/login" element={
            !currentUser?.emailVerified
              ? <LoginPage />
              : <Navigate to='/' replace />
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified
              ? <RegisterPage />
              : <Navigate to='/' replace />
          } />
          <Route path='/verify-email' element={<VerifyEmailPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

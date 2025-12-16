import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import CoinPage from './pages/CoinPage'
import './App.css'

function App() {
  return (
    <div className="min-h-screen animated-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Home />
              </motion.div>
            } 
          />
          <Route 
            path="/coin/:id" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CoinPage />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { Activity, Moon, Sun } from 'lucide-react'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen relative p-4 md:p-8 dark:bg-dark-900 bg-gray-50 text-gray-900 dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="bg-primary-500/20 p-3 rounded-2xl border border-primary-500/30">
              <Activity className="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-white/70">
                Crypto Analytics
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time market tracking and insights</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-accent-500" /> : <Moon className="w-5 h-5 text-primary-500" />}
          </button>
        </header>

        {/* Main Dashboard */}
        <main>
          <Dashboard isDarkMode={isDarkMode} />
        </main>
      </div>
    </div>
  )
}

export default App

import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ title, value, trend, icon, delay = 0 }) {
  const isPositive = trend > 0
  const isNeutral = trend === 0 || trend === null

  return (
    <div 
      className="glass-card p-6 flex flex-col gap-4 fade-in-up" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 dark:text-gray-400 font-medium tracking-wide text-sm">{title}</h3>
        <div className="p-2 bg-gray-100 dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-white/5">
          {icon}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
          {value}
        </p>
        
        {!isNeutral && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-secondary-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(trend)?.toFixed(2)}%
          </div>
        )}
      </div>
    </div>
  )
}

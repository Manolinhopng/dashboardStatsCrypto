import { useState, useEffect } from 'react'
import axios from 'axios'
import StatCard from './StatCard'
import ChartComponent from './ChartComponent'
import { DollarSign, Percent, BarChart3, Clock, RefreshCw } from 'lucide-react'

export default function Dashboard({ isDarkMode }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchData = async () => {
    setIsRefreshing(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
      const res = await axios.get(apiUrl)
      setData(res.data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Error fetching dashboard data. Please try again.')
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Auto update every 60 seconds
    const interval = setInterval(() => {
      fetchData()
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] glass-panel fade-in-up">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">Gathering market intel...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-panel p-8 text-center border-red-500/20 fade-in-up">
        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={() => { setLoading(true); fetchData() }}
          className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-600 dark:text-red-300 rounded-lg transition-colors border border-red-500/50"
        >
          Retry
        </button>
      </div>
    )
  }

  // Derived Data for Top Coin Summary (Bitcoin usually)
  const topCoin = data[0] || {}

  // Data for Pricing Line Chart (Top coin 7-day sparkline)
  const lineChartData = topCoin.sparkline_in_7d?.price.map((price, idx) => ({
    hour: idx,
    value: price
  })) || []

  // Data for Market Cap Pie Chart
  const pieChartData = data.slice(0, 5).map(coin => ({
    name: coin.symbol.toUpperCase(),
    value: coin.market_cap
  }))

  // Data for 24h Change Bar Chart
  const barChartData = data.slice(0, 10).map(coin => ({
    name: coin.symbol.toUpperCase(),
    change: coin.price_change_percentage_24h
  }))

  return (
    <div className="space-y-6 fade-in-up">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last update: {lastUpdated.toLocaleTimeString()}</span>
        </div>
        <button
          onClick={fetchData}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-all group disabled:opacity-50 text-sm font-medium"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={`${topCoin.name} Price`}
          value={`$${topCoin.current_price?.toLocaleString()}`}
          trend={topCoin.price_change_percentage_24h}
          icon={<DollarSign className="text-secondary-500 w-6 h-6" />}
          delay={0}
        />
        <StatCard
          title="Market Cap"
          value={`$${(topCoin.market_cap / 1e9).toFixed(2)}B`}
          trend={null}
          icon={<BarChart3 className="text-primary-500 w-6 h-6" />}
          delay={100}
        />
        <StatCard
          title="24h Change"
          value={`${topCoin.price_change_percentage_24h?.toFixed(2)}%`}
          trend={topCoin.price_change_percentage_24h}
          icon={<Percent className="text-accent-500 w-6 h-6" />}
          delay={200}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Line Chart (Full width on lg) */}
        <div className="lg:col-span-2 glass-panel p-6">
          <ChartComponent
            title={`${topCoin.name} - 7 Day Trend`}
            type="line"
            data={lineChartData}
            dataKey="value"
            color="#8B5CF6"
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Side Charts flex col */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6">
            <ChartComponent
              title="Top 10 - 24h % Change"
              type="bar"
              data={barChartData}
              dataKey="change"
              color="#10B981"
              isDarkMode={isDarkMode}
            />
          </div>

          <div className="glass-panel p-6 flex-1">
            <ChartComponent
              title="Top 5 Market Cap Distribution"
              type="pie"
              data={pieChartData}
              dataKey="value"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        {/* Top 5 list */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 flex-1 fade-in-up">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <span className="w-2 h-2 rounded-full bg-accent-500"></span>
              Top 5 Highest Valued 💎
            </h3>
            <div className="space-y-4">
              {data.slice(0, 5).map((coin, idx) => (
                <div key={coin.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-dark-800/50 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-dark-700/80 transition-all shadow-sm gap-4">
                  
                  {/* Left Side: Rank, Icon, Name */}
                  <div className="flex items-center gap-3 min-w-[150px]">
                    <span className="text-gray-400 font-bold w-4">{idx + 1}.</span>
                    <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full shadow-sm" />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white leading-tight">{coin.name}</p>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</p>
                    </div>
                  </div>

                  {/* Middle Side: Extra Stats (Vol, High/Low) */}
                  <div className="flex-1 grid grid-cols-2 gap-2 text-sm border-l border-r border-gray-200 dark:border-white/10 px-4">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">24h Vol</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        ${(coin.total_volume / 1e9).toFixed(2)}B
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Market Cap</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        ${(coin.market_cap / 1e9).toFixed(2)}B
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs text-secondary-500">High 24h</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">${coin.high_24h?.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs text-red-500">Low 24h</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">${coin.low_24h?.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Right Side: Price & Change */}
                  <div className="text-right min-w-[100px]">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ${coin.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                    <p className={`text-sm font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-secondary-500' : 'text-red-500'} flex items-center justify-end gap-1`}>
                      {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h)?.toFixed(2)}%
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

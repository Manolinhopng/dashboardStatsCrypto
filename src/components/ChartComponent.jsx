import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899']

export default function ChartComponent({ title, type, data, dataKey, color = '#8B5CF6', isDarkMode = true }) {
  const gridStroke = isDarkMode ? "#ffffff10" : "#00000010"
  const axisStroke = isDarkMode ? "#ffffff40" : "#00000040"

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-dark-900/90 border border-gray-200 dark:border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-gray-900 dark:text-white font-semibold flex items-center gap-1">
            {payload[0].name ? `${payload[0].name} :` : ''} 
            ${payload[0].value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    if (type === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="hour" stroke={axisStroke} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              domain={['auto', 'auto']} 
              stroke={axisStroke} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: gridStroke, strokeWidth: 1 }} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: color, stroke: '#111827', strokeWidth: 2 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      )
    }

    if (type === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="name" stroke={axisStroke} fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke={axisStroke} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDarkMode ? '#ffffff05' : '#00000005' }} />
            <Bar 
              dataKey={dataKey} 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry[dataKey] >= 0 ? '#10B981' : '#EF4444'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    }

    if (type === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              formatter={(value) => <span className="text-gray-700 dark:text-gray-300 font-medium text-xs">{value}</span>}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={dataKey}
              nameKey="name"
              animationDuration={1500}
              stroke="transparent"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )
    }

    return null
  }

  return (
    <div className="flex flex-col h-full fade-in-up">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
        {title}
      </h3>
      <div className="flex-1 w-full flex items-center justify-center">
        {data.length > 0 ? renderChart() : <p className="text-gray-500">No data available.</p>}
      </div>
    </div>
  )
}

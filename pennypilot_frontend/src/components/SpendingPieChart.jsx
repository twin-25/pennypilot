import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const SpendingPieChart = ({ data }) => {
  const sorted = [...(data?.by_category || [])].sort((a, b) => b.total - a.total)

  // top 5
  const top5 = sorted.slice(0, 3)

  // rest grouped as Other
  const others = sorted.slice(3)
  const othersTotal = others.reduce((sum, cat) => sum + cat.total, 0)

  // build chart data
  const chartData = [
    ...top5.map(cat => ({
      name: cat.category__name,
      value: cat.total,
      color: cat.category__color
    })),
    // only add Other if there are more than 5 categories
    ...(others.length > 0 ? [{ name: 'Other', value: othersTotal, color: '#888780' }] : [])
  ]
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={chartData}
        dataKey='value'
        nameKey='name'
        cx='50%'
        cy='50%'
        outerRadius={100}
        innerRadius={50}
        labelLine={false}
      >
        {chartData?.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value) => `$${value}`}
        contentStyle={{
          backgroundColor: '#1a1a2e',
          border: '1px solid #2a2a3e',
          borderRadius: '8px',
          color: '#e0e0f0'
        }}
      />
      <Legend
        formatter={(value) => (
          <span style={{ color: '#a0a0b0', fontSize: '12px' }}>{value}</span>
        )}
      />
    </PieChart >
  )
}

export default SpendingPieChart
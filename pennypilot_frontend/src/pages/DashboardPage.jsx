import React from 'react'
import { useGetDashboardQuery } from '../store/services/dashboardApi'
import Card from '../components/ui/Card'
import Loader from '../components/ui/Loader'
import Navbar from '../components/Navbar.jsx'
import SpendingPieChart from '../components/SpendingPieChart.jsx'

const DashboardPage = () => {
  const  {data, isLoading, error} = useGetDashboardQuery(undefined, {
  refetchOnMountOrArgChange: true  
})
  
  return (
    <>
    <Navbar />
    <div className='min-h-screen bg-background pt-25 p-6'>
    
    {isLoading&&<Loader />}
    {error && (
        <p className='text-danger text-xs'>{error?.data?.detail}</p>
      )}


    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
  <Card title='Balance'>
    <p className='text-brand-gold text-2xl font-bold'>${data?.balance}</p>
  </Card>
  <Card title='Income'>
    <p className='text-success text-2xl font-bold'>+${data?.income}</p>
  </Card>
  <Card title='Expense'>
    <p className='text-danger text-2xl font-bold'>-${data?.expense}</p>
  </Card>
</div>


    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card title='Spend By Category'
      className='w-full  p-6 rounded-base shadow-xs'
      >
        <SpendingPieChart data={data} />

        <div className='max-h-48 overflow-y-auto scrollbar-hide mt-4'>
          <ul role='list' className='divide-y divide-border'>
            {data?.by_category.map((category)=>(
              <li key={category.category__name} className='py-4'>
  <div className='flex items-center gap-2'>
    <div>{category?.category__icon}</div>
    <div className="flex-1 min-w-0 ms-2">
      
      <div className="flex justify-between mb-1">
        <p className="font-medium text-text truncate">
          {category?.category__name}
        </p>
        <p className="text-sm text-text">
          ${category?.total}
        </p>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${(category.total / data?.expense) * 100}%`,
            backgroundColor: category.category__color
          }}
        />
      </div>
    </div>
  </div>
</li>

            ))}
          </ul>
        </div>

      </Card>
      <Card title = 'Recent Transactions'
      className='w-full  p-6 rounded-base shadow-xs'
      >
          <div className='overflow-y-auto scrollbar-hide mt-4'>
          <ul role='list' className='divide-y divide-default'>
            {data?.recent_transactions.map((transaction)=>(
              <li key={transaction.id} className='py-4 sm:py-4'>
                <div className='flex items-center gap-2'>
                  <div>{transaction.category?.icon}</div>
                  <div className="flex-1 flex flex-col min-w-0 ms-2">
                        <p className="font-medium text-heading truncate">
                            {transaction.category?.name}
                        </p>
                        <p className="text-sm text-muted truncate">
                            {transaction.date} • {transaction.mode_of_payment} • {transaction.note}
                        </p>
            
                    </div>
                    <div 
                    className = {transaction?.type === 'INC'? 'inline-flex items-center font-medium text-heading text-success' : 'inline-flex items-center font-medium text-heading text-danger'}
                    >
                     {transaction?.type === 'INC' ? `+ $${transaction.amount}` :`- $${transaction.amount}`}   
                    </div>
                </div>
            </li>
            ))}
          </ul>
        </div>
      </Card>

    </div>


    </div>

    </>
  )
}

export default DashboardPage
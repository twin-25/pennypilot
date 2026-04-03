import React, { useState } from 'react'
import { useDeleteBudgetMutation, useGetBudgetsQuery } from '../store/services/budgetsApi'
import Card from '../components/ui/Card'
import Navbar from '../components/Navbar'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Select from '../components/ui/Select'
import Loader from '../components/ui/Loader'
import BudgetModal from '../components/BudgetModal'

const months = [
    { value: 'JAN', label: 'January' },
    { value: 'FEB', label: 'February' },
    { value: 'MAR', label: 'March' },
    { value: 'APR', label: 'April' },
    { value: 'MAY', label: 'May' },
    { value: 'JUN', label: 'June' },
    { value: 'JUL', label: 'July' },
    { value: 'AUG', label: 'August' },
    { value: 'SEP', label: 'September' },
    { value: 'OCT', label: 'October' },
    { value: 'NOV', label: 'November' },
    { value: 'DEC', label: 'December' },
]

const BudgetsPage = () => {
    const [month, setMonth] = useState('JAN')
    const [year, setYear] = useState(new Date().getFullYear())
    const { data: budgets, isLoading } = useGetBudgetsQuery({ month, year })
    const [deleteBudget] = useDeleteBudgetMutation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBudget, setSelectedBudget] = useState(null)

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteBudget(id).unwrap()
            } catch (err) {
                console.log(err)
            }
        }
    }

    const getProgressColor = (percentage) => {
        if (percentage >= 100) return '#e24b4a'  // red
        if (percentage >= 80) return '#f97316'   // orange
        if (percentage >= 50) return '#eab308'   // yellow
        return '#1d9e75'                          // green
    }

    if (isLoading) return <Loader messages={['Counting your budget limits...💰']} />

    return (
        <div className='min-h-screen bg-background pt-20 p-6'>
            <Navbar />

            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-text text-2xl font-bold'>Budgets</h1>
                <button className='bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 cursor-pointer'
                onClick={()=>{
                  setIsModalOpen(true)
                  setSelectedBudget(null)
                }}
                >
                    + Add Budget
                </button>
            </div>

            {/* Month + Year selector */}
            <div className='flex gap-4 mb-6'>
                <Select
                    label='Month'
                    id='month'
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    options={months}
                />
                <Select
                    label='Year'
                    id='year'
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    options={[
                        { value: 2024, label: '2024' },
                        { value: 2025, label: '2025' },
                        { value: 2026, label: '2026' },
                    ]}
                />
            </div>

            {/* Budget List */}
            <Card>
                <ul className='divide-y divide-border'>
                    {budgets?.map((budget) => (
                        <li key={budget.id} className='py-4'>
                            <div className='flex items-center gap-2'>
                                <div className='text-2xl'>{budget.category?.icon}</div>
                                <div className='flex-1 flex flex-col min-w-0 ms-2'>
                                    <div className='flex justify-between'>
                                        <p className='font-medium text-text'>
                                            {budget.category?.name}
                                        </p>
                                        <div className='flex gap-3'>
                                            <FiEdit
                                                className='text-primary cursor-pointer hover:opacity-80'
                                                size={16}
                                                onClick={()=>{
                                                  setSelectedBudget(budget)
                                                  setIsModalOpen(true)
                                                }}
                                            />
                                            <FiTrash2
                                                className='text-danger cursor-pointer hover:opacity-80'
                                                size={16}
                                                onClick={() => deleteHandler(budget.id)}
                                            />
                                        </div>
                                    </div>
                                    <p className='text-sm text-muted'>
                                        ${budget.spent_amount} spent of ${budget.limit_amount}
                                    </p>
                                    <div className='w-full bg-secondary rounded-full h-2 mt-2'>
                                        <div
                                            className='h-2 rounded-full transition-all'
                                            style={{
                                                width: `${Math.min(budget.percentage, 100)}%`,
                                                backgroundColor: getProgressColor(budget.percentage)
                                            }}
                                        />
                                    </div>
                                    <p className='text-xs text-muted mt-1'>
                                        {budget.percentage}%
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}

                    <BudgetModal
                    key = {selectedBudget?.id || 'new'}
                    isOpen={isModalOpen}
                    onClose={()=>{
                      setIsModalOpen(false)
                      setSelectedBudget(null)
                    }}
                    budget={selectedBudget}
                    />

                    {budgets?.length === 0 && (
                        <p className='text-muted text-center py-8'>
                            No budgets for this month!
                        </p>
                    )}
                </ul>
            </Card>
        </div>
    )
}

export default BudgetsPage
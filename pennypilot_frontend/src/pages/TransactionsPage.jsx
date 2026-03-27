import React from 'react'
import { useGetTransactionsQuery } from '../store/services/transactionsApi'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import Modal from '../components/Modal'
import Loader from '../components/ui/Loader'
import CategoryModal from '../components/CategoryModal'

const TransactionsPage = () => {
  const { data, isLoading, error } = useGetTransactionsQuery()




const [isModalOpen, setIsModalOpen] = useState(false)
const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
const [selectedTransaction, setSelectedTransaction] = useState(null)

if (isLoading) return <Loader text={'Getting yor transactions'}/>
  if (error) return <p className='text-danger'>Something went wrong!</p>


  return (
    <div className='min-h-screen bg-background pt-20 p-6'>
      <Navbar />

      {/* Header */}
      <div className='flex justify-between items-center mb-6 mt-3'>
        <h1 className='text-text text-2xl font-bold'>Transactions</h1>
        <div className='flex justify-end items-center'>
        <button className='bg-primary text-white mr-2 px-4 py-2 rounded-lg text-sm hover:opacity-90 cursor-pointer'
        onClick={() => {
  setSelectedTransaction(null)  
  setIsModalOpen(true)
}}
        >
          + Add Transaction
        </button>


        <button className='bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 cursor-pointer'
        onClick={() => {
  setIsCategoryModalOpen(true)
}}
        >
          + Add Category
        </button>
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto bg-surface border border-border rounded-xl'>
        <table className='w-full text-sm text-left'>
          <thead className='border-b border-border'>
            <tr>
              <th className='px-6 py-3 text-muted font-medium'>Category</th>
              <th className='px-6 py-3 text-muted font-medium'>Date</th>
              <th className='px-6 py-3 text-muted font-medium'>Note</th>
              <th className='px-6 py-3 text-muted font-medium'>Mode</th>
              <th className='px-6 py-3 text-muted font-medium'>Type</th>
              <th className='px-6 py-3 text-muted font-medium'>Amount</th>
              <th className='px-6 py-3 text-muted font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((transaction) => (
              <tr key={transaction?.id} className='border-b border-border hover:bg-secondary transition-colors'>
                <td className='px-6 py-4 text-text font-medium'>
                  {transaction?.category?.icon} {transaction?.category?.name}
                </td>
                <td className='px-6 py-4 text-muted'>
                  {transaction?.date}
                </td>
                <td className='px-6 py-4 text-muted'>
                  {transaction?.note}
                </td>
                <td className='px-6 py-4 text-muted'>
                  {transaction?.mode_of_payment}
                </td>
                <td className='px-6 py-4'>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction?.type === 'INC'
                      ? 'bg-success/20 text-success'
                      : 'bg-danger/20 text-danger'
                  }`}>
                    {transaction?.type === 'INC' ? 'Income' : 'Expense'}
                  </span>
                </td>
                <td className={`px-6 py-4 font-medium ${
                  transaction?.type === 'INC' ? 'text-success' : 'text-danger'
                }`}>
                  {transaction?.type === 'INC' ? '+' : '-'}${transaction?.amount}
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-3'>
                    <FiEdit className='text-primary cursor-pointer hover:opacity-80' size={16} onClick={() => {
  setSelectedTransaction(transaction) 
  setIsModalOpen(true)
}} />
                    <FiTrash2 className='text-danger cursor-pointer hover:opacity-80' size={16} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
        key={selectedTransaction?.id || 'new'}
  isOpen={isModalOpen}
  onClose={() => {setIsModalOpen(false)
    
  }}
  transaction={selectedTransaction}
/>
<CategoryModal
  isOpen={isCategoryModalOpen}
  onClose={() => {setIsCategoryModalOpen(false)
    
  }}
/>
      </div>
    </div>
  )
}

export default TransactionsPage
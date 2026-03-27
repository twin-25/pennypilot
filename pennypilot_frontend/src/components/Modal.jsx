import React, { useState, useEffect } from 'react'
import Input from './ui/Input'
import Select from './ui/Select'
import Button from './ui/Button'
import { useCreateTransactionMutation, useUpdateTransactionMutation } from '../store/services/transactionsApi'
import{useGetCategoriesQuery} from '../store/services/categoryApi'

const Modal = ({ isOpen, onClose, transaction = null }) => {
  const [createTransaction, { isLoading }] = useCreateTransactionMutation()
  const [updateTransaction, { isLoading: load }] = useUpdateTransactionMutation()
  const{data} = useGetCategoriesQuery()

const [transactionData, setTransactionData] = useState({
  category: transaction?.category?.id || '',
  amount: transaction?.amount || '',
  type: transaction?.type || 'EXP',
  mode_of_payment: transaction?.mode_of_payment || 'CASH',
  card_type: transaction?.card_type || '',
  date: transaction?.date || '',
  note: transaction?.note || '',
})


  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (transaction) {
        await updateTransaction({ id: transaction.id, ...transactionData }).unwrap()
      } else {
        await createTransaction(transactionData).unwrap()
      }
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-surface border border-border rounded-xl p-6 w-full max-w-md'>

        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-text text-xl font-bold'>
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className='text-muted hover:text-text cursor-pointer'>✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input
            label='Amount'
            type='number'
            id='amount'
            placeholder='Enter amount'
            value={transactionData.amount}
            onChange={(e) => setTransactionData({...transactionData, amount: e.target.value})}
          />
          <Select
            label='Category'
            id='category'
            value={transactionData.category}
            onChange={(e) => setTransactionData({...transactionData, type: e.target.value})}
            options={data?.map((category)=>(
              {value:`${category.id}`, label:`${category.icon} ${category.name}`}
            )) ||[]}
          />
          <Input
            label='Date'
            type='date'
            id='date'
            value={transactionData.date}
            onChange={(e) => setTransactionData({...transactionData, date: e.target.value})}
          />
          <Select
            label='Type'
            id='type'
            value={transactionData.type}
            onChange={(e) => setTransactionData({...transactionData, type: e.target.value})}
            options={[
              { value: 'EXP', label: 'Expense' },
              { value: 'INC', label: 'Income' },
            ]}
          />
          <Select
            label='Mode of Payment'
            id='mode'
            value={transactionData.mode_of_payment}
            onChange={(e) => setTransactionData({...transactionData, mode_of_payment: e.target.value})}
            options={[
              { value: 'CASH', label: 'Cash' },
              { value: 'C', label: 'Card' },
            ]}
          />
          {transactionData.mode_of_payment === 'CARD' && (
            <Select
              label='Card Type'
              id='cardType'
              value={transactionData.card_type}
              onChange={(e) => setTransactionData({...transactionData, card_type: e.target.value})}
              options={[
                { value: 'CC', label: 'Credit Card' },
                { value: 'D', label: 'Debit Card' },
              ]}
            />
          )}
          <Input
            label='Note'
            type='text'
            id='note'
            placeholder='What is this for?'
            value={transactionData.note}
            onChange={(e) => setTransactionData({...transactionData, note: e.target.value})}
          />

          <div className='flex gap-3 mt-2'>
            <Button type='submit' disabled={isLoading || load}>
              {isLoading || load ? 'Saving...' : transaction ? 'Update' : 'Add Transaction'}
            </Button>
            <Button variant='outline' type='button' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Modal
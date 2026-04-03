import React, { useState} from 'react'
import Input from './ui/Input'
import Select from './ui/Select'
import Button from './ui/Button'
import { useCreateBudgetMutation, useUpdateBudgetMutation } from '../store/services/budgetsApi'
import { useGetCategoriesQuery } from '../store/services/categoryApi'


const BudgetModal = ({ isOpen, onClose, budget = null }) => {
  const [createBudget, { isLoading }] = useCreateBudgetMutation()
  const [updateBudget, { isLoading: load }] = useUpdateBudgetMutation()
  const{data} = useGetCategoriesQuery()

const [budgetData, setBudgetData] = useState({
  category_id: budget?.category?.id || '',
  limit_amount: budget?.limit_amount || 0,
  month: budget?.month || '',
  year: budget?.year || '',
})


  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (budget) {
        await updateBudget({ id: budget.id, ...budgetData }).unwrap()
      } else {
        await createBudget(budgetData).unwrap()
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
            {budget ? 'Edit Budget' : 'Add Budget'}
          </h2>
          <button onClick={onClose} className='text-muted hover:text-text cursor-pointer'>✕</button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input
            label='Amount'
            type='number'
            id='limit_amount'
            placeholder='Enter amount'
            value={budgetData.limit_amount}
            onChange={(e) => setBudgetData({...budgetData, limit_amount: e.target.value})}
          />
          

          <Select
            label='Category'
            id='category'
            value={budgetData.category}
            disabled = {budget?true:false}
            onChange={(e) => setBudgetData({...budgetData, category_id: e.target.value})}
            options={data?.map((category)=>(
              {value:`${category.id}`, label:`${category.icon} ${category.name}`}
            )) ||[]}
          />

          <Select
            label='Month'
            id='month'
            value={budgetData.month}
            disabled = {budget?true:false}
            onChange={(e) => setBudgetData({...budgetData, month: e.target.value})}
            options={[
              {value:'JAN', label:'January'},
              {value:'FEB', label:'February'},
              {value:'MAR', label:'March'},
              {value:'APR', label:'April'},
              {value:'MAY', label:'May'},
              {value:'JUN', label:'June'},
              {value:'JUL', label:'July'},
              {value:'AUG', label:'August'},
              {value:'SEP', label:'September'},
              {value:'OCT', label:'October'},
              {value:'NOV', label:'November'},
              {value:'DEC', label:'December'},
            ]}
          />
          <Select
            label='Year'
            id='year'
            value={budgetData.year}
            disabled = {budget?true:false}
            onChange={(e) => setBudgetData({...budgetData, year: e.target.value})}
            options={[
              { value: new Date().getFullYear(), label: `${new Date().getFullYear()}` },
            ]}
          />

          <div className='flex gap-3 mt-2'>
            <Button type='submit' disabled={isLoading || load}>
              {isLoading || load ? 'Saving...' : budget ? 'Update' : 'Add Budget'}
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

export default BudgetModal
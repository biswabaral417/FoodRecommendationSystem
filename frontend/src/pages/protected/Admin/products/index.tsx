import React, { useState } from 'react'
import { useAllFoods } from '../../../../Api/admin/useAllFoods'
import AddNewFoodModal from '../modals/addNewFoodModal/AddNewFoodModal'
import { Edit } from 'lucide-react'
import useAppContext from '../../../../Providers/AppProvider'
import ModifyFoods from '../modals/modifyFoodModal/ModifyFoods'

const Products: React.FC = () => {
  const { data, error, isLoading } = useAllFoods()
  const { modalWrapperVis, setModalWrapperVis } = useAppContext()




  const [viewAddFoodModal, setViewAddFoodModal] = useState<boolean>(false)
  const [modifyModalVis, setModifyModalVis] = useState<boolean>(false)
  const [foodToModify, setFoodToModify] = useState<Food>()



  if (isLoading) {
    return <p>loading</p>
  }

  if (error || !data) {
    return <p>unknown error occured</p>
  }


  const addFoodtoggle = () => {
    setViewAddFoodModal(prev => !prev)
    setModalWrapperVis(prev => !prev)

  }

  const modifyFoodsToggle = (food?: Food) => {
    if (food) {
      setFoodToModify(food)
    }
    setModifyModalVis(prev => !prev)
    setModalWrapperVis(prev => !prev)
  }
  return (
    <div>
      {viewAddFoodModal && <AddNewFoodModal toggle={addFoodtoggle} />}
      {foodToModify && modifyModalVis && <ModifyFoods food={foodToModify} toggle={modifyFoodsToggle} />}
      <button className='bg-blue-200 p-4 rounded-xl cursor-pointer hover:bg-blue-300'
        onClick={addFoodtoggle}
      >Add New Food</button>
      <div>
        {
          data.map(food => (
            <div key={`product_food-${food.id}`}
              className='w-full bg-gray-300 hover:bg-gray-200 p-2 flex'
            >
              <p>{food.name}</p>
              <p>{food.price}</p>
              <button className='ml-auto cursor-pointer'
                onClick={() => modifyFoodsToggle(food)}
              >
                <Edit />
              </button>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default Products
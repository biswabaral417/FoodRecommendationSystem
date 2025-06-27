import React, { useState } from 'react'
import { modifyFoodData } from '../../../../../Api/admin/modifyFoods'
import AddTags from '../components/AddTags'

const weatherTags: string[] = [
    'hot', 'cold', 'average',
    'dry', 'humid', 'normal',
]
const tags = ["vite", "React", "ts", "akjfna", "safm"]

const ModifyFoods: React.FC<{ food: Food ,toggle:(food?:Food)=>void}> = ({ food,toggle }) => {
    const [selTags, setSeltags] = useState<string[]>(food.tags)

    const [selWeatherTags, setSelWeathertags] = useState<string[]>(food.suitableWeatherTags)
    const [formData, setFormData] = useState<Food>(food);


    const handleModifyFood = async () => {
        if (
            !formData.name.trim() ||
            !formData.cuisine.trim() ||
            !formData.imageUrl?.trim() ||
            formData.calories === undefined ||
            formData.fat === undefined ||
            formData.protein === undefined ||
            formData.carbs === undefined ||
            formData.price === undefined ||
            selTags.length === 0 ||
            selWeatherTags.length === 0
        ) {
            alert("Please fill in all fields and select at least one tag and weather tag.");
            return;
        }

        const payload = {
            ...formData,
            id: food.id,
            calories: Number(formData.calories),
            fat: Number(formData.fat),
            protien: Number(formData.protein),
            carbs: Number(formData.carbs),
            price: Number(formData.price),
            tags: selTags,
            weatherTags: selWeatherTags,
        };

        await modifyFoodData(payload);
        toggle()

    };
    return (
        <div className={` bg-white p-4 rounded-xl   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   absolute z-10`}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='p-2 flex gap-[4px]'>
                    <label htmlFor="" className='w-[120px] '  >Product Name</label>
                    <input type="text" className='border-b  w-[200px] '
                        id=''
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder='' />
                </div>
                <div className='p-2 flex gap-[4px]'>
                    <label htmlFor="" className='w-[120px] '>Cuisine</label>
                    <input type="text"
                        className='border-b w-[200px]  '
                        id=''
                        placeholder=''
                        value={formData.cuisine}
                        onChange={(e) => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
                    />
                </div>
                <div className='p-2 flex gap-[4px]'>
                    <label htmlFor="" className='w-[120px] '> Calories </label>
                    <input type="text"
                        className='border-b  w-[200px] '
                        id=''
                        value={formData.calories}
                        onChange={(e) => setFormData(prev => ({ ...prev, calories: Number(e.target.value) }))}
                        placeholder='' />
                </div>
                <div className='p-2 flex gap-[4px]'>
                    <label htmlFor="" className='w-[120px] '> ImageUrl</label>
                    <input type="text"
                        className='border-b w-[200px]  '
                        id=''
                        value={formData.imageUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder='' />
                </div>
                <div className='p-2 flex gap-[4px]'>
                    <label htmlFor="" className='w-[120px] '>Fat</label>
                    <input type="text"
                        className='border-b w-[200px]  '
                        id=''
                        value={formData.fat}
                        onChange={(e) => setFormData(prev => ({ ...prev, fat: Number(e.target.value) }))}
                        placeholder='' />
                </div>
                <div className='p-2 flex gap-[4px]'>
                    <label htmlFor="" className='w-[120px] '>Protein</label>
                    <input type="text" className='border-b w-[200px]  ' id=''
                        value={formData.protein}
                        onChange={(e) => setFormData(prev => ({ ...prev, protein: Number(e.target.value) }))}
                        placeholder='' />
                </div>
                <div className='p-2 flex gap-[4px]'>
                    {/**lets creata a array input here */}
                    <label htmlFor="" className='w-[120px] '> Tags</label>
                    <AddTags tags={tags} value={selTags} setValue={setSeltags} />
                </div>
                <div className='p-2 flex gap-[4px]'>
                    {/**also here */}
                    <label htmlFor="" className='w-[120px] '> Weather Tags</label>
                    <AddTags tags={weatherTags} value={selWeatherTags} setValue={setSelWeathertags} />
                </div>
                <div className='p-2 flex gap-[4px]'>
                    <label htmlFor="" className='w-[120px] '> Carbs</label>
                    <input type="text"
                        className='border-b  w-[200px] '
                        id=''
                        value={formData.carbs}
                        onChange={(e) => setFormData(prev => ({ ...prev, carbs: Number(e.target.value) }))}
                        placeholder='' />
                </div>
                <div className='p-2 flex gap-[4px]'>
                    <label htmlFor="" className='w-[120px] '> Price</label>
                    <input type="text"
                        className='border-b  w-[200px] '
                        id=''
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                        placeholder='' />
                </div>
            </form>
            <div className="p-2 flex justify-evenly">
                <button className='bg-blue-500 text-white font-[700] p-2 rounded w-[80px]' onClick={handleModifyFood}>Save</button>
                <button className='bg-red-500 text-white font-[700] p-2 rounded w-[80px]' onClick={()=> toggle() }>Cancel</button>
            </div>
        </div>
    )
}

export default ModifyFoods
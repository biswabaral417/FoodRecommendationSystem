import React from 'react'
import { useState } from 'react';
import AddTags from '../components/AddTags';
import { tags, weatherTags } from '../components/tags';
import FileInput from '../../../../auth/signUp/components/FIleInput';
import { handleAddFood } from '../components/handleAddfood';


const AddNewFoodModal: React.FC<{ toggle: () => void }> = ({ toggle }) => {
    const formTextItems = [
        { label: 'Product Name', key: 'name', },
        { label: 'Cuisine', key: 'cuisine' }
    ]
    const formItems = [
        { label: 'Calories', key: 'calories' },
        { label: 'Fat', key: 'fat' },
        { label: 'Protein', key: 'protein' },
        { label: 'Carbs', key: 'carbs' },
        { label: 'Price', key: 'price' },
    ]
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        cuisine: '',
        calories: '',
        image: null,
        fat: '',
        protein: '',
        carbs: '',
        price: '',
    });
    const [selTags, setSeltags] = useState<string[]>([]);
    const [selWeatherTags, setSelWeathertags] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <div className="bg-white p-4 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <form onSubmit={e => e.preventDefault()}>
                <FileInput
                    label="Image"
                    onFileSelect={(image) => setFormData(prev => ({ ...prev, image: image }))}
                />
                {formTextItems.map(({ label, key }) => (
                    <div className='p-2 flex gap-[4px]' key={key}>
                        <label className='w-[120px]'>{label}</label>
                        <input
                            type="text"
                            name={key}
                            id={key}
                            className='border-b w-[200px]'
                            value={(formData as any)[key]}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}

                {formItems.map(({ label, key }) => (
                    <div className='p-2 flex gap-[4px]' key={key}>
                        <label className='w-[120px]'>{label}</label>
                        <input
                            type="text"
                            name={key}
                            id={key}
                            className='border-b w-[200px]'
                            value={(formData as any)[key]}
                            onChange={(e) => {
                                const value = e.target.value;
                                const numberPattern = /^-?\d*\.?\d*$/;
                                if (numberPattern.test(value)) {
                                    setFormData((prev) => ({
                                        ...prev,
                                        [key]: value === '' ? '' : value,
                                    }));
                                }
                            }}
                        />
                    </div>
                ))}
                <div className='p-2 flex gap-[4px]'>
                    <label className='w-[120px]'>Tags</label>
                    <AddTags tags={tags} value={selTags} setValue={setSeltags} />
                </div>

                <div className='p-2 flex gap-[4px]'>
                    <label className='w-[120px]'>Weather Tags</label>
                    <AddTags tags={weatherTags} value={selWeatherTags} setValue={setSelWeathertags} />
                </div>
                <div className="p-2 flex justify-evenly">
                    <button
                        className='bg-blue-500 text-white font-[700] p-2 rounded w-[80px]'
                        onClick={() => handleAddFood({ formData, toggle, selTags, selWeatherTags })}
                    >
                        Add
                    </button>
                    <button
                        className='bg-red-500 text-white font-[700] p-2 rounded w-[80px]'
                        onClick={toggle}
                    >
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    )
}

export default AddNewFoodModal
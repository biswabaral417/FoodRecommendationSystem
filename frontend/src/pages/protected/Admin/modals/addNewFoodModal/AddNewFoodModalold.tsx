import React, { useState } from 'react';
import { addFood } from '../../../../../Api/admin/addNewFood';
import AddTags from '../components/AddTags';
import FileInput from '../../../../auth/signUp/components/FIleInput';

const tags = ["vite", "React", "ts", "akjfna", "safm"];
const weatherTags = ['hot', 'cold', 'average', 'dry', 'humid', 'normal'];

type FormDataType = {
  name: string;
  cuisine: string;
  calories: string | undefined;
  image: File | null;
  fat: string | undefined;
  protein: string | undefined;
  carbs: string | undefined;
  price: string | undefined;
};

const AddNewFoodModal: React.FC<{ toggle: () => void }> = ({ toggle }) => {
  const [selTags, setSeltags] = useState<string[]>([]);
  const [selWeatherTags, setSelWeathertags] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    cuisine: '',
    calories: undefined,
    image: null,
    fat: undefined,
    protein: undefined,
    carbs: undefined,
    price: undefined,
  });

  const handleAddFood = async () => {
    const {
      name,
      cuisine,
      calories,
      fat,
      protein,
      carbs,
      price,
      image,
    } = formData;

    if (
      !name.trim() ||
      !cuisine.trim() ||
      !image ||
      calories === undefined ||
      fat === undefined ||
      protein === undefined ||
      carbs === undefined ||
      price === undefined ||
      selTags.length === 0 ||
      selWeatherTags.length === 0
    ) {
      alert("Please fill in all fields and select tags.");
      return;
    }

    const payload = {
      name,
      cuisine,
      calories: Number(calories),
      fat: Number(fat),
      protein: Number(protein),
      carbs: Number(carbs),
      price: Number(price),
      tags: selTags,
      weatherTags: selWeatherTags,
      imageFile: image,
    };

    try {
      await addFood(payload);
      toggle(); // Close modal or reset form
    } catch (err) {
      console.error(err);
      alert('Failed to add food');
    }
  };

  toggle();




  return (
    <div className="bg-white p-4 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <form onSubmit={(e) => e.preventDefault()}>
        {[
          { label: 'Product Name', key: 'name' },
          { label: 'Cuisine', key: 'cuisine' },
          { label: 'Calories', key: 'calories' },
          { label: 'Fat', key: 'fat' },
          { label: 'Protein', key: 'protein' },
          { label: 'Carbs', key: 'carbs' },
          { label: 'Price', key: 'price' },
        ].map(({ label, key }) => (
          <div className='p-2 flex gap-[4px]' key={key}>
            <label className='w-[120px]'>{label}</label>
            <input
              type="text"
              className='border-b w-[200px]'
              value={(formData as any)[key]}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
            />
          </div>
        ))}

        <div className='p-2 flex gap-[4px]'>
          <label className='w-[120px]'>Image</label>
          <FileInput
            label=""
            onFileSelect={(file) => setFormData(prev => ({ ...prev, image: file }))}
          />
        </div>

        <div className='p-2 flex gap-[4px]'>
          <label className='w-[120px]'>Tags</label>
          <AddTags tags={tags} value={selTags} setValue={setSeltags} />
        </div>

        <div className='p-2 flex gap-[4px]'>
          <label className='w-[120px]'>Weather Tags</label>
          <AddTags tags={weatherTags} value={selWeatherTags} setValue={setSelWeathertags} />
        </div>
      </form>

      <div className="p-2 flex justify-evenly">
        <button
          className='bg-blue-500 text-white font-[700] p-2 rounded w-[80px]'
          onClick={handleAddFood}
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
    </div>
  );
};

export default AddNewFoodModal;

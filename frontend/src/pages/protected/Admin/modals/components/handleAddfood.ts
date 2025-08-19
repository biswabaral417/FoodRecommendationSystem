import addFood from "../../../../../Api/admin/addNewFood";


type HandleAddFoodParams = {
  formData: FormDataType;
  toggle: () => void;
  selTags: string[];
  selWeatherTags: string[];
};

export const handleAddFood = ({ formData, toggle, selTags, selWeatherTags }: HandleAddFoodParams): void => {
  const { name, cuisine, calories, fat, protein, carbs, price, image } = formData;

  if (
    !name.trim() ||
    !cuisine.trim() ||
    !image ||
    !calories ||
    !fat ||
    !protein ||
    !carbs ||
    !price ||
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
    imageFile:image,
    tags: selTags,
    weatherTags: selWeatherTags,
  };

  // TODO: send `payload` to the backend
  console.log("Payload to submit:", payload);
  
  addFood(payload)
  toggle()


};

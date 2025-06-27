import React from 'react'
import { useAllFoods } from '../../../../Api/admin/useAllFoods';

const DashBoard = () => {
  const { data, isLoading, error } = useAllFoods();
  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error loading foods.</div>;

  return (
    <div className="font-[700]">
      {data.map((food) => (
        <div key={food.id}>{food.name}</div>
      ))}
    </div>
  );
};

export default DashBoard
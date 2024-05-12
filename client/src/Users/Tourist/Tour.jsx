import React from 'react';
import { useGetAllToursQuery } from '../../Services/Tour/tourApi';
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";

const TourList = () => {
  // Fetch tour data using the useGetAllToursQuery hook
const { setItem, getItem } = useLocalStorage("access_token");
const { setItem: setRefItem, getItem: getRefItem } = useLocalStorage("refresh_token");
const accessToken = getItem();
  const { data, error, isLoading } = useGetAllToursQuery({ });
  console.log(data);

  if (error) {
    console.error('Error fetching tours:', error);
    return <div>Error: {error.message}</div>;
  }

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Render tour data
  return (
    <div>
      <h1>Tour List</h1>
      <ul>
        {data.map(tour => (
          <li key={tour._id}>
            <h2>{tour.tourMaxSlots}</h2>
            <p>Description: {tour.tourInformation}</p>
            <p>Price: {tour.tourPrice}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourList;
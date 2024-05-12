import React from "react";
import {
  useGetAllToursQuery,
  useGetToursQuery,
} from "../../Services/Tour/tourApi";
import { useLocalStorage } from "../../Utils/useLocalStorage-Hook";
import Loader from "../../Utils/Loader";

const TourList = () => {
  // Fetch tour data using the useGetAllToursQuery hook

  const { setItem, getItem } = useLocalStorage("access_token");
  const { setItem: setRefItem, getItem: getRefItem } =
    useLocalStorage("refresh_token");
  const accessToken = getItem();

  const { data, isError, isLoading } = useGetToursQuery({});
  console.log(data);

  if (isError) {
    console.error("Error fetching tours:", isError);
  }

  // Handle loading and error states
  if (isLoading) return <Loader />;

  // Render tour data
  return (
    <div>
      <h1>Tour List</h1>;
      <ul>
        {data && data.tours.length > 0 ? (
          data.tours.map((tour) => (
            <li key={tour._id}>
              <h2>{tour.tourMaxSlots}</h2>
              <p>Description: {tour.tourInformation}</p>
              <p>Price: {tour.tourPrice}</p>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>{" "}
    </div>
  );
};

export default TourList;

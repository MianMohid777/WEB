import React from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const { data, isError, isLoading } = useGetToursQuery();

  if (isError) {
    console.error("Error fetching tours:", isError);
  }

  // Handle loading and error states
  if (isLoading) return <Loader />;

  // Handler
  const handleClick = (tour) => {
    const url = `/tour-info/${tour._id}`;

    navigate(url);
  };
  // Render tour data
  return (
    <div>
      <h1>Tour List</h1>;
      <ul>
        {data && data.tours.length > 0 ? (
          data.tours.map((tour) => (
            <li
              key={tour._id}
              onClick={() => {
                handleClick(tour);
              }}
              style={{ border: "1px solid black" }}
            >
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

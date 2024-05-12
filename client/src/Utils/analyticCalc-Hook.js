import { useSelector } from "react-redux";

export const useAnalytic = () => {
  const agency = useSelector((state) => state.agency);
  const tours = agency.allTours;

  //console.log(tours);

  const getToursSize = () => {
    return tours.length;
  };
  const getActiveTours = () => {
    return tours.filter((tour) => tour.tourStatus === "Active");
  };
  const getCompletedTours = () => {
    console.log(tours);
    return tours.filter((tour) => tour.tourStatus === "Completed");
  };

  const getCancelledTours = () => {
    return tours.filter((tour) => tour.tourStatus === "Cancelled");
  };

  const getUpcomingTours = () => {
    return tours.filter((tour) => tour.tourStatus === "Upcoming");
  };

  const getSearchedTours = (search, status) => {
    if (status === "All") {
      console.log(search);
      return tours.filter((tour) =>
        tour.tourLocationName
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      );
    } else if (status === "Past") {
      return tours.filter(
        (tour) =>
          (tour.tourStatus === "Completed" ||
            tour.tourStatus === "Cancelled") &&
          tour.tourLocationName
            .toLowerCase()
            .includes(search.trim().toLowerCase())
      );
    } else {
      return tours.filter(
        (tour) =>
          tour.tourStatus === status &&
          tour.tourLocationName
            .toLowerCase()
            .includes(search.trim().toLowerCase())
      );
    }
  };

  return {
    getToursSize,
    getActiveTours,
    getCompletedTours,
    getCancelledTours,
    getUpcomingTours,
    getSearchedTours,
  };
};

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
    return tours.filter((tour) => tour.tourStatus === "Completed");
  };

  const getCancelledTours = () => {
    return tours.filter((tour) => tour.tourStatus === "Cancelled");
  };

  const getUpcomingTours = () => {
    return tours.filter((tour) => tour.tourStatus === "Upcoming");
  };

  const getSearchedActiveTours = (search) => {
    return tours.filter(
      (tour) =>
        tour.tourStatus === "Active" && tour.tourLocationName.includes(search)
    );
  };

  return {
    getToursSize,
    getActiveTours,
    getCompletedTours,
    getCancelledTours,
    getUpcomingTours,
    getSearchedActiveTours,
  };
};

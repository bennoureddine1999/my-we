import react from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import NewHotel from "../newHotels/newhotels";

const New = () => {
  const history = useHistory();

  return (
    <>
      <button
        onClick={() => {
          history.push(`/Newhotel`);
        }}
      >
        Newhotels
      </button>
      <button
        onClick={() => {
          history.push(`/AppartementForRent_D`);
        }}
      >
        Appartement for rent D
      </button>
      <button
        onClick={() => {
          history.push(`/AppartementForRent_M`);
        }}
      >
        Appartement for rent M
      </button>
      <button
        onClick={() => {
          history.push(`/Appartement_for_sale`);
        }}
      >
        Appartement for sale
      </button>
    </>
  );
};
export default New;

import {useState, useContext, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

import styles from "./Spacecraft.module.css";
import {LoadingContext} from "../../context/LoadingProvider.jsx";
import SpaceTravelApi from "../../services/SpaceTravelApi.js";

function Spacecraft () {
  const {id} = useParams()
  const [spacecraft, setSpacecraft] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const {enableLoading, disableLoading} = useContext(LoadingContext);   
   
useEffect(() => {
  async function runGetSpacecraft() {
    enableLoading();
    const { data, isError } = await SpaceTravelApi.getSpacecraftById({ id });
    if (!isError) {
      setSpacecraft(data);
    } else {
      // handle error (e.g., setErrors or show a message)
      console.error("Failed to fetch spacecraft:", data);
      setErrors(data.errors || ["An error occurred while fetching the spacecraft."]);
      navigate("/spacecrafts");
    }
    disableLoading();
  }
  runGetSpacecraft();
}, [id, enableLoading, disableLoading]);

  return (
    <div className={styles["spacecraft"]}>
      <button
        className={styles["button__back"]}
        onClick={() => navigate("/spacecrafts")}
      >
        Back 👈
      </button>
      <div className={styles["spacecraft__details"]}>
        <h2 className={styles["spacecraft__name"]}>{spacecraft.name}</h2>
        <img className={styles["spacecraft__picture"]} src={spacecraft.pictureUrl} alt={spacecraft.name} />
        <p className={styles["capacity"]}>Capacity: {spacecraft.capacity}</p>
        <p className={styles["spacecraft_D"]}>Description: {spacecraft.description}</p>
      </div>
      {errors.length > 0 && (
        <div className={styles["error__container"]}>
          {errors.map((error, index) => (
            <p key={index} className={styles["error__message"]}>{error}</p>
          ))}
        </div>
      )}
    </div>
    
  );
}
export default Spacecraft;

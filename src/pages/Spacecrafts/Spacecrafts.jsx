import {useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import styles from "./Spacecrafts.module.css";
import {LoadingContext} from "../../context/LoadingProvider.jsx";
import SpaceTravelApi from "../../services/SpaceTravelApi.js";

function Spacecrafts ()
{
  // State to hold the list of spacecrafts
  // and the loading state
  
  const [spacecrafts, setSpacecrafts] = useState([]);
  const {enableLoading, disableLoading} = useContext(LoadingContext);
 
  async function getSpacecrafts ()
  {
    // todo get spacecrafts using the API
    const {data, isError} = await SpaceTravelApi.getSpacecrafts();
    if (!isError)
    {
      setSpacecrafts(data);
    }
    else
    {
      // todo handle error (e.g., show a message to the user)
      console.error("Failed to fetch spacecrafts:", data);
    } 
  }


  useEffect(() =>
            {
              async function runGetSpacecrafts ()
              {
                enableLoading();
                await getSpacecrafts();
                disableLoading();
              }

              runGetSpacecrafts();
            },
            [enableLoading, disableLoading]
  );

  const navigate = useNavigate();

  function handleClickOfBuild ()
  {
    // todo navigate to build spacecraft page
    navigate("/spacecraft/build");
    
  }

  function handleClickOfImageContainer (event, id)
  {
    navigate(`/spacecraft/${id}`);
  }

  async function handleClickOfDestroy (event, id)
  {
    enableLoading();
    const {isError} = await SpaceTravelApi.destroySpacecraftById({id});
    if (!isError)
    {
      await getSpacecrafts();
    }
    disableLoading();
  }

  return (
    <div>
      <button onClick={handleClickOfBuild}>
        🏗 Build a Spacecraft
      </button>
        {
          spacecrafts.map(
            (spacecraft, index) =>
              <div
                key={spacecraft.id}
                className={styles["spacecraft"]}
              >
                <div
                  className={styles["spacecraft__imageContainer"]}
                  onClick={(event) => handleClickOfImageContainer(event, spacecraft.id)}
                >
                  {
                    spacecraft.pictureUrl
                    ?
                    <img
                      src={spacecraft.pictureUrl}
                      alt={`The spacecraft ${spacecraft.name}`}
                      className={styles["spacecraft__image"]}
                    />
                    :
                    <span className={styles["spacecraft__image--default"]}>🚀</span>
                  }
                </div>

                <div className={styles["spacecraft__infoContainer"]}>
                  <div className={styles["spacecraft__info"]}>
                    <span>Name:</span>
                    <span>{spacecraft.name}</span>
                  </div>

                  <div className={styles["spacecraft__info"]}>
                    <span>Capacity:</span>
                    <span>{spacecraft.capacity}</span>
                  </div>
                </div>

                <div className={styles["spacecraft__description"]}>
                  <span>Description:</span>
                  <span>{spacecraft.description}</span>
                </div>

                <div>
                  <button onClick={(event) => handleClickOfDestroy(event, spacecraft.id)}>💥 Destroy</button>
                </div>
              </div>
          )
        }
      </div>
  );
}

export default Spacecrafts;

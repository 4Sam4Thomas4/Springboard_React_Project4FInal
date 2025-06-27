import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Planets.module.css";
import {LoadingContext} from "../../context/LoadingProvider.jsx";
import SpaceTravelApi from "../../services/SpaceTravelApi.js";

function Planets ()
{
  const [planetsWithSpacecrafts, setPlanetsWithSpacecrafts] = useState([]);
  const {isLoading, enableLoading, disableLoading} = useContext(LoadingContext);
  const [selectedPlanetId, setSelectedPlanetId] = useState();
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState();

  async function getPlanetsWithSpacecrafts ()
  {
    const {data: planets, isError: isErrorPlanets} = await SpaceTravelApi.getPlanets();
    const {data: spacecrafts, isError: isErrorSpacecrafts} = await SpaceTravelApi.getSpacecrafts();

    if (!isErrorPlanets && !isErrorSpacecrafts)
    {
      // todo fill planets.spacecrafts with spacecrafts
      planets.forEach((planet) => {
        planet.spacecrafts = spacecrafts.filter(
          (spacecraft) => String(spacecraft.currentLocation) === String(planet.id)
        );
      });

      setPlanetsWithSpacecrafts(planets);
      
    }
  }

  useEffect(() =>
            {
              async function runGetPlanetsWithSpacecrafts ()
              {
                enableLoading();
                await getPlanetsWithSpacecrafts();
                disableLoading();
              }

              runGetPlanetsWithSpacecrafts();
            },
            [enableLoading, disableLoading]
  );

  function handleClickOfPlanet (event, id)
  {
    // todo set the selected planet
    setSelectedPlanetId(id);
    setSelectedSpacecraftId(undefined); // Reset selected spacecraft when a planet is selected
    // todo call getPlanetsWithSpacecrafts to refresh the page content
    getPlanetsWithSpacecrafts();
    
  }

  async function handleClickOfSpacecraft (event, spacecraftId, planetId)
  {
    // todo set the selected spacecraft
    setSelectedSpacecraftId(spacecraftId);
  

  // Only send if a planet is selected and it's not the current location
  if (selectedPlanetId && selectedPlanetId !== planetId) {
    enableLoading();
    await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId: selectedPlanetId
    });
    await getPlanetsWithSpacecrafts();
    disableLoading();
  }
}

  return (
    <>
    <h1 className={styles["title"]}>Planets: If you want to move a spaceship to a planet, first select the planet, it will turn red. Then select the starship to move. </h1>
    <h3 className={styles["theH3"]}>Planets have populations</h3>
    <h3 className={styles["theH3"]}>Spaceships have capacity values</h3>

      {
        planetsWithSpacecrafts.map(
          (planet, index) =>
            <div
              key={index}
              className={styles["planetWithSpacecrafts"]}
            >
              <div
                className={`${styles["planet"]} ${selectedPlanetId === planet.id && styles["planet--selected"]}`}
                onClick={(event) => handleClickOfPlanet(event, planet.id)}
              >
                <div className={styles["planet__imageContainer"]}>
                  <img
                    src={planet.pictureUrl}
                    alt={`The planet ${planet.name}`}
                    className={styles["planet__image"]}
                  />
                </div>

                <div className={styles["planet__info"]}>
                  <div>{planet.name}</div>
                  <div>{planet.currentPopulation}</div>
                </div>
              </div>

              <div className={styles["planet__spacecrafts"]}>
                {
                  planet.spacecrafts.map((spacecraft, index) =>
                                           <div
                                             key={index}
                                             className={`${styles["planet__spacecraft"]} ${selectedSpacecraftId === spacecraft.id && styles["planet__spacecraft--selected"]}`}
                                             onClick={(event) => handleClickOfSpacecraft(event, spacecraft.id, planet.id)}
                                           >
                                             <div className={styles["planet__spacecraft__imageContainer"]}>
                                               {
                                                 spacecraft.pictureUrl
                                                 ?
                                                 <img
                                                   src={spacecraft.pictureUrl}
                                                   alt={`The spacecraft ${spacecraft.name}`}
                                                   className={styles["planet__spacecraft__image"]}
                                                 />
                                                 :
                                                 <span className={styles["planet__spacecraft__image--default"]}>🚀</span>
                                               }

                                             </div>
                                             <div className={styles["planet__spacecraft__info"]}>
                                               <div>{spacecraft.name}</div>
                                               <div>{spacecraft.capacity}</div>
                                             </div>
                                           </div>
                  )
                }
              </div>
            </div>
        )
      }
    </>
  );
}

export default Planets;

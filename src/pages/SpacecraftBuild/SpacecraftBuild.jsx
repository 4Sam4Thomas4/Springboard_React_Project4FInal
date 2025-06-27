import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./SpacecraftBuild.module.css";
import {LoadingContext} from "../../context/LoadingProvider.jsx";
import SpaceTravelApi from "../../services/SpaceTravelApi.js";

function SpacecraftBuild ()
{
  const INITIAL_SPACECRAFT = {
    name: "",
    capacity: "",
    description: "",
    pictureUrl: ""
  };
  const [spacecraft, setSpacecraft] = useState(INITIAL_SPACECRAFT);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const {enableLoading, disableLoading} = useContext(LoadingContext);

  function handleChangeOfFormInput (event)
  {
    // todo update form state
    const {name, value} = event.target;
    setSpacecraft((prevSpacecraft) => ({
      ...prevSpacecraft,
      [name]: value
    }));
    setErrors([]); 
  }

  async function handleSubmitOfForm (event)
  {
    // todo submit the form using the API
    event.preventDefault();
    enableLoading();
    const {data, isError} = await SpaceTravelApi.buildSpacecraft(spacecraft);
    disableLoading();
    if (!isError)
    {
      // todo navigate to the spacecrafts page
      navigate("/spacecrafts");
    }
    else
    {
      // todo handle error (e.g., show a message to the user)
      console.error("Failed to build spacecraft:", data);
      setErrors(data.errors || ["An error occurred while building the spacecraft."]);
    }
    setSpacecraft(INITIAL_SPACECRAFT);

  }

  function handleClickOfBack (event)
  {
    // todo navigate back
    event.preventDefault();
    navigate("/spacecrafts"); 
  }

  return (
    <>
      <button
        className={styles["button__back"]}
        onClick={handleClickOfBack}
      >
        Back 👈
      </button>
      <div>
        <form onSubmit={handleSubmitOfForm}>
          <div className={styles["form"]}>
            <div className={styles["form__inputs"]}>
              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={spacecraft.name}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="capacity"
                  placeholder="Capacity"
                  value={spacecraft.capacity}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={spacecraft.description}
                  onChange={handleChangeOfFormInput}
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="pictureUrl"
                  placeholder="Picture URL"
                  value={spacecraft.pictureUrl}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles["submitContainer"]}>
              <div className={styles["errorContainer"]}>
                {
                  errors.map((error, index) => <div
                    key={index}
                    className={styles["error"]}
                  >{error}</div>)
                }
              </div>

              <div className={styles["button__submit"]}>
                <button
                  type="submit"
                  onClick={handleSubmitOfForm}
                >
                  Build 🏗️
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SpacecraftBuild;

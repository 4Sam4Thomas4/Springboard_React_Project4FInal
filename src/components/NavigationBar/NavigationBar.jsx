import {NavLink} from "react-router-dom";

import styles from "./NavigationBar.module.css";

function NavigationBar ()
{
	return (
		<nav className={styles["navigationBar"]}>
		<ul className={styles["navigationBar__list"]}>
			<li className={styles["navigationBar__item"]}>
			<NavLink
				to="/"
				className={({isActive}) => isActive ? styles["navigationBar__link--active"] : styles["navigationBar__link"]}
			>
				Home
			</NavLink>
			</li>
			<li className={styles["navigationBar__item"]}>
			<NavLink
				to="/spacecrafts"
				className={({isActive}) => isActive ? styles["navigationBar__link--active"] : styles["navigationBar__link"]}
			>
				Spacecrafts
			</NavLink>
			</li>
			<li className={styles["navigationBar__item"]}>
			<NavLink
				to="/planets"
				className={({isActive}) => isActive ? styles["navigationBar__link--active"] : styles["navigationBar__link"]}
			>
				Planets
			</NavLink>
			</li>
		</ul>
		</nav>
	);
}

export default NavigationBar;

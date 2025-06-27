import styles from "./Home.module.css";

function Home ()
{
	return (
        <>

            <div className={styles["home"]}>
                <h2 className={styles["home__title"]}>Space Travel: Expanding Horizons Beyond Earth</h2>
            </div>

            <div className={styles["Journy__container"]}>
			
				<h3><span className={styles["motto__emojis"]}>🌎</span>Journey into the Future</h3>
			</div>
				<div> <p className={styles["home__text"]}>
					In a world where the impossible has become reality, where the stars are no longer out of reach, welcome to the future of humanity's journey into the cosmos. Here, we embark on a voyage that transcends the boundaries of Earth, exploring the vastness of space with cutting-edge spacecraft and innovative technology. Our mission is to connect planets, foster interstellar communities, and pave the way for a new era of exploration and discovery.
					</p>
        </div>
		          <div className={styles["Journy__container"]}>
			<div>
				<h3><span className={styles["motto__emojis"]}>🚀</span>From Neglect to Innovation</h3>
			</div>
			
				<p className={styles["home__text"]}>
					Once the cradel of civilization, Earth now stands as a solemn reminder of the consequences of neglect and environmental decline. But fear not, for the ingenuity of mankind has soared to new heights. With our relentless pursuit of advancement, we have not only healed our scars but extended our reach across the cosmos</p>
        </div> 


		          <div className={styles["Journy__container"]}>
			<div>
				<h3><span className={styles["motto__emojis"]}>🪐</span>Enter Space Travel: Where Dreams Take Flight</h3>
			</div>
				<p className={styles["home__text"]}>
					Embark on an extraordinary journey with our groundbreaking web application, aptly named "Space Travel." As a commander engineer, the fate of humanity's exodus rests in your capable hands. Prepare to face the ultimate challenge: evacuating humankind from their birthplace and guiding them towards a future among the stars.</p>
        </div>

		
		          <div className={styles["Journy__container"]}>
			<div>
				<h3><span className={styles["motto__emojis"]}>🧑‍🚀</span>Engineer, Explorer, Leader</h3>
			</div>
				<p className={styles["home__text"]}>
					Space Travel empowers you to engineer, design, and even dismantle spacecraft. Craft vessels that defy the boundaries of imaginination, envisioning a future where life flourishes beyond the starts. But remember, your role extends beyond construction - you are a leader, an explorere, a commander steering humanities destiny</p>
        </div>
		</>
		
	);
}

export default Home;

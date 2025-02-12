import Link from "next/link";
import styles from "../styles/index.module.css";

export default function accueil() {
  return (
    <div className={styles.container}>
      <div className={styles.bloc1}>
        <img
          className={styles.image}
          src="https://s3-alpha-sig.figma.com/img/8db1/810d/97cfd895c807667492d0ce1af8e5c166?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H6KjXDUZd3BRqbMhxK8ZsQkuqOueyZXeoI1z6YChJldqZLxFD14XRLXNFGnpfWMNdhsxq2nvfuv5ieNW0nhm2vgL9qpYtc5-G9gf4gf2vUvWZl4nM1xtAiPOR9pWlsiv-6K3IbI146YRBynDlYCZFO9G5-NeGsC8TfNsM8Aey4WAXd2NZ631DpR4AGEfOSaSJU-IPoZPL60s52Q1aeAcqU70FGUcorQ4H76nNH-jL530xeusSVr4rLdzDy5M4bshdUzv0KuqAlEyAeNL1dX-n6sERgkHIT5rgSCa0FYTyIvOFRk4iEJ4PUJEqkT5ZnNLPSxVZEUH7DOGcHrdczqvJQ__"
        />
        <div className={styles.test}>
          <img className={styles.logo_nav} src="logo.png" />
          <Link href="./chatbot" className={styles.Link}>
            <h2>Chatbot</h2>
          </Link>
        </div>
        <div className={styles.presentation}>
          <img className={styles.logo} src="logo.png" />
          <h1 className={styles.short_description}>
            Transformez vos recrutements avec notre IA innovante :
          </h1>
          <p className={styles.short_description1}>
            Identifiez les soft skills des candidats grâce à notre chatbot
            interactif et obtenez des statistiques en un clin d'œil.
          </p>
        </div>
      </div>
      <div className={styles.bloc3}>
        <h1 className={styles.title_decouvrir}>Découverte</h1>
        <p className={styles.long_description}>
          Bienvenue sur WorkWise, une plateforme innovante dédiée à la
          révolution du recrutement grâce à l'intelligence artificielle.
        </p>
        <p className={styles.long_description}>
          Nous sommes fiers de vous présenter un outil novateur conçu pour
          simplifier et optimiser le processus de recrutement en mettant en
          avant les compétences comportementales, souvent appelées "soft
          skills", des candidats.
        </p>
        <p className={styles.long_description}>
          À travers un chatbot interactif et intelligent, notre plateforme
          permet d'analyser les réponses des candidats et de fournir des
          statistiques détaillées, offrant ainsi une vision claire des
          compétences comportementales de chaque individu.
        </p>
        <p className={styles.long_description}>
          Notre mission est de fournir aux recruteurs un allié puissant dans
          leur quête des talents les plus adaptés à leurs besoins spécifiques.
          Grâce à notre technologie de pointe, les recruteurs peuvent désormais
          prendre des décisions éclairées, tout en gagnant un temps précieux
          dans leur processus de sélection.
        </p>
        <p className={styles.long_description}>
          Que vous soyez une entreprise à la recherche du candidat idéal ou un
          professionnel désireux de mettre en valeur vos compétences, WorkWise
          est là pour vous accompagner dans cette démarche.{" "}
        </p>
        <p className={styles.long_description}>
          Explorez dès maintenant notre plateforme et découvrez comment
          l'intelligence artificielle peut révolutionner votre façon d'aborder
          le recrutement.
        </p>
        <Link href="./chatbot">
          <button className={styles.decouvrir}>Essayer</button>
        </Link>
        <img className={styles.pro} src="image_pro.png" />
      </div>
    </div>
  );
}

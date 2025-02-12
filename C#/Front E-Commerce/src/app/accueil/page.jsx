'use client'

import { Link } from 'react-scroll'
import Header from '../components/Header'
import HeroStyles from '../styles/HeroSection.module.css'
import AboutStyles from '../styles/About.module.css'
import TestimonialStyles from '../styles/Testimonial.module.css'
import QualityStyles from '../styles/Quality.module.css'
import { FaQuoteLeft } from 'react-icons/fa'
import Footer from '../components/Footer'
import SocialLinks from '../components/SocialLinks'
import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const propositions = [
  { title: "Crêpe Bana' Fraise", image: '/crepe1.png', price: 6.5 },
  { title: 'Crêpe Saumon', image: '/crepe2.png', price: 7.5 },
  { title: 'Blueberry Punch', image: '/smoothie.png', price: 3.9 },
  { title: "Milkshake Choco'Choc", image: '/milkshake.png', price: 3.9 },
  { title: 'Bubbletea Brown Sugar', image: '/bubbletea.png', price: 5.0 }
]

const testimonials = [
  { name: 'Mathilde Dupont', testimonial: 'Les crêpes sont divines, un vrai régal !' },
  { name: 'Pierre Lefebvre', testimonial: 'Les bubble teas sont délicieux, un large choix de saveurs.' },
  { name: 'Charlotte Martin', testimonial: 'Service rapide et efficace, les crêpes sont toujours fraîches.' },
  {
    name: 'Alexandre Dubois',
    testimonial: "J'ai été impressionné par la qualité des crêpes, un vrai plaisir à déguster."
  },
  { name: 'Emma Leroy', testimonial: "Les bubble teas sont vraiment rafraîchissants, parfait pour l'été." },
  { name: 'Lucas Moreau', testimonial: 'Une ambiance chaleureuse et des crêpes délicieuses, que demander de plus ?' },
  { name: 'Hugo Girard', testimonial: 'Les bubble teas sont bien préparés, avec des perles bien moelleuses.' },
  { name: 'Camille Rousseau', testimonial: 'Les crêpes sont généreusement garnies, un vrai festin pour les papilles.' },
  { name: 'Léa André', testimonial: 'Une belle découverte, les crêpes sont excellentes et le service impeccable.' }
]

export default function Main() {
  const [userData, setUserData] = useState(null)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [arePropositionsVisible, setArePropositionsVisible] = useState(false)
  const aboutRef = useRef(null)
  const aboutControls = useAnimation()
  const propositionsControls = useAnimation()
  const { ref: aboutInViewRef, inView: aboutInView } = useInView()
  const { inView: propositionsInView } = useInView()

  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  useEffect(() => {
    if (isAboutVisible) {
      aboutControls.start({ opacity: 1, y: 0 })
    }
  }, [isAboutVisible, aboutControls])

  useEffect(() => {
    if (aboutInView) {
      setIsAboutVisible(true)
    }
  }, [aboutInView])

  useEffect(() => {
    if (arePropositionsVisible) {
      propositionsControls.start({ opacity: 1, x: 0 })
    }
  }, [arePropositionsVisible, propositionsControls])

  useEffect(() => {
    if (propositionsInView) {
      setArePropositionsVisible(true)
    }
  }, [propositionsInView])

  const [isPropositionsVisible, setIsPropositionsVisible] = useState(false)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      setIsPropositionsVisible(true)
    }
  }, [inView])

  const handleAddPanier = async (product) => {
    const commande = {
      productName: product.title,
      unitPrice: product.price.toFixed(2),
      quantity: 1,
      totalPrice: product.price.toFixed(2)
    }

    console.log(commande)

    try {
      const response = await fetch('http://172.16.27.166:7777/api/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commande)
      })

      if (response.ok) {
        console.log('Commande ajoutée avec succès')
      } else {
        console.error("Erreur lors de l'ajout de la commande")
      }
    } catch (error) {
      console.error('Erreur lors de la communication avec le serveur', error)
    }
  }

  return (
    <div>
      <Header />
      <SocialLinks />
      <motion.section className={HeroStyles.hero}>
        <div className={HeroStyles.container}>
          <div className={HeroStyles.hero_content}>
            <motion.div
              className={HeroStyles.slogan}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            >
              <h1>
                Bienvenue à la <span style={{ color: '#AD8959' }}> La Whippinade </span>
                <br /> Ivry Sur Seine
              </h1>
              <p>
                Succombez à une explosion de saveurs avec nos délicieuses crêpes où chaque bouchée vous fait rêver !
              </p>
              <Link to="about" smooth={true} duration={400}>
                <button>Learn More</button>
              </Link>
            </motion.div>
            <motion.div
              className={HeroStyles.hero_image}
              initial={{ opacity: 0, x: '100%', rotate: -90 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            >
              <img src="/hero-food.png" alt="Image de crêpe" className={HeroStyles.hero_image} />
            </motion.div>
          </div>
        </div>
      </motion.section>
      <section
        id="about"
        ref={aboutRef}
        className={AboutStyles.aboutUs}
        style={{ backgroundImage: `url('/about-bg.png')` }}
      >
        <div className={AboutStyles.overlay}>
          <motion.div
            ref={aboutInViewRef}
            className={AboutStyles.container}
            initial={{ opacity: 0, y: 50 }}
            animate={aboutControls}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
          >
            <div className={AboutStyles.aboutUsContent}>
              <h2>Qui sommes-nous ?</h2>
              <h3>Nous sommes plus qu'une crêperie !</h3>
              <p>
                Nous travaillons différemment, nous préparons vos crêpes avec amour, et c'est pour cette raison que vous
                appréciez <strong>La Whippinade</strong>. Non seulement la crêpe est personnalisable, mais également
                votre dessert.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <section className={QualityStyles.qualitySection}>
        <div className={QualityStyles.qualityContainer}>
          <div className={QualityStyles.qualityItem}>
            <img src="/medal.svg" alt="Meilleure Qualité" />
            <p>Meilleure Qualité !</p>
          </div>
          <div className={QualityStyles.qualityItem}>
            <img src="/order.svg" alt="Facile à Commander" />
            <p>Facile à Commander !</p>
          </div>
          <div className={QualityStyles.qualityItem}>
            <img src="/delivery.svg" alt="Rapide à Livrer" />
            <p>Rapide à Livrer !</p>
          </div>
        </div>
      </section>

      <section className={TestimonialStyles.testimonialSection}>
        <h1>Avis de nos clients !</h1>
        <div className={TestimonialStyles.testimonialContainer}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={TestimonialStyles.testimonial}>
              <FaQuoteLeft className={TestimonialStyles.quoteIcon} />
              <h2>{testimonial.testimonial}</h2>
              <p>- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

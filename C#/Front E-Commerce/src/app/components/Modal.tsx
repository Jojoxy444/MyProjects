import React from 'react'
import styles from '../styles/Modal.module.css'

export default function Modal({
  isOpen,
  setIsOpen,
  children
}: {
  isOpen: boolean
  setIsOpen: () => void
  children: React.ReactNode
}) {
  return isOpen ? (
    <div className={styles.containerModal}>
      <div className={styles.Modalpop}>
        <button onClick={setIsOpen} className={styles.closeButton}>
          X
        </button>
        <div className={styles.bottomButtons}>
          <button className={styles.leftButton}>Annuler</button>
          <button className={styles.rightButton}>Validez</button>
        </div>
        {children}
      </div>
    </div>
  ) : null
}

import React from 'react';
import Cards from '../comp/Cards'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  return (
    <>
    
    <div>
      
      <h1 className = {styles.title} id = "home">Greetings, this is my technical assessment</h1>
      <p className = {styles.text}>Please feel free to take a look around</p>
      <Cards/>
      
    </div>
    </>
  )
}
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Cards = () => {
    return ( 
        <div className = {styles.cardsContainer}>
        
        <div className = {styles.pairContainer}>
          <Link href="/about"  className = {styles.card}>
            <p onClick className = {styles.header}>About Me</p>
            <p>Learn a bit more about me, who I am, and how I got to where I am now</p>
          </Link>
          
          <Link href="/projects"  className = {styles.card}>
            <p onClick className = {styles.header}>My Projects</p>
            <p>Explore the projects I have developed</p>
          </Link>
        </div>
        <div className = {styles.pairContainer}>
          <Link href="/experience"  className = {styles.card}>
            <p onClick className = {styles.header}>My Experience</p>
            <p>Check out my professional and volunteer experiences within and beyond software development</p>
          </Link>
          <Link href="/funFacts"  className = {styles.card}>
            <p onClick className = {styles.header}>Fun Facts</p>
            <p>Get to know me better with some lighthearted fun facts</p>
          </Link>
        </div>

      </div>
     );
}
 
export default Cards;
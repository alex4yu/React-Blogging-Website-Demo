import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/serverAccess.module.css";


function ServerAccess(){
    const [data, setData] = useState(null);
    const [url, setUrl] = useState("");

    useEffect(() => {
      fetchData();
    }, [url]);
  
    const fetchData = async () => {
        console.log("fetching data");
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }; 

    return(
        <>
        <div>Click the two endpoint boxes to see data stored in each api endpoint</div>
        <div className={styles.boxContainer}>
            <div className={styles.box} onClick={() => setUrl("http://localhost:4000/api/data")}>endpoint 1</div>
            <div className={styles.box} onClick={() => setUrl("http://localhost:4000/api/data2")}>endpoint 2</div>
        </div>
        <div>Data:</div>
        <div id = "display" className={styles.display}>{data ?(data.message):("")}</div>
        
        </>
    );
}

export default ServerAccess;
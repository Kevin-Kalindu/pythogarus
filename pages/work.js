import styles from '../styles/Land.module.css'
import Header from '../components/Header'

function Work(){
    return(
        <div className={styles.main}>
             <header className=''>
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
          </header>
            <Header page={'Work'}/>
            <div className={styles.section1}>
                <p>This is the work page display all the works here</p>
            </div>
        </div>
    )
}

export default Work
import Header from '../components/Header'
import styles from '../styles/Land.module.css'
import Image from 'next/image'
import Moon from './images/moon.png'
import Stars from './images/stars.png'
import MountainBehind from './images/mountains_behind.png'
import MountainFront from './images/mountains_front.png'
import {useRouter} from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtoms'

function index(){
    const date = new Date()
    const yyyy = date.getFullYear()
    const next = yyyy -1
    const year = String(yyyy)
    const next_year = String(next)
    const router = useRouter()
    const [open, setOpen] = useRecoilState(modalState)
    return(
        <div className={styles.main}>
            <header>
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
            </header>
            <div className={styles.body}>
                <Header page={'Home'}/>
                <section className={styles.section}>
                    <Image className={styles.img}  src={Stars} id='stars'/>
                    <Image className={styles.imgMoon}  src={Moon} id='moon'/>
                    <Image className={styles.img}  src={MountainBehind} id='mountainb'/>
                    <h2 className={styles.text}>Welcome Home</h2>
                    <div className='z-30 flex gap-4'>
                    <button className={styles.btn} onClick={() => {
                        setOpen(next_year)
                        router.push('./main')
                    }}>{next_year}</button>
                    <button className={styles.btn} onClick={() => {
                        setOpen(year)
                        router.push('./main')
                    }}>{year}</button>
                    </div>
                    <Image className={styles.imgfront} src={MountainFront}/>
                </section>
            </div>
        </div>
    )
}

export default index

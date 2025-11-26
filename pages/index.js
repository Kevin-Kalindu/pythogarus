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
import { useState } from 'react'

function Index() {
    const date = new Date()
    const currentYear = date.getFullYear()
    const startYear = 2022
    const year = String(currentYear)

    const router = useRouter()
    const [open, setOpen] = useRecoilState(modalState)
    const [selectedYear, setSelectedYear] = useState(String(currentYear))

    // Generate year options array
    const years = []
    for(let y = startYear; y <= currentYear; y++) {
        years.push(String(y))
    }

    const handleGoClick = () => {
        setOpen(selectedYear)
        sessionStorage.setItem("year", selectedYear)
        router.push('./main')
    }

    return (
        <div className={styles.main}>
            <header>
                <title>Pythogarus</title>
                <script src="../components/script.js"></script>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2318083812487394"
                    crossOrigin="anonymous"></script>
            </header>
            <div className={styles.body}>
                <Header page={'Home'} />
                <section className={styles.section}>
                    <Image className={styles.img} src={Stars} id='stars' />
                    <Image className={styles.imgMoon} src={Moon} id='moon' />
                    <Image className={styles.img} src={MountainBehind} id='mountainb' />
                    <h2 className={styles.text}>Welcome Home</h2>
                    <div className='z-30 flex gap-4 items-center'>
                        <select
                            className={styles.btn}
                            value={selectedYear}
                            onChange={(e) => {setSelectedYear(e.target.value)
                            sessionStorage.setItem("year", year)}
                            }
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <button className={styles.btn} onClick={handleGoClick}>Go</button>
                    </div>
                    <Image className={styles.imgfront} src={MountainFront} />
                </section>
            </div>
        </div>
    )
}

export default Index

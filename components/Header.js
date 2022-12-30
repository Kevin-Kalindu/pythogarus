import { useRouter } from "next/router"
import styles from '../styles/Land.module.css'

function Header({page}){
    const router = useRouter()

    function Icons({name,re}){
        return(
            <li><a className={`${page===name ? 'bg-white':'text-white'}`} onClick={() => {router.push(re)}}>{name}</a></li>
        )
    }
   return(
    <header className={styles.header}>
    <a href="#" className={styles.logo}>Logo</a>
    <ul className={styles.ul}>
        <Icons name='Home' re='./'/>
        <Icons name='About' re='./about'/>
        <Icons name='Work' re='./work'/>
        <Icons name='Privacy' re='./privacy'/>
    </ul>
</header>
   )
}

export default Header
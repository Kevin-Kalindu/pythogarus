import styles from '../styles/Loading.module.css'

function Loading(){
    return(
        <div className={styles.body}>
        <div className={styles.loader}>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
            <div className={styles.item}></div>
        </div>
        </div>
    )
}

export default Loading
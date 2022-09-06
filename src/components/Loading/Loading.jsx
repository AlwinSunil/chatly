import React from "react"
import styles from "./Loading.module.scss"

function Loading(props) {
    console.log(props)
    return (
        <div className={styles.loading}>
            <div className={styles.loading__fade}>
                <div
                    className={`${styles.loading__circle} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle2} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle3} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle4} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle5} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle6} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle7} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle8} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle9} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle10} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle11} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle12} ${styles.loading__circle}`}
                ></div>
                <div
                    className={`${styles.loading__circle13} ${styles.loading__circle}`}
                ></div>
            </div>
            {props.child}
        </div>
    )
}

export default Loading

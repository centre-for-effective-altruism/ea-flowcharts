/**
*
* Loading
*
*/

import React from 'react';

import styles from './styles.css';

function Loading() {
    return (
        <div className={styles.loading}>
            <p className={styles.loadingText}>Loading...</p>
        </div>
    );
}

export default Loading;

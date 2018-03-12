import React from 'react';
import PropTypes from 'prop-types';
// import styles from './style.css';

Header.propTypes = {
    content: PropTypes.node,
    onBackClick: PropTypes.func,
};

const styles = {};

export default function Header({ content, onBackClick }) {
    return (
        <header className={styles.container}>
            {onBackClick && (
                <button className={styles.backButton} onClick={onBackClick}>
                    Back
                </button>
            )}
            {content}
        </header>
    );
}

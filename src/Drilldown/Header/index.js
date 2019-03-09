import React from 'react';
import PropTypes from 'prop-types';

Header.propTypes = {
    content: PropTypes.node,
    onBackClick: PropTypes.func,
};

export default function Header({ content, onBackClick }) {
    return (
        <header className="Rdd-Header-container">
            {onBackClick && (
                <button className="Rdd-Header-backButton" onClick={onBackClick}>
                    Back
                </button>
            )}
            {content}
        </header>
    );
}

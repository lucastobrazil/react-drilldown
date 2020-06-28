import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header/index';
import DrilldownItems from './Items/index';
import Footer from './Footer/index';

const propTypes = {
    header: PropTypes.node,
    items: PropTypes.array.isRequired,
    footer: PropTypes.node,
    staggeredAnimation: PropTypes.bool,
    direction: PropTypes.string,
    itemHeight: PropTypes.number,
};

const defaultProps = {
    staggeredAnimation: false,
};

export default class Drilldown extends Component {
    componentDidUpdate() {
        /*
            Here we immediately reset the direction
            in order to ensure that the next transition will
            be forward again. This is a bit hacky, but the
            only way to prevent needing to know about the
            animation duration
        */
        this.tempDirection = 'left';
    }

    onBackButtonClick() {
        this.props.onBackClick();
        this.tempDirection = 'right';
    }

    render() {
        const { header, footer, className, items, staggeredAnimation, onBackClick, direction, itemHeight } = this.props;
        return (
            <div className={className}>
                <Header content={header} onBackClick={onBackClick ? this.onBackButtonClick.bind(this) : null} />
                <DrilldownItems
                    items={items}
                    itemHeight={itemHeight}
                    staggeredAnimation={staggeredAnimation}
                    direction={direction || this.tempDirection}
                />
                <Footer content={footer} />
            </div>
        );
    }
}

Drilldown.propTypes = propTypes;
Drilldown.defaultProps = defaultProps;

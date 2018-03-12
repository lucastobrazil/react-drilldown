import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty, isEqual } from 'lodash';

// import styles from './style.css';
const styles = {};
const propTypes = {
    items: PropTypes.arrayOf(PropTypes.func).isRequired,
};

const defaultProps = {
    items: [],
    staggeredAnimation: false,
    direction: 'left',
};

const DEFAULT_STAGGER_TIME = 100;

// todo: we need to get the item height, not rely on this hardcoded value
const ITEM_HEIGHT = 40;

const getContainerHeight = numberItems => `${ITEM_HEIGHT * numberItems}px`;

export const DrilldownButton = props => <button {...props} className={classNames(styles.item, styles.button)} />;
export const DrilldownLink = props => <a {...props} className={styles.item} />;
export default class DrilldownItems extends React.Component {
    constructor() {
        super();
        this.state = {
            oldProps: {},
            hasChanged: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (isEqual(this.props.items, nextProps.items)) {
            return this.setState({ hasChanged: false });
        }
        return this.setState({ oldProps: this.props, hasChanged: true });
    }

    render() {
        const { items, staggeredAnimation, direction } = this.props;
        const { oldProps, hasChanged } = this.state;
        /* todo: this should be extracted, but why is it breaking when i do? */
        const ItemsList = ({ className, itemsList }) => (
            <ul className={className}>
                {itemsList.map((ItemContent, index) => {
                    return (
                        <li
                            style={{ animationDelay: staggeredAnimation && `${index * DEFAULT_STAGGER_TIME}ms` }}
                            key={index}
                        >
                            <ItemContent />
                        </li>
                    );
                })}
            </ul>
        );
        return (
            <section className={styles.container} style={{ height: getContainerHeight(items.length) }}>
                <ItemsList
                    itemsList={items}
                    className={classNames(styles.itemsList, {
                        [styles.animateInFromRight]: hasChanged && direction === 'left',
                        [styles.animateInFromLeft]: hasChanged && direction === 'right',
                    })}
                />
                {!isEmpty(oldProps) &&
                    hasChanged && (
                        <ItemsList
                            itemsList={oldProps.items}
                            className={classNames(styles.itemsList, {
                                [styles.animateOutToLeft]: hasChanged && direction === 'left',
                                [styles.animateOutToRight]: hasChanged && direction === 'right',
                            })}
                        />
                    )}
            </section>
        );
    }
}
DrilldownItems.defaultProps = defaultProps;
DrilldownItems.propTypes = propTypes;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEmpty, isEqual } from 'lodash';

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
const DEFAULT_ITEM_HEIGHT = 40;

const getContainerHeight = (itemHeight = DEFAULT_ITEM_HEIGHT, numberItems) => `${itemHeight * numberItems}px`;

export const DrilldownButton = (props) => (
    <button {...props} className={classNames('RddItem-item', 'RddItem-button')} />
);
export const DrilldownLink = (props) => <a {...props} className="RddItem-item" />;
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
        const { items, staggeredAnimation, direction, itemHeight } = this.props;
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
            <section className="RddItem-container" style={{ height: getContainerHeight(itemHeight, items.length) }}>
                <ItemsList
                    itemsList={items}
                    className={classNames('RddItem-itemsList', {
                        'RddItem-animateInFromRight': hasChanged && direction === 'left',
                        'RddItem-animateInFromLeft': hasChanged && direction === 'right',
                    })}
                />
                {!isEmpty(oldProps) && hasChanged && (
                    <ItemsList
                        itemsList={oldProps.items}
                        className={classNames('RddItem-itemsList', {
                            'RddItem-animateOutToLeft': hasChanged && direction === 'left',
                            'RddItem-animateOutToRight': hasChanged && direction === 'right',
                        })}
                    />
                )}
            </section>
        );
    }
}
DrilldownItems.defaultProps = defaultProps;
DrilldownItems.propTypes = propTypes;

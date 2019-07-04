import React from 'react';
import './LineHeight.scss';
import PropTypes from 'prop-types';

/**
 * @param number
 * @returns {{path: string, value: string}}
 */
const createValue = (number) => {
    return {
        path: 'options.styles.lineHeight',
        value: number + 'em'
    }
};

/**
 * @param props
 * @returns {*}
 */
export default class LineHeight extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lineHeight: this.props.element.options.styles.lineHeight
        }
    }

    edit(value) {
        this.setState({lineHeight: value + 'em'});

        this.props.callback(
            this.props.element,
            createValue(value)
        );
    };

    render() {
        let number = Number.parseInt(this.state.lineHeight);

        return (
            <div className="element-editor_section-content-block">
                <button onClick={() => {
                    if (number > 1 && number <= 2) {
                        number = 1.5;
                    } else if (number < 1.5) {
                        number = 1;
                    } else {
                        number--;
                    }

                    this.edit(number);
                }}>-</button>
                <span>{this.state.lineHeight}</span>
                <button onClick={() => {
                    number++;
                    this.edit(number);
                }}>+</button>
            </div>
        );
    }
}

LineHeight.propTypes = {
    element: PropTypes.shape({
        options: PropTypes.shape({
            styles: PropTypes.object
        })
    }),
    callback: PropTypes.func.isRequired
};

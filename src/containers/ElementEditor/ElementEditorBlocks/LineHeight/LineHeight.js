import React from 'react';
import './LineHeight.scss';

/**
 * @param number
 * @returns {{prop: string, value: string}}
 */
const createValue = (number) => {
    return {
        prop: 'lineHeight',
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
            lineHeight: this.props.styles.lineHeight
        }
    }
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

                    this.setState({lineHeight: number + 'em'});
                    this.props.callback(createValue(number), 'style');
                }}>-</button>
                <span>{this.state.lineHeight}</span>
                <button onClick={() => {
                    number++;
                    this.setState({lineHeight: number + 'em'});
                    this.props.callback(createValue(number), 'style');
                }}>+</button>
            </div>
        );
    }
}

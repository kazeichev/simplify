import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAlignLeft, faAlignCenter, faAlignRight} from "@fortawesome/free-solid-svg-icons";
import './Alignment.scss';
import PropTypes from 'prop-types';

export default class Alignment extends React.Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            textAlign: this.props.element.options.styles.textAlign
        }
    }

    /**
     * @param value
     */
    change(value) {
        this.setState({
            textAlign: value
        });

        this.props.callback(
            this.props.element,
            {
                path: 'options.styles.textAlign',
                value: value
            }
        );
    }

    /**
     * @returns {*}
     */
    render() {
        return (
            <div className="element-editor_section-content-block alignment">
                <button onClick={() => this.change('left')}>
                    <FontAwesomeIcon icon={faAlignLeft} />
                </button>
                <button onClick={() => this.change('center')}>
                    <FontAwesomeIcon icon={faAlignCenter} />
                </button>
                <button onClick={() => this.change('right')}>
                    <FontAwesomeIcon icon={faAlignRight} />
                </button>
            </div>
        );
    }
}

Alignment.propTypes = {
    element: PropTypes.shape({
        options: PropTypes.shape({
            styles: PropTypes.shape({
                textAlign: PropTypes.string
            })
        })
    }),
    callback: PropTypes.func.isRequired
};

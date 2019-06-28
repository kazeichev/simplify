import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAlignLeft, faAlignCenter, faAlignRight} from "@fortawesome/free-solid-svg-icons";
import './Alignment.scss';

export default class Alignment extends React.Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            textAlign: this.props.styles.textAlign
        }
    }

    /**
     * @param value
     */
    change(value) {
        this.setState({
            textAlign: value
        });

        this.props.callback({
            prop: 'textAlign',
            value: value
        }, 'style');
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

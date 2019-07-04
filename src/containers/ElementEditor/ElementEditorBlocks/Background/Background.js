import React from 'react';
import {Col, Row} from "react-bootstrap";
import {ChromePicker} from 'react-color'
import PropTypes from 'prop-types';

export default class Background extends React.Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false,
            backgroundColor: this.props.element.options.styles.backgroundColor
        }
    }

    handleClick = () => {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        })
    };

    handleClose = () => {
        this.setState({
            displayColorPicker: false
        })
    };

    /**
     * @param color
     */
    handleChange = (color) => {
        this.setState({
            backgroundColor: color.hex
        });

        this.props.callback(
            this.props.element,
            {
                path: 'options.styles.backgroundColor',
                value: color.hex
            }
        );
    };

    /**
     * @returns {*}
     */
    render() {

        const styles = {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `${this.state.backgroundColor}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
                top: '-270px',
                left: '0',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },

        };


        return (
            <div className="element-editor_section-content-block border-block">
                <Row>
                    <Col sm={12} xs={12} md={4} lg={4} xl={4} className="indent-col">
                        <h5>Цвет</h5>
                    </Col>
                    <Col sm={12} xs={12} md={8} lg={8} xl={8}>
                        <div onClick={this.handleClick} style={styles.swatch}>
                            <div style={styles.color}/>
                        </div>
                        {
                            this.state.displayColorPicker
                                ? <div style={styles.popover}>
                                    <div style={styles.cover} onClick={this.handleClose}/>
                                    <ChromePicker color={this.state.backgroundColor} onChange={this.handleChange}/>
                                </div>
                                : null
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

Background.propTypes = {
    element: PropTypes.shape({
        options: PropTypes.shape({
            styles: PropTypes.shape({
                backgroundColor: PropTypes.string
            })
        })
    }),
    callback: PropTypes.func.isRequired
};

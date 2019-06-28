import React from 'react';
import {Col, Row} from "react-bootstrap";
import {ChromePicker} from 'react-color'

export default class Color extends React.Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            isTextColorPicker: false,
            isBackgroundColorPicker: false,
            backgroundColor: this.props.styles.backgroundColor,
            color: this.props.styles.color,

        }
    }

    handleClickTextColor = () => {
        this.setState({
            isTextColorPicker: !this.state.isTextColorPicker
        })
    };

    handleClickBackgroundColor = () => {
        this.setState({
            isBackgroundColorPicker: !this.state.isBackgroundColorPicker
        })
    };

    handleClose = () => {
        this.setState({
            isTextColorPicker: false,
            isBackgroundColorPicker: false
        })
    };

    /**
     * @param color
     */
    handleChangeTextColor = (color) => {
        this.setState({
            color: color.hex
        });

        this.props.callback({
            prop: 'color',
            value: color.hex
        }, 'style');
    };

    /**
     * @param color
     */
    handleChangeBackgroundColor = (color) => {
        this.setState({
            backgroundColor: color.hex
        });

        this.props.callback({
            prop: 'backgroundColor',
            value: color.hex
        }, 'style');
    };

    /**
     * @returns {*}
     */
    render() {

        const styles = {
            color: {
                background: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `${this.state.backgroundColor}`,
                },
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `${this.state.color}`,
                }
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
                        <h5>Текст</h5>
                    </Col>
                    <Col sm={12} xs={12} md={8} lg={8} xl={8}>
                        <div onClick={this.handleClickTextColor} style={styles.swatch}>
                            <div style={styles.color.color}/>
                        </div>
                        {
                            this.state.isTextColorPicker
                                ? <div style={styles.popover}>
                                    <div style={styles.cover} onClick={this.handleClose}/>
                                    <ChromePicker color={this.state.color} onChange={this.handleChangeTextColor}/>
                                </div>
                                : null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} xs={12} md={4} lg={4} xl={4} className="indent-col">
                        <h5>Фон</h5>
                    </Col>
                    <Col sm={12} xs={12} md={8} lg={8} xl={8}>
                        <div onClick={this.handleClickBackgroundColor} style={styles.swatch}>
                            <div style={styles.color.background}/>
                        </div>
                        {
                            this.state.isBackgroundColorPicker
                                ? <div style={styles.popover}>
                                    <div style={styles.cover} onClick={this.handleClose}/>
                                    <ChromePicker color={this.state.background} onChange={this.handleChangeBackgroundColor}/>
                                </div>
                                : null
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

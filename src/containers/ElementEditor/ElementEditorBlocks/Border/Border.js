import React from 'react';
import {Col, Row} from "react-bootstrap";
import {ChromePicker} from 'react-color'

import './Border.scss';

export default class Border extends React.Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            borderLeft: this.props.styles.borderLeft,
            borderRight: this.props.styles.borderRight,
            borderTop: this.props.styles.borderTop,
            borderBottom: this.props.styles.borderBottom,
            displayColorPicker: false,
            borderColor: this.props.styles.borderColor,
            borderRadius: this.props.styles.borderRadius
        }
    }

    /**
     * @param borderType
     * @param value
     */
    change(borderType, value) {
        this.setState({
            [borderType]: value + (borderType === 'borderRadius' ? 'px' : 'px solid')
        });

        this.props.callback({
            prop: [borderType],
            value: value + (borderType === 'borderRadius' ? 'px' : 'px solid')
        }, 'style');
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
            borderColor: color.hex
        });

        this.props.callback({
            prop: 'borderColor',
            value: color.hex
        }, 'style');
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
                background: `${this.state.borderColor}`,
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

        const borders = [
            {type: 'borderLeft', title: 'Слева'},
            {type: 'borderRight', title: 'Справа'},
            {type: 'borderTop', title: 'Сверху'},
            {type: 'borderBottom', title: 'Снизу'},
        ];

        return (
            <div className="element-editor_section-content-block border-block">
                {
                    borders.map((element, i) => {
                        return (
                            <Row key={i}>
                                <Col sm={12} xs={12} md={4} lg={4} xl={4} className="indent-col">
                                    <h5>{element.title}</h5>
                                </Col>
                                <Col sm={12} xs={12} md={8} lg={8} xl={8}>
                                    <button onClick={() => {
                                        let border = Number.parseInt(this.state[element.type]);
                                        border = border > 0 ? border - 1 : 0;
                                        this.change(element.type, border);
                                    }}>-
                                    </button>
                                    <span>{Number.parseInt(this.state[element.type])}</span>
                                    <button onClick={() => {
                                        let border = Number.parseInt(this.state[element.type]);
                                        border = border + 1;
                                        this.change(element.type, border);
                                    }}>+
                                    </button>
                                </Col>
                            </Row>
                        )
                    })
                }

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
                                ? <div style={ styles.popover }>
                                    <div style={ styles.cover } onClick={this.handleClose}/>
                                    <ChromePicker color={this.state.borderColor} onChange={this.handleChange}/>
                                </div>
                                : null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} xs={12} md={4} lg={4} xl={4} className="indent-col">
                        <h5>Радиус</h5>
                    </Col>
                    <Col sm={12} xs={12} md={8} lg={8} xl={8}>
                        <button onClick={() => {
                            let borderRadius = Number.parseInt(this.state.borderRadius);
                            borderRadius = borderRadius > 0 ? borderRadius - 1 : 0;
                            this.change('borderRadius', borderRadius);
                        }}>-
                        </button>
                        <span>{Number.parseInt(this.state.borderRadius)}</span>
                        <button onClick={() => {
                            let borderRadius = Number.parseInt(this.state.borderRadius);
                            borderRadius = borderRadius + 1;
                            this.change('borderRadius', borderRadius);
                        }}>+
                        </button>
                    </Col>
                </Row>
            </div>
        );
    }
}

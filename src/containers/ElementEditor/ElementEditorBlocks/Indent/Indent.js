import React from 'react';
import './Indent.scss';
import {Row, Col} from "react-bootstrap";
import PropTypes from 'prop-types';

export default class Indent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            paddingLeft: this.props.element.options.styles.paddingLeft,
            paddingRight: this.props.element.options.styles.paddingRight,
            paddingTop: this.props.element.options.styles.paddingTop,
            paddingBottom: this.props.element.options.styles.paddingBottom,
            marginLeft: this.props.element.options.styles.marginLeft,
            marginRight: this.props.element.options.styles.marginRight,
            marginTop: this.props.element.options.styles.marginTop,
            marginBottom: this.props.element.options.styles.marginBottom
        }
    }

    change(indent, value) {
        this.setState({
            [indent]: value + 'px'
        });

        this.props.callback(
            this.props.element,
            {
                path: `options.styles.${indent}`,
                value: value + 'px'
            }
        )
    }

    render() {
        const paddings = [
            {type: 'paddingLeft', title: 'Слева'},
            {type: 'paddingRight', title: 'Справа'},
            {type: 'paddingTop', title: 'Сверху'},
            {type: 'paddingBottom', title: 'Снизу'}
        ];

        const margins = [
            {type: 'marginLeft', title: 'Слева'},
            {type: 'marginRight', title: 'Справа'},
            {type: 'marginTop', title: 'Сверху'},
            {type: 'marginBottom', title: 'Снизу'}
        ];

        return (
            <div className="element-editor_section-content-block indent">
                <h6>Внутренние</h6>
                {
                    paddings.map((element, i) => {
                        return (
                            <Row key={i}>
                                <Col sm={12} xs={12} md={4} lg={4} xl={4} className="indent-col">
                                    <h5>{element.title}</h5>
                                </Col>
                                <Col sm={12} xs={12} md={8} lg={8} xl={8}>
                                    <button onClick={() => {
                                        let padding = Number.parseInt(this.state[element.type]);
                                        padding = padding > 0 ? padding - 5 : 0;
                                        this.change(element.type, padding);
                                    }}>-</button>
                                    <span>{this.state[element.type]}</span>
                                    <button onClick={() => {
                                        let paddingLeft = Number.parseInt(this.state[element.type]);
                                        paddingLeft = paddingLeft + 5;
                                        this.change(element.type, paddingLeft);
                                    }}>+</button>
                                </Col>
                            </Row>
                        )
                    })
                }

                <h6>Внешние</h6>
                {
                    margins.map((element, i) => {
                        return (
                            <Row key={i}>
                                <Col sm={12} xs={12} md={4} lg={4} xl={4} className="indent-col">
                                    <h5>{element.title}</h5>
                                </Col>
                                <Col sm={12} xs={12} md={8} lg={8} xl={8}>
                                    <button onClick={() => {
                                        let padding = Number.parseInt(this.state[element.type]);
                                        padding = padding > 0 ? padding - 5 : 0;
                                        this.change(element.type, padding);
                                    }}>-</button>
                                    <span>{this.state[element.type]}</span>
                                    <button onClick={() => {
                                        let paddingLeft = Number.parseInt(this.state[element.type]);
                                        paddingLeft = paddingLeft + 5;
                                        this.change(element.type, paddingLeft);
                                    }}>+</button>
                                </Col>
                            </Row>
                        )
                    })
                }
            </div>
        );
    }
}

Indent.propTypes = {
    element: PropTypes.shape({
        options: PropTypes.shape({
            styles: PropTypes.shape({
                paddingLeft: PropTypes.string,
                paddingRight: PropTypes.string,
                paddingTop: PropTypes.string,
                paddingBottom: PropTypes.string,
                marginLeft: PropTypes.string,
                marginRight: PropTypes.string,
                marginTop: PropTypes.string,
                marginBottom: PropTypes.string
            })
        })
    }),
    callback: PropTypes.func.isRequired
};

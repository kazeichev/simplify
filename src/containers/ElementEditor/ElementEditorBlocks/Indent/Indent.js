import React from 'react';
import './Indent.scss';
import {Row, Col} from "react-bootstrap";

export default class Indent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            paddingLeft: this.props.styles.paddingLeft,
            paddingRight: this.props.styles.paddingRight,
            paddingTop: this.props.styles.paddingTop,
            paddingBottom: this.props.styles.paddingBottom,
            marginLeft: this.props.styles.marginLeft,
            marginRight: this.props.styles.marginRight,
            marginTop: this.props.styles.marginTop,
            marginBottom: this.props.styles.marginBottom
        }
    }

    change(indent, value) {
        this.setState({
            [indent]: value + 'px'
        });

        this.props.callback({
            prop: indent,
            value: value + 'px'
        }, 'style')
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
                <h6 style={{color: 'rgba(103, 106, 108, 0.4)', fontSize: '14px', margin: '20px 0'}}>Внутренние</h6>
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

                <h6 style={{color: 'rgba(103, 106, 108, 0.4)', fontSize: '14px', margin: '20px 0'}}>Внешние</h6>
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

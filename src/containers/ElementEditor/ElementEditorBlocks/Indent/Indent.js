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
            paddingBottom: this.props.styles.paddingBottom
        }
    }

    change(indent, value) {
        this.setState({
            [indent]: value + 'px'
        });

        this.props.callback({
            prop: indent,
            value: value + 'px'
        })
    }

    render() {
        const paddings = [
            {type: 'paddingLeft', title: 'Слева'},
            {type: 'paddingRight', title: 'Справа'},
            {type: 'paddingTop', title: 'Сверху'},
            {type: 'paddingBottom', title: 'Снизу'}
        ];

        return (
            <div className="element-editor_section-content-block indent">
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
            </div>
        );
    }
}

import React from 'react';
import {Row, Col} from "react-bootstrap";

import './Link.scss';

export default class Link extends React.Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            link: this.props.options.link,
            isError: false,
            isSuccess: false
        };

        this.change = this.change.bind(this);
    }

    /**
     * @param e
     */
    change(e) {
        const value = e.target.value,
              expression =
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi,
              regex = new RegExp(expression);

        if (value.match(regex)) {
            this.setState({
                link: value,
                isSuccess: true,
                isError: false
            }, () => {
                this.props.callback({
                    prop: 'link',
                    value: value
                }, 'options');

                setTimeout(() => {
                    this.setState({isSuccess: false})
                }, 2000);
            });
        } else {
            this.setState({
                isError: true,
                isSuccess: false
            }, () => {
                setTimeout(() => {
                    this.setState({isError: false})
                }, 2000);
            })
        }
    }


    render() {
        return (
            <div className="element-editor_section-content-block link">
                <Row>
                    <Col sm={12} xs={12} md={4} lg={4} xl={4} className="indent-col">
                        <h5>Адрес</h5>
                    </Col>
                    <Col sm={12} xs={12} md={8} lg={8} xl={8} className="indent-col">
                        <input
                            className={
                                this.state.isError
                                    ? 'url-error'
                                    : (this.state.isSuccess ? 'url-success' : null)
                            }
                            type="url"
                            onBlur={(e) => this.change(e)}
                            defaultValue={this.state.link}
                            placeholder="https://unibase.ru"
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

import React from 'react';
import {Row, Col} from "react-bootstrap";
import './AddClass.scss';
import PropTypes from 'prop-types';

export default class AddClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            className: this.props.element.options.className,
            isError: false,
            isSuccess: false
        }
    }

    /**
     * @param e
     */
    change(e) {
        const value = e.target.value;

        if (value) {
            this.setState({
                className: value,
                isSuccess: true,
                isError: false
            }, () => {
                this.props.callback(
                    this.props.element,
                    {
                        path: 'options.className',
                        value: value
                    }
                );

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
            <div className="element-editor_section-content-block addClass">
                <Row>
                    <Col sm={12} xs={12} md={4} lg={4} xl={4} className="indent-col">
                        <h5>Название</h5>
                    </Col>
                    <Col sm={12} xs={12} md={8} lg={8} xl={8} className="indent-col">
                        <input
                            className={
                                this.state.isError
                                    ? 'addClass-error'
                                    : (this.state.isSuccess ? 'addClass-success' : null)
                            }
                            type="text"
                            onBlur={(e) => this.change(e)}
                            defaultValue={this.state.className}
                            placeholder="new-class"
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

AddClass.propTypes = {
    element: PropTypes.shape({
        options: PropTypes.shape({
            styles: PropTypes.shape({
                className: PropTypes.string
            })
        })
    }),
    callback: PropTypes.func.isRequired
};

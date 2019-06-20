import React, {Component} from 'react';
import './ToolBar.scss';

import shortid from 'shortid';
import {Tabs, Tab} from "react-bootstrap";
import createComponent from "../../utils/ComponentFactory";

import {applyDrag} from "../../utils/ApplyDrag";
import {Container, Draggable} from 'react-smooth-dnd';

class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: shortid.generate(),
                    type: 'TextElement',
                    options: {}
                },
                {
                    id: shortid.generate(),
                    type: 'ButtonElement',
                    options: {}
                },
                {
                    id: shortid.generate(),
                    type: 'RowElement',
                    options: {}
                }
            ]
        }
    }

    render() {
        return (
            <div className="toolbar">
                <div className="toolbar__tabs">
                    <Tabs defaultActiveKey="structure" id="toolbar__tabs-wrapper">
                        <Tab eventKey="structure" title="Структура">
                            <Container
                                groupName="1"
                                behaviour="copy"
                                getChildPayload={i => this.state.items[i]}
                                onDrop={e => this.setState({ items: applyDrag(this.state.items, e) })}
                            >
                                {
                                    this.state.items.map((element,i) => {
                                        const component = createComponent(element);
                                        return (
                                            <Draggable key={i}>
                                                {component}
                                            </Draggable>
                                        );
                                    })
                                }
                            </Container>
                        </Tab>
                        <Tab eventKey="elements" title="Элементы">
                        </Tab>
                        <Tab eventKey="settings" title="Настройки">
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default ToolBar;

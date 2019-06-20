import React, {Component} from 'react';
import Draggable from '../Draggable';
import './ToolBar.scss';
import shortid from 'shortid';

import {Tabs, Tab} from "react-bootstrap";
import update from "immutability-helper";

class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: props.elements
        };

        this.updateId = this.updateId.bind(this);
    }

    updateId(element) {
        this.setState(update(this.state, {
            elements: {
                $merge: element
            }
        }));
    }

    render() {
        const {elements} = this.state;
        return (
            <div className="toolbar">
                <div className="toolbar__tabs">
                    <Tabs defaultActiveKey="structure">
                        <Tab eventKey="structure" title="Структура">
                            <Draggable
                                index={1}
                                listId={this.props.id}
                                element={{id: shortid.generate(), text: 'Sample Text', type: 'Card'}}
                                updateId={this.updateId}
                            />
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

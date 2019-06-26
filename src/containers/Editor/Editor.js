import React, {Component} from 'react';

import createComponent from '../../utils/ComponentFactory';
import {Container, Draggable} from 'react-smooth-dnd';

import './Editor.scss';
import {applyDrag} from "../../utils/ApplyDrag";
import update from "immutability-helper";

import {TYPE_EDITOR} from "../../utils/constants";

class Editor extends Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        };

        this.changeOptions = this.changeOptions.bind(this);
    }

    /**
     * @param e
     */
    onDrop(e) {
        this.setState({
            items: applyDrag(this.state.items, e)
        })
    }

    /**
     * @param element
     * @param itemToChange
     */
    changeOptions(element, itemToChange) {
        let index = this.state.items.findIndex(x => x.id === element.id);
        if (index === -1) index = 1;
        const itemName = Object.keys(itemToChange)[0];
        const itemData = itemToChange[itemName];
        const itemType = itemToChange.option;

        if (itemType && itemType === 'style') {
            this.setState(update(this.state, {
                items: {
                    [index]: {
                        options: {
                            style: {
                                $merge: {
                                    [itemName]: itemData
                                }
                            }
                        }
                    }
                }
            }));
        } else {
            this.setState(update(this.state, {
                items: {
                    [index]: {
                        options: {
                            $merge: {
                                [itemName]: itemData
                            }
                        }
                    }
                }
            }));
        }
    }


    /**
     * @returns {*}
     */
    render() {
        return (
            <div className="editor">
                <div className="editor__preview">
                    <Container
                        groupName="1"
                        getChildPayload={i => this.state.items[i]}
                        onDrop={e => this.onDrop(e)}
                        lockAxis="y"
                        dragHandleSelector=".element-drag-handler"
                    >
                        {
                            this.state.items.map((element, i) => {
                                const component = createComponent(
                                    element,
                                    TYPE_EDITOR,
                                    {changeOptions: this.changeOptions}
                                );

                                return (
                                    <Draggable key={i}>
                                        {component}
                                    </Draggable>
                                );
                            })
                        }
                    </Container>
                </div>
            </div>
        );
    }
}

export default Editor;

import React, {Component} from 'react';

import createComponent from '../../utils/ComponentFactory';
import {Container, Draggable} from 'react-smooth-dnd';

import './Editor.scss';
import {applyDrag} from "../../utils/ApplyDrag";

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
        };
    }

    render() {
        return (
            <div className="editor">
                <div className="editor__preview">
                    <Container
                        groupName="1"
                        getChildPayload={i => this.state.items[i]}
                        onDrop={e => this.setState({items: applyDrag(this.state.items, e)})}
                    >
                        {
                            this.state.items.map((element, i) => {
                                const component = createComponent(element);
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

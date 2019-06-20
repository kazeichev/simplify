import React, {Component} from 'react';
import update from 'immutability-helper/index';
import {DropTarget} from 'react-dnd/lib/index';

import createComponent from '../../utils/ComponentFactory';

import './Editor.scss';

class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: props.elements
        };

        this.remove = this.remove.bind(this);
        this.move = this.move.bind(this);
    }

    push(element) {
        this.setState(update(this.state, {
            elements: {
                $push: [element]
            }
        }));
    }

    remove(index) {
        this.setState(update(this.state, {
            elements: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
    }

    move(dragIndex, hoverIndex) {
        const {elements} = this.state;
        this.setState(update(this.state, {
            elements: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, elements[dragIndex]]
                ]
            }
        }));
    }

    render() {
        const {elements} = this.state;
        const {canDrop, isOver, connectDropTarget} = this.props;
        // const isActive = canDrop && isOver;
        // const backgroundColor = isActive ? 'lightgreen' : '#FFF';
        return connectDropTarget(
            <div className="editor">
                <div className="editor__preview">
                    {elements.map((element, i) => {
                        return createComponent(element, i, this);
                    })}
                </div>
            </div>
        );
    }
}

const elementTarget = {
    drop(props, monitor, component) {
        const {id} = props;
        const sourceObj = monitor.getItem();
        if (id !== sourceObj.listId) component.push(sourceObj.element);
        return {
            listId: id
        };
    }
};

export default DropTarget("ELEMENT", elementTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(Editor);

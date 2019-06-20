import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd/lib/index';
import flow from 'lodash/flow';

const style = {
	padding: '5px 0 5px 10px',
	backgroundColor: 'white',
	cursor: 'move',
	boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 5px -1px',
	border: '1px solid #ddd'
};

const TOOLBAR_PANEL = 1;

class Draggable extends Component {

	render() {
		const { element, isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(
			<div style={{ ...style, opacity }} className="draggable-element">
				{element.text}
			</div>
		));
	}
}

const elementSource = {

	beginDrag(props) {
		return {
			index: props.index,
			listId: props.listId,
			element: props.element
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if (item.listId === TOOLBAR_PANEL) {
			props.updateId(item.element);
		}

		if ( dropResult  && dropResult.listId !== item.listId && item.listId !== TOOLBAR_PANEL ) {
			props.remove(item.index);
		}
	}
};

const elementTarget = {

	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;

		if (dragIndex === hoverIndex) {
			return;
		}

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		const clientOffset = monitor.getClientOffset();
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		if ( props.listId === sourceListId && sourceListId !== TOOLBAR_PANEL ) {
			props.move(dragIndex, hoverIndex);
			monitor.getItem().index = hoverIndex;
		}
	}
};

export default flow(
	DropTarget("ELEMENT", elementTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("ELEMENT", elementSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Draggable);

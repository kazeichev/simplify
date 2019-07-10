import React from 'react';
import './EditorControlElement.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {openEditableElement} from "../../actions/toolbarActions";

class EditorControlElement extends React.Component{
    render() {
        const className = this.props.defaultHovered
            ? 'editor-control-element_wrapper hovered'
            : 'editor-control-element_wrapper';
        return (
            <div
                className={className}
                onClick={(e) => {
                    e.stopPropagation();
                    console.log(this.props.element);
                    this.props.openEditableElement(this.props.element)
                }}
            >
                {this.props.data}
            </div>
        );
    }
}

const mapActionsToProps = dispatch => {
    return {
        openEditableElement: bindActionCreators(openEditableElement, dispatch),
    }
};

export default connect(null, mapActionsToProps)(EditorControlElement);

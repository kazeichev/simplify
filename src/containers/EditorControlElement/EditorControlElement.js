import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";
import {faCopy, faEdit, faTrashAlt} from "@fortawesome/free-regular-svg-icons/index";
import {faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons/index";
import './EditorControlElement.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {openEditableElement, closeEditableElement} from "../../actions/toolbarActions";
import {copyElement, removeElement} from "../../actions/editorActions";

class EditorControlElement extends React.Component{
    render() {
        return (
            <div className="editor-control-element_wrapper">
                {this.props.data}
                <div className="editor-control-element_tooltips">
                <span onClick={() => this.props.copy(this.props.element)}>
                    <FontAwesomeIcon icon={faCopy}/>
                </span>
                    <span onClick={() => this.props.openEditableElement(this.props.element)}>
                    <FontAwesomeIcon icon={faEdit}/>
                </span>
                    <span onClick={() => {
                        this.props.closeEditableElement();
                        this.props.remove(this.props.element);
                    }}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </span>
                    <span className="element-drag-handler">
                    <FontAwesomeIcon icon={faExpandArrowsAlt}/>
                </span>
                </div>
            </div>
        );
    }
}

const mapActionsToProps = dispatch => {
    return {
        copy: bindActionCreators(copyElement, dispatch),
        remove: bindActionCreators(removeElement, dispatch),
        openEditableElement: bindActionCreators(openEditableElement, dispatch),
        closeEditableElement: bindActionCreators(closeEditableElement, dispatch)
    }
};

export default connect(null, mapActionsToProps)(EditorControlElement);

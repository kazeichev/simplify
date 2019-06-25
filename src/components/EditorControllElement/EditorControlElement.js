import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faEdit, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";
import './EditorControlElement.scss';

export default (props) => {
    return (
        <div className="editor-control-element_wrapper">
            {props.data}
            <div className="editor-control-element_tooltips">
                <span><FontAwesomeIcon icon={faCopy}/></span>
                <span onClick={() => props.edit(props.element, props.changeOptions)}>
                    <FontAwesomeIcon icon={faEdit}/>
                </span>
                <span><FontAwesomeIcon icon={faTrashAlt}/></span>
                <span className="element-drag-handler">
                    <FontAwesomeIcon icon={faExpandArrowsAlt}/>
                </span>
            </div>
        </div>
    );
}

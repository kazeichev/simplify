import React from 'react';
import ToolBarElement from '../ToolBarElement/ToolBarElement';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquare} from "@fortawesome/free-solid-svg-icons";
import {TYPE_TOOLBAR} from "../../utils/constants";
import EditorControllElement from "../EditorControllElement/EditorControlElement";
import Interweave from 'interweave';

const onClick = (url) => {
    window.open(url, '_blank');
};

export default (props) => {
    const icon = <FontAwesomeIcon icon={faSquare} size="2x" />;
    const data =
        <div style={{textAlign: props.element.options.style.textAlign}}>
            <button
                style={props.element.options.style}
                className={props.element.options.className}
                onClick={() => {
                    if (props.element.options.link) {
                        onClick(props.element.options.link)
                    }
                }}
            >
                <Interweave content={props.element.options.text} />
            </button>
        </div>;

    return props.containerType === TYPE_TOOLBAR
        ? <ToolBarElement icon={icon} text="Кнопка" />
        : <EditorControllElement
            data={data}
            element={props.element}
            edit={props.element.options.edit}
            changeOptions={props.changeOptions}
            copy={props.copy}
            remove={props.remove}
            closeEditor={props.element.options.closeEditor}
        />;
}

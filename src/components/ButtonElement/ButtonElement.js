import React from 'react';
import ToolBarElement from '../ToolBarElement/ToolBarElement';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquare} from "@fortawesome/free-solid-svg-icons";
import {TYPE_TOOLBAR} from "../../utils/constants";
import EditorControlElement from "../../containers/EditorControlElement/EditorControlElement";
import Interweave from 'interweave';

const onClick = (url) => {
    window.open(url, '_blank');
};

export default (props) => {
    const icon = <FontAwesomeIcon icon={faSquare} size="2x" />;
    const data =
        <div style={{textAlign: props.element.options.styles.textAlign}}>
            <button
                style={{...props.element.options.styles}}
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
        : <EditorControlElement
            data={data}
            element={props.element}
        />;
}

import React from 'react';
import ToolBarElement from '../ToolBarElement/ToolBarElement';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeading} from "@fortawesome/free-solid-svg-icons/faHeading";
import {TYPE_TOOLBAR} from "../../utils/constants";
import EditorControllElement from '../EditorControllElement/EditorControlElement';
import Interweave from 'interweave';

export default (props) => {
    const style = {
        ...props.element.options.style,
        margin: '0'
    };

    const icon = <FontAwesomeIcon icon={faHeading} size="2x" />;
    const data = <div style={style}><Interweave content={props.element.options.text} /></div>;
    return props.containerType === TYPE_TOOLBAR
        ? <ToolBarElement icon={icon} text="Текст" id={props.element.id} />
        : <EditorControllElement
            data={data}
            element={props.element}
            edit={props.element.options.edit}
            changeOptions={props.changeOptions}
        />;
}

import React from 'react';
import ToolBarElement from '../ToolBarElement/ToolBarElement';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeading} from "@fortawesome/free-solid-svg-icons/faHeading";
import {TYPE_TOOLBAR} from "../../utils/constants";
import EditorControlElement from '../../containers/EditorControlElement/EditorControlElement';
import Interweave from 'interweave';

export default (props) => {
    const style = {
        ...props.element.options.styles,
        margin: '0'
    };

    const icon = <FontAwesomeIcon icon={faHeading} size="2x" />;
    const data = <div style={style}><Interweave content={props.element.options.text} /></div>;
    return props.containerType === TYPE_TOOLBAR
        ? <ToolBarElement icon={icon} text="Текст" id={props.element.id} />
        : <EditorControlElement
            data={data}
            element={props.element}
        />;
}

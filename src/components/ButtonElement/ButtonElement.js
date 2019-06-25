import React from 'react';
import ToolBarElement from '../ToolBarElement/ToolBarElement';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquare} from "@fortawesome/free-solid-svg-icons";
import {TYPE_TOOLBAR} from "../../utils/constants";

export default (props) => {
    const icon = <FontAwesomeIcon icon={faSquare} size="2x" />;
    return props.containerType === TYPE_TOOLBAR
        ? <ToolBarElement icon={icon} text="Кнопка" />
        : '';
}

import React from 'react';
import './ToolBarElement.scss';

export default (props) => {
    const className = `toolbar-element toolbar-element-${props.id}`;
    return (
        <div className={className}>
            <div className="toolbar-element__content-wrapper">
                {props.icon}
                <h3>{props.text}</h3>
            </div>
        </div>
    );
}

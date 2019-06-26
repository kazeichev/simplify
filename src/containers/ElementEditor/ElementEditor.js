import React from 'react';
import './ElementEditor.scss';

import ElementEditorSection from './ElementEditorSection/ElementEditorSection';

export default (props) => {
    return (
        <div className="element-editor_wrapper">
            {
                props.options.options ? props.options.options.map((option, i )=> {
                    return <ElementEditorSection
                        option={option}
                        key={i}
                        callback={props.onElementEditorStateChange}
                        styles={props.currentStyles}
                    />
                }) : null
            }
        </div>
    );
}

import React from 'react';
import LineHeight from './ElementEditorBlocks/LineHeight/LineHeight';
import Indent from './ElementEditorBlocks/Indent/Indent';

export default (props) => {
    let component = null;

    switch (props.type) {
        case 'lineHeight':
            component = <LineHeight
                callback={props.callback}
                styles={props.styles}
            />;
            break;
        case 'indent':
            component = <Indent
                callback={props.callback}
                styles={props.styles}
            />;
            break;
        default:
            component = null;
            break;
    }

    return component;
}

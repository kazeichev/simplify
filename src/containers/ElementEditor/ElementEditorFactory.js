import React from 'react';
import LineHeight from './ElementEditorBlocks/LineHeight/LineHeight';
import Indent from './ElementEditorBlocks/Indent/Indent';
import Alignment from './ElementEditorBlocks/Alignment/Alignment';
import Border from "./ElementEditorBlocks/Border/Border";
import Background from "./ElementEditorBlocks/Background/Background";


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
        case 'alignment':
            component = <Alignment
                callback={props.callback}
                styles={props.styles}
            />;
            break;
        case 'border':
            component = <Border
                callback={props.callback}
                styles={props.styles}
            />;
            break;
        case 'background':
            component = <Background
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

import React from 'react';
import LineHeight from './ElementEditorBlocks/LineHeight/LineHeight';
import Indent from './ElementEditorBlocks/Indent/Indent';
import Alignment from './ElementEditorBlocks/Alignment/Alignment';
import Border from "./ElementEditorBlocks/Border/Border";
import Background from "./ElementEditorBlocks/Background/Background";
import AddClass from "./ElementEditorBlocks/AddClass/AddClass";
import Link from "./ElementEditorBlocks/Link/Link";
import Color from "./ElementEditorBlocks/Color/Color";


export default (props) => {
    let component = null;

    switch (props.type) {
        case 'lineHeight':
            component = <LineHeight
                callback={props.callback}
                element={props.element}
            />;
            break;
        case 'indent':
            component = <Indent
                callback={props.callback}
                element={props.element}
            />;
            break;
        case 'alignment':
            component = <Alignment
                callback={props.callback}
                element={props.element}
            />;
            break;
        case 'border':
            component = <Border
                callback={props.callback}
                element={props.element}
            />;
            break;
        case 'background':
            component = <Background
                callback={props.callback}
                element={props.element}
            />;
            break;
        case 'addClass':
            component = <AddClass
                callback={props.callback}
                element={props.element}
            />;
            break;
        case 'link':
            component = <Link
                callback={props.callback}
                element={props.element}
            />;
            break;
        case 'color':
            component = <Color
                callback={props.callback}
                element={props.element}
            />;
            break;
        default:
            component = null;
            break;
    }

    return component;
}

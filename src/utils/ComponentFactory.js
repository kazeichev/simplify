import React from 'react';

import {RowElement, ButtonElement, TextElement} from '../containers/index';
import uuid from 'uuid';
import {TYPE_EDITOR} from "./constants";

export default (element, containerType, functions) => {
    let component = null;

    if (element && element.hasOwnProperty('type')) {
        element.containerType = containerType;
        element.uuid = uuid.v4();

        switch (element.type) {
            case 'RowElement':
                component = <RowElement
                    key={element.id}
                    containerType={containerType}
                    element={element}
                />;
                break;
            case 'ButtonElement':
                component = <ButtonElement
                    key={element.id}
                    containerType={containerType}
                    element={element}
                    changeOptions={containerType === TYPE_EDITOR ? functions.changeOptions : null}
                    copy={containerType === TYPE_EDITOR ? functions.copy : null}
                    remove={containerType === TYPE_EDITOR ? functions.remove : null}
                />;
                break;
            case 'TextElement':
                component = <TextElement
                    key={element.id}
                    containerType={containerType}
                    element={element}
                    changeOptions={containerType === TYPE_EDITOR ? functions.changeOptions : null}
                    copy={containerType === TYPE_EDITOR ? functions.copy : null}
                    remove={containerType === TYPE_EDITOR ? functions.remove : null}
                />;
                break;
            default:
                break;
        }
    }

    return component;
};

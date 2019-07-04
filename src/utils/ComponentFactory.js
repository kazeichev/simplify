import React from 'react';

import {RowElement, ButtonElement, TextElement} from '../containers/index';
import uuid from 'uuid';

export default (element, containerType) => {
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
                />;
                break;
            case 'TextElement':
                component = <TextElement
                    key={element.id}
                    containerType={containerType}
                    element={element}
                />;
                break;
            default:
                break;
        }
    }

    return component;
};

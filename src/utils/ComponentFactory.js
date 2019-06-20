import React from 'react';

import {RowElement, ButtonElement, TextElement} from '../containers/index';

export default (element, index, $this) => {
    let component = null;

    if (element && element.hasOwnProperty('type')) {
        switch (element.type) {
            case 'RowElement':
                component = <RowElement key={element.id}/>;
                break;
            case 'ButtonElement':
                component = <ButtonElement key={element.id}/>;
                break;
            case 'TextElement':
                component = <TextElement/>;
                break;
            default:
                break;
        }
    }

    return component;
};

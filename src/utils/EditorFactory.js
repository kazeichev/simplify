import React from 'react';

import TextElementEditor from '../containers/ElementEditor/ElementEditors/TextElementEditor/TextElementEditor';
import ButtonElementEditor from '../containers/ElementEditor/ElementEditors/ButtonElementEditor/ButtonElementEditor';

export default (element) => {
    let component = null;
    switch (element.type) {
        case 'TextElement':
            component = <TextElementEditor element={element} />;
            break;
        case 'ButtonElement':
            component = <ButtonElementEditor element={element} />;
            break;
        default:
            component = null;
            break;
    }

    return component;
}

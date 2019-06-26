import React from 'react';

import TextElementEditor from '../containers/TextElementEditor/TextElementEditor';

export default (element) => {
    let component = null;
    switch (element.type) {
        case 'TextElement':
            component = <TextElementEditor element={element} />;
            break;
        default:
            component = null;
            break;
    }

    return component;
}

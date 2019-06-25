import React from 'react';

import TextEditor from '../containers/TextEditor/TextEditor';

export default (element) => {
    let component = null;
    switch (element.type) {
        case 'TextElement':
            component = <TextEditor element={element} />;
            break;
        default:
            component = null;
            break;
    }

    return component;
}

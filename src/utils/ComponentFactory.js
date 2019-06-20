import React from 'react';

import RowElement from '../components/RowElement/RowElement';
import ButtonElement from '../components/ButtonElement/ButtonElement';
import Card from '../containers/Draggable';

export default (element, index, $this) => {
    let component = null;

    switch (element.type) {
        case 'RowElement':
            component = <RowElement key={index} />;
            break;
        case 'ButtonElement':
            component = <ButtonElement key={index} />;
            break;
        case 'Card':
            component = <Card
                key={element.id}
                index={index}
                listId={$this.props.id}
                element={element}
                remove={$this.remove}
                move={$this.move}
            />;
            break;
        default:
            break;
    }

    return component;
};

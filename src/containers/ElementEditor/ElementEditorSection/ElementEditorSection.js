import React from 'react';
import './ElementEditorSection.scss';
import CreateEditorBlock from '../ElementEditorFactory';
export default (props) => {

    const names = {
        lineHeight: 'Высота строки',
        indent: 'Отступы',
        alignment: 'Выравнивание',
        border: 'Граница',
        background: 'Фон',
        addClass: 'Дополнительный CSS класс',
        link: 'Ссылка',
        color: 'Цвет'
    };

    return (
        <div className="element-editor_section">
            <div className="element-editor_section-title">
                <h5>{names[props.option]}</h5>
            </div>
            <div className="element-editor_section-content">
                <CreateEditorBlock
                    type={props.option}
                    callback={props.callback}
                    element={props.element}
                />
            </div>
        </div>
    );
}

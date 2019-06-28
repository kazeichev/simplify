import React, { Component } from 'react';

import TextEditor from '../TextEditor/TextEditor';
import ElementEditor from '../ElementEditor/ElementEditor';

const editorToolbar = {
    options: [
        'inline',
        'blockType',
        'fontSize',
        'fontFamily',
        'list',
        'textAlign',
        'colorPicker',
        'link',
        'history'
    ],
};

const elementEditorOptions = {
    options: ['lineHeight', 'indent']
};

export default class TextElementEditor extends Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.onElementEditorStateChange = this.onElementEditorStateChange.bind(this);
    }

    /**
     * @param state
     */
    onElementEditorStateChange(state) {
        this.props.element.callback(
            this.props.element,
            {
                [state.prop]: state.value,
                option: 'style'
            }
        )
    }

    render() {
        return (
            <div style={{overflow: 'auto', maxHeight: '90vh', padding: '20px'}}>
                <TextEditor
                    element={this.props.element}
                    toolbarOptions={editorToolbar}
                />
                <ElementEditor
                    onElementEditorStateChange={this.onElementEditorStateChange}
                    options={elementEditorOptions}
                    elementOptions={this.props.element.options}
                />
            </div>
        );
    }
}

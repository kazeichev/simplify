import React, { Component } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
            <div>
                <TextEditor
                    element={this.props.element}
                    toolbarOptions={editorToolbar}
                />
                <ElementEditor
                    onElementEditorStateChange={this.onElementEditorStateChange}
                    options={elementEditorOptions}
                    currentStyles={this.props.element.options.style}
                />
            </div>
        );
    }
}

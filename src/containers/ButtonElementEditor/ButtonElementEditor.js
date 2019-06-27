import React, {Component} from 'react';

import TextEditor from '../TextEditor/TextEditor';
import ElementEditor from '../ElementEditor/ElementEditor';

const editorToolbar = {
    options: [
        'inline',
        'fontSize',
        'fontFamily',
        'textAlign',
        'colorPicker',
        'history'
    ],
};

const elementEditorOptions = {
    options: [
        'indent',
        'alignment',
        'border',
        'background'
    ]
};

export default class ButtonElementEditor extends Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.onStateChange = this.onStateChange.bind(this);
    }

    /**
     * @param state
     */
    onStateChange(state) {
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
                    onElementEditorStateChange={this.onStateChange}
                    options={elementEditorOptions}
                    currentStyles={this.props.element.options.style}
                />
            </div>
        );
    }
}

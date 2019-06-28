import React, {Component} from 'react';

import TextEditor from '../TextEditor/TextEditor';
import ElementEditor from '../ElementEditor/ElementEditor';

const editorToolbar = {
    options: [
        'inline',
        'fontSize',
        'fontFamily',
        'textAlign',
        'history'
    ],
};

const elementEditorOptions = {
    options: [
        'color',
        'link',
        'indent',
        'alignment',
        'border',
        'addClass'
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
     * @param option
     */
    onStateChange(state, option) {
        this.props.element.callback(
            this.props.element,
            {
                [state.prop]: state.value,
                option: option
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
                    elementOptions={this.props.element.options}
                />
            </div>
        );
    }
}

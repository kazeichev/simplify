import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './TextEditor.scss';

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
        'embedded',
        'history'
    ],
};

export default class TextEditor extends Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        const html = props.element.options.text;
        const contentBlock = htmlToDraft(html);
        let editorState = null;

        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);

        } else {
            editorState = EditorState.createEmpty();
        }

        this.state = {
            editorState: editorState
        };

        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    /**
     * @param editorState
     */
    onEditorStateChange(editorState) {
        this.props.element.callback(
            this.props.element,
            {
                text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
            }
        );

        this.setState({
            editorState: editorState
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="text-editor-root-wrapper"
                    editorClassName="text-editor-wrapper"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={editorToolbar}
                />
            </div>
        );
    }
}

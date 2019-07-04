import React, { Component } from 'react';
import {EditorState, ContentState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './TextEditor.scss';
import draftToHtml from "draftjs-to-html";

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

        this.onTextEditorStateChange = this.onTextEditorStateChange.bind(this);

    }

    /**
     * @param editorState
     */
    onTextEditorStateChange(editorState) {
        this.props.onEditorStateChange(
            this.props.element,
            {
                path: 'options.text',
                value: draftToHtml(convertToRaw(editorState.getCurrentContent()))
            }
        );

        this.setState({
            editorState: editorState
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                wrapperClassName="text-editor-root-wrapper"
                editorClassName="text-editor-wrapper"
                onEditorStateChange={this.onTextEditorStateChange}
                toolbar={this.props.toolbarOptions}
                localization={{
                    locale: 'ru',
                }}
            />
        );
    }
}

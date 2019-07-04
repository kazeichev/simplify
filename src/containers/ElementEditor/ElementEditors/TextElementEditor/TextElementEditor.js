import React, { Component } from 'react';

import TextEditor from '../../../TextEditor/TextEditor';
import ElementEditor from '../../ElementEditor';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {editElement} from "../../../../actions/editorActions";

const editorToolbar = {
    options: [
        'inline',
        'fontSize',
        'fontFamily',
        'list',
        'textAlign',
        'history'
    ],
};

const elementEditorOptions = {
    options: ['color', 'lineHeight', 'indent']
};

class TextElementEditor extends Component {

    /**
     * @returns {*}
     */
    render() {
        return (
            <div style={{overflow: 'auto', maxHeight: '90vh', padding: '20px'}}>
                <TextEditor
                    onEditorStateChange={this.props.edit}
                    element={this.props.element}
                    toolbarOptions={editorToolbar}
                />
                <ElementEditor
                    onElementEditorStateChange={this.props.edit}
                    options={elementEditorOptions}
                    element={this.props.element}
                />
            </div>
        );
    }
}

/**
 * @param dispatch
 * @returns {{edit: (editElement|ActionCreator<any>|ActionCreatorsMapObject<any>)}}
 */
const mapActionsToProps = dispatch => {
    return {
        edit: bindActionCreators(editElement, dispatch)
    }
};

export default connect(null, mapActionsToProps)(TextElementEditor)

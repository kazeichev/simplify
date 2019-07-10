import React, {Component} from 'react';

import { connect } from "react-redux";
import {dropToEditor} from "../../actions/editorActions";
import { bindActionCreators } from "redux";

import createComponent from '../../utils/ComponentFactory';
import {Container, Draggable} from 'react-smooth-dnd';

import './Editor.scss';
import {TYPE_EDITOR} from "../../utils/constants";

class Editor extends Component {
    /**
     * @returns {*}
     */
    render() {
        return (
            <div className="editor">
                <div className="editor__preview">
                    <Container
                        groupName="1"
                        getChildPayload={i => this.props.items[i]}
                        onDrop={e => this.props.dropToEditor(e)}
                        onDropReady={e => {
                            // Добавляем элементу флаг, что мы дропнули его вне ряда
                            return e.payload.isInsideRow = false;
                        }}
                        dropPlaceholder={{
                            animationDuration: 150,
                            className: 'element-drop-preview'
                        }}
                    >
                        {
                            this.props.items ? this.props.items.map((element, i) => {
                                const component = createComponent(
                                    element,
                                    TYPE_EDITOR
                                );

                                return (
                                    <Draggable key={i}>
                                        {component}
                                    </Draggable>
                                );
                            }) : null
                        }
                    </Container>
                </div>
            </div>
        );
    }
}

/**
 * @param state
 */
const mapStateToProps = state => {
    return {
        items: state.editorReducer.items
    };
};

/**
 * @param dispatch
 */
const mapActionsToProps = dispatch => {
    return {
        dropToEditor: bindActionCreators(dropToEditor, dispatch)
    }
};

export default connect(mapStateToProps, mapActionsToProps)(Editor);

import React, {Component} from 'react';
import './ToolBar.scss';

import shortid from 'shortid';
import {Tabs, Tab} from "react-bootstrap";
import createComponent from "../../utils/ComponentFactory";
import createEditor from '../../utils/EditorFactory';

import {Container, Draggable} from 'react-smooth-dnd';

import {TYPE_TOOLBAR} from "../../utils/constants";
import update from "immutability-helper";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";
import {faCopy, faTrashAlt} from "@fortawesome/free-regular-svg-icons/index";

import * as models from '../../Models';
import {connect} from "react-redux";
import {closeEditableElement} from "../../actions/toolbarActions";
import {copyElement, removeElement} from "../../actions/editorActions";
import {bindActionCreators} from "redux";

class ToolBar extends Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            rows: models.rows.map(model => model.getDefaultParameters()),
            elements: models.elements.map(model => model.getDefaultParameters()),
            options: models.options.map(model => model.getDefaultParameters())
        };
    }

    /**
     *
     * @param e
     * @param option
     */
    updateId(e, option) {
        const element = e.payload;
        let state = this.state,
            index = this.state[option].findIndex(x => x.id === element.id);

        if (index !== -1) {
            if (element.children) {

                let newChildren = element.children.map(el => {
                    let element = {...el};
                    element.id = shortid.generate();
                    return element;
                });

                state = update(state, {
                    [option]: {
                        [index]: {
                            $merge: {
                                children: newChildren
                            }
                        }
                    }
                });
            }

            this.setState(update(state, {
                [option]: {
                    [index]: {
                        $merge: {
                            id: shortid.generate()
                        }
                    }
                }
            }));
        }
    }

    /**
     * @returns {*}
     */
    render() {
        return (
            <div className="toolbar">
                <div className="toolbar__tabs">
                    {
                        !this.props.editableElement
                            ? <Tabs defaultActiveKey="structure" id="toolbar__tabs-wrapper">
                                <Tab eventKey="structure" title="Структура">
                                    <Container
                                        groupName="1"
                                        behaviour="copy"
                                        getChildPayload={i => this.state.rows[i]}
                                        onDragStart={e => {
                                            if (e.payload && e.payload.containerType === TYPE_TOOLBAR) {
                                                this.updateId(e, 'rows');
                                            }
                                        }}
                                    >
                                        {
                                            this.state.rows.map((element, i) => {
                                                return (
                                                    <Draggable
                                                        key={i}
                                                        style={{display: 'inline-block', padding: '10px'}}
                                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                                                    >
                                                        {createComponent(element, TYPE_TOOLBAR)}
                                                    </Draggable>
                                                );
                                            })
                                        }
                                    </Container>
                                </Tab>
                                <Tab eventKey="elements" title="Элементы">
                                    <Container
                                        groupName="1"
                                        behaviour="copy"
                                        getChildPayload={i => this.state.elements[i]}
                                        onDragStart={e => {
                                            if (e.payload && e.payload.containerType === TYPE_TOOLBAR) {
                                                this.updateId(e, 'elements')
                                            }
                                        }}
                                    >
                                        {
                                            this.state.elements.map((element, i) => {
                                                return (
                                                    <Draggable
                                                        key={i}
                                                        style={{display: 'inline-block', padding: '10px'}}
                                                        className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                                                    >
                                                        {createComponent(element, TYPE_TOOLBAR)}
                                                    </Draggable>
                                                );
                                            })
                                        }
                                    </Container>
                                </Tab>
                                <Tab eventKey="settings" title="Настройки">
                                </Tab>
                            </Tabs>
                            : <div className="toolbar_editor-wrapper">
                                <div className="toolbar_editor-menu">
                                    <div
                                        className="toolbar_editor-icon icon-copy"
                                        title="Копировать"
                                        onClick={
                                            () => this.props.copyEditableElement(this.props.editableElement)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCopy} size="2x"/>
                                    </div>
                                    <div
                                        className="toolbar_editor-icon icon-remove"
                                        title="Удалить"
                                        onClick={
                                            () => {
                                                this.props.closeEditableElement();
                                                this.props.removeEditableElement(this.props.editableElement);
                                            }
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} size="2x"/>
                                    </div>
                                    <div
                                        className="toolbar_editor-icon icon-back"
                                        title="Закрыть"
                                        onClick={
                                            () => this.props.closeEditableElement()
                                        }
                                    >
                                        <FontAwesomeIcon icon={faLongArrowAltRight} size="2x"/>
                                    </div>
                                </div>
                                {createEditor(this.props.editableElement)}
                            </div>
                    }
                </div>
            </div>
        );
    }
}

/**
 * @param state
 * @returns {{editableElement: *}}
 */
const mapStateToProps = state => {
    return {
        editableElement: state.toolbarReducer.element
    };
};

/**
 * @param dispatch
 * @returns {{closeEditableElement: (closeEditableElement|ActionCreator<any>|ActionCreatorsMapObject<any>)}}
 */
const mapActionsToProps = dispatch => {
    return {
        closeEditableElement: bindActionCreators(closeEditableElement, dispatch),
        copyEditableElement: bindActionCreators(copyElement, dispatch),
        removeEditableElement: bindActionCreators(removeElement, dispatch)
    }
};

export default connect(mapStateToProps, mapActionsToProps)(ToolBar);

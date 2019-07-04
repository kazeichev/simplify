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

import Models from '../../Models';
import {connect} from "react-redux";
import {closeEditableElement} from "../../actions/toolbarActions";
import {bindActionCreators} from "redux";

class ToolBar extends Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        let items = Models.map((model) => {
            return model.getDefaultParameters()
        });

        this.state = {
            items: items
        };
    }

    /**
     * @param e
     */
    updateId(e) {
        const element = e.payload;
        let index = this.state.items.findIndex(x => x.id === element.id);
        if (index === -1) index = 1;
        this.setState(update(this.state, {
            items: {
                [index]: {
                    $merge: {
                        id: shortid.generate()
                    }
                }
            }
        }));
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
                                        getChildPayload={i => this.state.items[i]}
                                        onDragStart={e => this.updateId(e)}
                                    >
                                        {
                                            this.state.items.map((element, i) => {
                                                const tabRow = ['RowElement'];
                                                if (tabRow.includes(element.type)) {
                                                    return (
                                                        <Draggable
                                                            key={i}
                                                            style={{display: 'inline-block', padding: '10px'}}
                                                            className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                                                        >
                                                            {createComponent(element, TYPE_TOOLBAR)}
                                                        </Draggable>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })
                                        }
                                    </Container>
                                </Tab>
                                <Tab eventKey="elements" title="Элементы">
                                    <Container
                                        groupName="1"
                                        behaviour="copy"
                                        getChildPayload={i => this.state.items[i]}
                                        onDragStart={e => this.updateId(e)}
                                    >
                                        {
                                            this.state.items.map((element, i) => {
                                                const elementsRow = ['TextElement', 'ButtonElement'];
                                                if (elementsRow.includes(element.type)) {
                                                    return (
                                                        <Draggable
                                                            key={i}
                                                            style={{display: 'inline-block', padding: '10px'}}
                                                            className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                                                        >
                                                            {createComponent(element, TYPE_TOOLBAR)}
                                                        </Draggable>
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })
                                        }
                                    </Container>
                                </Tab>
                                <Tab eventKey="settings" title="Настройки">
                                </Tab>
                            </Tabs>
                            : <div className="toolbar_editor-wrapper">
                                <div className="toolbar_editor-icon-back" title="Закрыть" onClick={
                                    () => this.props.closeEditableElement()
                                }>
                                    <FontAwesomeIcon icon={faLongArrowAltRight} size="2x"/>
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
        closeEditableElement: bindActionCreators(closeEditableElement, dispatch)
    }
};

export default connect(mapStateToProps, mapActionsToProps)(ToolBar);

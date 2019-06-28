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

class ToolBar extends Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this);
        this.closeEditor = this.closeEditor.bind(this);

        this.state = {
            items: [
                {
                    id: shortid.generate(),
                    type: 'TextElement',
                    options: {
                        text: 'Новый текст',
                        style: {
                            color: '#676a6c',
                            backgroundColor: 'transparent',
                            paddingLeft: '15px',
                            paddingRight: '15px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            marginLeft: '0px',
                            marginRight: '0px',
                            marginTop: '0px',
                            marginBottom: '0px',
                            lineHeight: '1.5em'
                        },
                        className: '',
                        edit: this.edit,
                        closeEditor: this.closeEditor
                    }
                },
                {
                    id: shortid.generate(),
                    type: 'ButtonElement',
                    options: {
                        text: 'Новая кнопка',
                        style: {
                            color: '#fff',
                            backgroundColor: '#1ab394',
                            borderLeft: '0px solid',
                            borderRight: '0px solid',
                            borderTop: '0px solid',
                            borderBottom: '0px solid',
                            borderColor: '#1ab39',
                            borderRadius: '5px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            marginLeft: '0px',
                            marginRight: '0px',
                            marginTop: '0px',
                            marginBottom: '0px',
                            textAlign: 'center',
                            outline: 'none'
                        },
                        className: '',
                        link: '',
                        edit: this.edit,
                        closeEditor: this.closeEditor
                    }
                },
                // {
                //     id: shortid.generate(),
                //     type: 'RowElement',
                //     options: {}
                // }
            ],
            editor: {
                enabled: false,
                type: null
            }
        };
    }

    /**
     * @param element
     */
    updateId(element) {
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
     * @param payload
     */
    onDragStart({payload}) {
        this.updateId(payload);
    }

    /**
     * @param element
     * @param callback
     */
    edit(element, callback) {
        element.callback = callback;
        this.setState(
            {
                editor: {
                    enabled: !this.state.editor.enabled,
                    element: element
                }
            })
    }


    closeEditor() {
        this.setState({
            editor: {
                enabled: false,
                element: null
            }
        })
    }

    /**
     * @returns {*}
     */
    render() {
        return (
            <div className="toolbar">
                <div className="toolbar__tabs">
                    {
                        !this.state.editor.enabled
                            ? <Tabs defaultActiveKey="structure" id="toolbar__tabs-wrapper">
                                <Tab eventKey="structure" title="Структура">
                                    <Container
                                        groupName="1"
                                        behaviour="copy"
                                        getChildPayload={i => this.state.items[i]}
                                        onDragStart={e => this.onDragStart(e)}
                                    >
                                        {
                                            this.state.items.map((element, i) => {
                                                const component = createComponent(element, TYPE_TOOLBAR);
                                                return (
                                                    <Draggable
                                                        key={i}
                                                        style={{display: 'inline-block', padding: '10px'}}
                                                        className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                                                    >
                                                        {component}
                                                    </Draggable>
                                                );
                                            })
                                        }
                                    </Container>
                                </Tab>
                                <Tab eventKey="elements" title="Элементы">
                                </Tab>
                                <Tab eventKey="settings" title="Настройки">
                                </Tab>
                            </Tabs>
                            : <div className="toolbar_editor-wrapper">
                                <div className="toolbar_editor-icon-back" title="Закрыть" onClick={
                                    () => this.setState({editor: {enabled: !this.state.editor.enabled}})
                                }>
                                    <FontAwesomeIcon icon={faLongArrowAltRight} size="2x"/>
                                </div>
                                {createEditor(this.state.editor.element)}
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default ToolBar;

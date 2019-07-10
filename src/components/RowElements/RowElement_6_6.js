import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeading} from "@fortawesome/free-solid-svg-icons/faHeading";
import ToolBarElement from '../ToolBarElement/ToolBarElement';
import EditorControlElement from '../../containers/EditorControlElement/EditorControlElement';
import {Col, Row} from "react-bootstrap";
import {TYPE_EDITOR, TYPE_TOOLBAR} from "../../utils/constants";
import {Container, Draggable} from "react-smooth-dnd";
import createComponent from "../../utils/ComponentFactory";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {dropToEditor} from "../../actions/editorActions";
import * as _ from 'lodash';

class RowElement_6_6 extends React.Component {
    render() {
        const icon = <FontAwesomeIcon icon={faHeading} size="2x"/>;
        const payload = this.props.containerType === TYPE_EDITOR ? this.props.element.children : [];
        const data =
            <Row style={{minHeight: '140px'}}>
                {
                    payload.map((element, i) => {
                        return (
                            <Col sm={6} key={i}>
                                <Container
                                    groupName="1"
                                    onDropReady={e => {
                                        // Добавляем элементу флаг, что мы дропнули его внутрь ряда
                                        return e.payload.isInsideRow = true;
                                    }}
                                    getChildPayload={index => element.children[index]}
                                    onDrop={e => {
                                        // Если элемент дропается внутрь ряда
                                        if (e.payload.isInsideRow) {
                                            console.log(element)
                                            let childElement = {...e};
                                            childElement.payload.parentRow = this.props.element;
                                            childElement.payload.parentCol = _.cloneDeep(element);
                                            return this.props.dropToEditor(childElement)
                                        }
                                    }}
                                    dropPlaceholder={{
                                        animationDuration: 150,
                                        className: 'element-drop-preview'
                                    }}
                                >
                                    {
                                        element.children ? element.children.map((child, y) => {
                                            const component = createComponent(
                                                child,
                                                TYPE_EDITOR
                                            );

                                            return (
                                                <Draggable key={y}>
                                                    {component}
                                                </Draggable>
                                            );
                                        }) : null
                                    }
                                </Container>
                            </Col>
                        );
                    })
                }
            </Row>;

        return this.props.containerType === TYPE_TOOLBAR
            ? <ToolBarElement icon={icon} text="Ряд" id={this.props.element.id}/>
            : <EditorControlElement
                defaultHovered={true}
                data={data}
                element={this.props.element}
            />;
    }
}

const mapStateToProps = state => {
    return {
        parentElement: state.editorReducer.items
    }
};

const mapActionsToProps = dispatch => {
    return {
        dropToEditor: bindActionCreators(dropToEditor, dispatch)
    }
};

export default connect(mapStateToProps, mapActionsToProps)(RowElement_6_6)

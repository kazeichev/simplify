import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Editor from './Editor/Editor';
import ToolBar from './ToolBar/ToolBar';

import {Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';


class App extends Component {

    render() {

        // Возможные элементы для DnD
        const editorTools = [
            {id: 1, text: "Item 1", type: 'Card'},
            {id: 2, text: "Item 2", type: 'Card'},
        ];

        // Изначальное состояние эелементов внутри редактора
        const initialState = [
            // {id: "UWu7Yznw4", text: "Sample Text", type: "Card"},
            // {id: "px8eOBt9H", text: "Sample Text", type: "Card"},
            // {id: "bJa-C1-L1", text: "Sample Text", type: "Card"},
        ];


        return (
            <Row
                style={{margin: 0, padding: '15px 0', width: '100%', height: '100%'}}
                className="simplify"
            >
                <Col sm={4} md={4} lg={4} xl={4}>
                    <ToolBar id={1} elements={editorTools}/>
                </Col>
                <Col sm={8} md={8} lg={8} xl={8}>
                    <Editor id={2} elements={initialState}/>
                </Col>
            </Row>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);

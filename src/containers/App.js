import React, {Component} from 'react';

import Editor from './Editor/Editor';
import ToolBar from './ToolBar/ToolBar';

import {Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

import './App.scss';

class App extends Component {

    render() {

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
                    <ToolBar id={1} />
                </Col>
                <Col sm={8} md={8} lg={8} xl={8}>
                    <Editor id={2} items={initialState}/>
                </Col>
            </Row>
        );
    }
}

export default App;

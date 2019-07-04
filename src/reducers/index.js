import editorReducer from './editorReducer';
import toolbarReducer from './toolbarReducer';

import {combineReducers} from "redux";

export default combineReducers({editorReducer, toolbarReducer});

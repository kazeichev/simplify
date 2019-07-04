import * as types from '../actions/actionTypes';

const initialState = {
    element: null
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.TYPE_OPEN_EDITABLE_ELEMENT:
            return {
                ...state,
                element: action.payload
            };
        case types.TYPE_CLOSE_EDITABLE_ELEMENT:
            return {
                ...state,
                element: null
            };
        default:
            return state;
    }
}

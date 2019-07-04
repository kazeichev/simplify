import * as types from './actionTypes';

/**
 * @param element
 * @returns {{payload: *, type: string}}
 */
export const openEditableElement = (element) => {
    return {
        type: types.TYPE_OPEN_EDITABLE_ELEMENT,
        payload: element
    }
};

/**
 * @param element
 * @returns {{payload: *, type: string}}
 */
export const closeEditableElement = element => {
    return {
        type: types.TYPE_CLOSE_EDITABLE_ELEMENT,
        payload: element
    }
};

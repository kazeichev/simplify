import * as types from './actionTypes';

/**
 * @param element
 * @returns {{payload: *, type: string}}
 */
export const dropToEditor = element => {
    return {
        type: types.TYPE_ELEMENT_DROPPED,
        payload: element
    }
};

/**
 * @param element
 * @returns {{payload: *, type: string}}
 */
export const copyElement = element => {
    return {
        type: types.TYPE_COPY_ELEMENT,
        payload: element
    }
};

/**
 * @param element
 * @returns {{payload: *, type: string}}
 */
export const removeElement = element => {
    return {
        type: types.TYPE_REMOVE_ELEMENT,
        payload: element
    }
};

/**
 * @param element
 * @param changedValue
 * @returns {{payload: {element: *, changed: *}, type: string}}
 */
export const editElement = (element, changedValue) => {
    return {
        type: types.TYPE_EDIT_ELEMENT,
        payload: {
            element: element,
            changed: changedValue
        }
    }
};

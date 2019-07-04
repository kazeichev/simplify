import * as types from '../actions/actionTypes';
import {applyDrag} from "../utils/ApplyDrag";
import shortid from "shortid";
import * as _ from 'lodash';

const initialState = {
    items: []
};

export default (state = initialState, action = {}) => {
    if (action.payload) {
        let element = {...action.payload};
        let items = [...state.items];
        let index = null;

        switch (action.type) {
            case types.TYPE_ELEMENT_DROPPED:
                return {
                    ...state,
                    items: applyDrag(items, element)
                };
            case types.TYPE_COPY_ELEMENT:
                index = _.findIndex(items, {id: element.id});

                if (index !== -1) {
                    let copiedElement = _.cloneDeep(element);
                    copiedElement.id = shortid.generate();
                    items.splice(index, 0, copiedElement);
                }

                return {
                    ...state,
                    items: items
                };
            case types.TYPE_REMOVE_ELEMENT:
                index = _.findIndex(items, {id: element.id});

                if (index !== -1) {
                    items.splice(index, 1);
                }

                return {
                    ...state,
                    items: items
                };
            case types.TYPE_EDIT_ELEMENT:
                index = _.findIndex(items, {id: element.element.id});

                if (index !== -1) {
                    let path = action.payload.changed.path.split('.');
                    let object = _.cloneDeep(items[index]);
                    let editableElement = _.cloneDeep(object);

                    for (let i = 0; i < path.length; i++) {
                        if (path.length - i === 1) {
                            object[path[i]] = action.payload.changed.value;
                        } else {
                            object = object[path[i]];
                        }
                    }

                    if (path.includes('styles')) {
                        editableElement.options.styles = object;
                    } else {
                        editableElement.options = object;
                    }

                    items[index] = editableElement;
                }

                return {
                    ...state,
                    items: items
                };
            default:
                return state;
        }
    } else {
        return state;
    }
}

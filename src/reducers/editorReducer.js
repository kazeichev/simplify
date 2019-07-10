import * as types from '../actions/actionTypes';
import {applyDrag} from "../utils/helpers";
import shortid from "shortid";
import * as _ from 'lodash';

const initialState = {
    items: []
};

/**
 * @param state
 * @param action
 * @returns {{items: Array}|({items}&{items: *[]})}
 */
export default (state = initialState, action = {}) => {
    if (action.payload) {
        let element = {...action.payload};
        let items = [...state.items];
        let index = null;

        switch (action.type) {
            case types.TYPE_ELEMENT_DROPPED:
                let parentRow = element.payload.parentRow,
                    parentCol = element.payload.parentCol;

                // Если мы дропаем внутрь ряда
                if (parentRow && parentCol) {
                    const parentRowIndex = _.findIndex(items, el => el.id === parentRow.id),
                          parentColIndex = _.findIndex(items[parentRowIndex].children, el => el.id === parentCol.id);
                    let currentElementIndex = _.findIndex(items, el => el.id === element.payload.id);

                    // В массиве item-ов ищем текущий row, в текущем row ищем col, в который был произведен дроп
                    // затем в свойство children col-a обавляем текущей дропнутый элемент
                    if (items && items[parentRowIndex] && parentColIndex !== -1) {
                        items[parentRowIndex].children[parentColIndex].children =
                            applyDrag(items[parentRowIndex].children[parentColIndex].children, element);
                    }

                    // Проверка на случай если при перетягивании из окна редактора внутрь ряда элемент не был удален
                    if (currentElementIndex !== -1) {
                        items.splice(currentElementIndex, 1);
                    }

                // Если мы дропаем вне ряда
                } else {
                    items = applyDrag(items, element)
                }

                return {
                    ...state,
                    items: items
                };
            case types.TYPE_COPY_ELEMENT:
                let copiedElement = _.cloneDeep(element);
                copiedElement.id = shortid.generate();

                // TODO тут творится какая-то хрень с поиском parentColIndex. Решил отказаться от проброса col, оставить только row.
                if (element.isInsideRow) {
                    const parentRowIndex = _.findIndex(items, el => el.id = element.parentRow.id),
                          parentColIndex = _.findIndex(
                              items[parentRowIndex].children,
                                  el => {
                                    return el.children.map(elm => {
                                        console.log('elm.id', elm.id)
                                        console.log('element.id', element.id)
                                        return elm.id === element.id
                                    })
                              }),
                          currentElementIndex = _.findIndex(items[parentRowIndex].children[parentColIndex].children, el => el.id === element.id);

                    if (currentElementIndex !== -1) {
                        items[parentRowIndex].children[parentColIndex].children.splice(currentElementIndex, 0, copiedElement);
                    }

                } else {
                    index = _.findIndex(items, {id: element.id});
                    if (index !== -1) {
                        items.splice(index, 0, copiedElement);
                    }
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

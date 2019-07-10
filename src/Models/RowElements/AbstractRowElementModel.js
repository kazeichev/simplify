import shortid from "shortid";

export default class AbstractRowElementModel {
    static getDefaultParameters() {
        return {
            id: shortid.generate(),
            type: 'RowElement',
            options: {
                styles: {},
                className: '',
            },
            children: []
        }
    }
}

import shortid from "shortid";

export default class ColElementModel {
    static getDefaultParameters() {
        return {
            id: shortid.generate(),
            type: 'ColElement',
            options: {
                styles: {},
                className: '',
            },
            children: []
        }
    }
}

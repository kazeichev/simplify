import shortid from "shortid";

export default class TextElementModel {
    static getDefaultParameters() {
        return {
            id: shortid.generate(),
            type: 'TextElement',
            options: {
                text: 'Новый текст',
                styles: {
                    color: '#676a6c',
                    backgroundColor: 'transparent',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    marginLeft: '0px',
                    marginRight: '0px',
                    marginTop: '0px',
                    marginBottom: '0px',
                    lineHeight: '1.5em'
                },
                className: '',
            }
        }
    }
}

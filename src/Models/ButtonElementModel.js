import shortid from "shortid";

export default class ButtonElementModel {
    static getDefaultParameters() {
        return {
            id: shortid.generate(),
            type: 'ButtonElement',
            options: {
                text: 'Новая кнопка',
                styles: {
                    color: '#ffffff',
                    backgroundColor: '#1ab394',
                    borderLeft: '0px solid',
                    borderRight: '0px solid',
                    borderTop: '0px solid',
                    borderBottom: '0px solid',
                    borderColor: '#1ab39',
                    borderRadius: '5px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    marginLeft: '0px',
                    marginRight: '0px',
                    marginTop: '0px',
                    marginBottom: '0px',
                    textAlign: 'center',
                    outline: 'none'
                },
                className: '',
                link: ''
            }
        }
    }
}

import AbstractRowElementModel from "./AbstractRowElementModel";
import ColElementModel from '../ColElementModel';

export default class RowElementModel_6_6 extends AbstractRowElementModel{
    static getDefaultParameters() {
        return {
            ...super.getDefaultParameters(),
            ...{
                children: [
                    ColElementModel.getDefaultParameters(),
                    ColElementModel.getDefaultParameters()
                ]
            }
        }
    }
}

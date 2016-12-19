import ILoggedInUser from '../../../../Authentication/Models/ILoggedInUser';
import * as LayerEvent from '../DataLayerEvent';
import DataLayerEventType from '../DataLayerEventType';

export default class PageVirtualLoggedInUserEvent extends LayerEvent.DataLayerEvent {
    public userId: string;
    public segment: string;

    constructor(pageVirtual: string, loggedInUser: ILoggedInUser) {
        super(DataLayerEventType.pageVirtual);

        this.pageVirtual = pageVirtual;
        this.userId = loggedInUser.customerKey.toString();
        this.segment = loggedInUser.segment;
    }
}
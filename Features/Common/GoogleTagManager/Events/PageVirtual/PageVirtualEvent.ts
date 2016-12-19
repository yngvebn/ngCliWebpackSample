import * as LayerEvent from '../DataLayerEvent';
import DataLayerEventType from '../DataLayerEventType';

export default class PageVirtualEvent extends LayerEvent.DataLayerEvent {
    constructor(pageVirtual: string) {
        super(DataLayerEventType.pageVirtual);

        this.pageVirtual = pageVirtual;
    }
}
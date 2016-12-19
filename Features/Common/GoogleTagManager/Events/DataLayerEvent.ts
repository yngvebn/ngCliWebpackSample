export abstract class DataLayerEvent {
    event: string;
    pageVirtual: string;

    constructor(event: string) {
        this.event = event;
    }

    toObject() {
        return JSON.parse(JSON.stringify(this));
    }
}
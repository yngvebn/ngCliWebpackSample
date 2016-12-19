export class ModalContainer {
    destroy: Function;
    closeClass: string;
    componentIndex: number;
    closeModal(): void {
        this.destroy();
    }
}
export function Modal() {
    return target => {
        (<any>Object).assign(target.prototype, ModalContainer.prototype);
    };
}

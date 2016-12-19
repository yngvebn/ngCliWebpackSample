import * as _ from 'lodash';
import Start from '../../Program/Models/Start';

export default class StartButton {
    canSelectNoStart;
    canSelectScratched;
    legNumber;
    start: Start | { startNumber: number, scratched: boolean };
    startNumber;
    active;
    name;
    selected: boolean;

    scratched() {
        return !this.start ? false : this.start.scratched;
    };

    selectable() {
        return this.canSelectThis();
    }

    canDisable;


    canSelectThis() {
            if (!this.canSelectNoStart && !this.start) return false;
            if (this.start.scratched && !this.canSelectScratched) return false;
            return true;
    }

    constructor(startNumber: number) {
        this.init({ startNumber: startNumber, scratched: false }, startNumber, true, true, true);
    }

    init(start: Start|{startNumber:number, scratched: boolean}, legNumber: number, canSelectNoStart: boolean, canSelectScratched: boolean, canDisable: boolean) {
        this.canSelectNoStart = canSelectNoStart;
        this.canSelectScratched = canSelectScratched;
        this.legNumber = legNumber;
        this.start = start;
        if (start instanceof Start) {
            this.active = true;
        } else {
            this.active = false;
        }
        this.startNumber = this.start.startNumber;
        
        this.canDisable = canDisable;
    }
    
    private isStart(start: any) {
        return start instanceof Start;
    }

    toggle() {
        let getSelectableStatus = (start: Start | { startNumber: number, scratched: boolean }) => {
            if (!this.isStart(start) && !this.canSelectNoStart) return false;
            if (start.scratched && !this.canSelectScratched) return false;
            return true;
        }

        var selectableStatus = getSelectableStatus(this.start);
        if (selectableStatus) {
            this.selected = !this.selected;
        }
    }
}
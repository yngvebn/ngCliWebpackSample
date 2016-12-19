import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import Tall from '../../../../../Common/Filters/Tall';
import { IPriceInfoDisplayItem } from './IPriceInfoDisplayItem';

@Component({
    selector: 'editable-select',
    templateUrl: 'EditableSelectComponent.tpl.html',
    providers: [Tall]
})
export default class EditableSelectComponent implements OnInit {
    private tall: Tall;
    @Input() items: IPriceInfoDisplayItem[];
    @Input() selectedItem: IPriceInfoDisplayItem;
    @Output() onSelect = new EventEmitter<IPriceInfoDisplayItem>();

    optionsVisible = false;

    constructor(tall: Tall) {
        this.tall = tall;
    }

    options: {
        selectedItem: IPriceInfoDisplayItem,
        currentValue: string,
    } = {
        selectedItem: null,
        currentValue: ''
    }


    select(item, dontHide?: boolean) {
        if (!item) return;
        this.options.currentValue = item.name;
        this.options.selectedItem = item;
        if (!dontHide)
            this.hideOptions();

        this.onSelect.emit(this.options.selectedItem);
    }
    
    isSelected(item: IPriceInfoDisplayItem) {
        return item.value === this.options.selectedItem.value;
    }

    handleKeyPress($event) {
        var currentSelectedIndex;

        var items = this.items || [];
        if ($event.keyCode === 38) {
            currentSelectedIndex = _.findIndex(items, this.options.selectedItem);
            if (currentSelectedIndex === 0) {
                this.select(items[items.length - 1], true);
            } else {
                this.select(items[currentSelectedIndex - 1], true);
            }
            $event.preventDefault();
        }
        else if ($event.keyCode === 40) {
            currentSelectedIndex = _.findIndex(items, this.options.selectedItem);
            if (currentSelectedIndex === items.length - 1) {
                this.select(items[0], true);
            } else {
                this.select(items[currentSelectedIndex + 1], true);
            }
            $event.preventDefault();
        } else {
            this.hideOptions();
        }
    }

    toggleOptions($event) {
        $event.preventDefault();
        this.optionsVisible = !this.optionsVisible;
    }

    hideOptions() {
        window.setTimeout(() => {
            this.optionsVisible = false;
        }, 150);
    }

    updateSelectedItem(val) {
        if (!this.options.selectedItem || (this.options.selectedItem.name !== val)) {
            this.options.selectedItem = { name: val, value: parseFloat(val.replace(',', '.')) * 100 };
            this.onSelect.emit(this.options.selectedItem);
        }
    }

    init();

    init() {
        if (!this.options.selectedItem && !this.options.currentValue) {
            this.select(this.selectedItem);
        }
    }



    ngOnInit(): void {
        this.options.selectedItem = this.selectedItem;
    }
}
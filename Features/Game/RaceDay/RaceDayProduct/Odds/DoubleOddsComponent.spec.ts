import 'jasmine';
import { inject, TestBed, async, ComponentFixtureAutoDetect  } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RaceDayProductModule } from '../racedayproduct.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DoubleOddsComponent } from './DoubleOddsComponent';

describe('DoubleOddsComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RaceDayProductModule],
            declarations: [],
            //imports: [HttpModule, BrowserModule],
            providers: []
        });

        TestBed.compileComponents();
    });

    it('should run a test', () => {
        expect(true).toBe(true);
    });

    it('should be declared', inject([DoubleOddsComponent], (cmp: DoubleOddsComponent) => async(() => {
        expect(cmp).toBeDefined();
    })));
});
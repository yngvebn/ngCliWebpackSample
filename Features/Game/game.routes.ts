import { Routes, ActivatedRoute, Params } from '@angular/router';

import * as GameComponent1 from './GameComponent';
import * as DayComponent from './RaceDay/RaceDayComponent';
import BettingSystemIsOpenForBetResolve from './RaceDay/RaceDayProduct/BettingSystemIsOpenForBetResolve';
import { RaceDayProductComponent } from './RaceDay/RaceDayProduct/RaceDayProductComponent';
import PriceInfoForProductResolve from './RaceDay/RaceDayProduct/PriceInfoForProductResolve';
import ProgramDataResolve from './RaceDay/RaceDayProduct/ProgramDataResolve';
import ProductTimelineComponent from './RaceDay/ProductTimeline/ProductTimelineComponent';
import * as RaceDayResolve from './RaceDay/SelectedRaceDayResolve';
import * as InvestmentResolve from './RaceDay/TotalInvestmentResolve';
import * as ProductsForRaceDayResolve from './RaceDay/ProductsForRaceDayResolve';
import PurchaseComponent from './RaceDay/RaceDayProduct/Purchase/PurchaseComponent';
export const GameRoutes: Routes = [
    {
        path: '',
        component: GameComponent1.GameComponent,
        children: [
            {
                path: ':raceDayKey',
                component: DayComponent.RaceDayComponent,
                resolve: {
                    selectedRaceDay: RaceDayResolve.SelectedRaceDayResolve,
                    totalInvestment: InvestmentResolve.TotalInvestmentResolve,
                    productsForRaceDay: ProductsForRaceDayResolve.ProductsForRacedayResolve,
                    bettingSystemIsOpenForBet: BettingSystemIsOpenForBetResolve
                },
                children: [
                    {
                        path: '',
                        component: ProductTimelineComponent
                    }
                ]
            },
            {
                path: ':raceDayKey/:product',
                component: DayComponent.RaceDayComponent,
                resolve: {
                    selectedRaceDay: RaceDayResolve.SelectedRaceDayResolve,
                    totalInvestment: InvestmentResolve.TotalInvestmentResolve,
                    productsForRaceDay: ProductsForRaceDayResolve.ProductsForRacedayResolve,
                    bettingSystemIsOpenForBet: BettingSystemIsOpenForBetResolve
                },
                children: [
                    {
                        path: '',
                        component: RaceDayProductComponent,
                        resolve: {
                            priceInfoForProduct: PriceInfoForProductResolve,
                            programData: ProgramDataResolve
                        },
                        children: [{
                            path: 'bekreft',
                            component: PurchaseComponent
                        }]

                    }
                ]
            }
        ]
    }
];
export namespace Routes {
    export namespace Game {
        export const stateName = 'game';
        export const url = '';
    }

    export namespace RaceDay {

        export const stateName = Game.stateName + '.raceDay';
        export const url = ':raceDayKey';

        export class Timeline {
            public static stateName = Routes.RaceDay.stateName + ".timeline";
            public static url = '';
        }

        export class Product {
            public static stateName = Routes.RaceDay.stateName + ".product";
            public static url = '/:product/?betData';
        }

        export class Purchase {
            public static stateName = Routes.RaceDay.Product.stateName + ".purchase";
            public static url = "bekreft";
        }
    }
}
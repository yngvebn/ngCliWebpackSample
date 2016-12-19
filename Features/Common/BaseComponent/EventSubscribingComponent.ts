export abstract class EventSubscribingComponent {
    protected eventSubscriptions: (() => void)[] = [];

    protected abstract $onInit();

    protected $onDestroy() {
        while (this.eventSubscriptions.length > 0)
            this.eventSubscriptions.pop()();
    }
}

export function ServiceHostListener(eventName: string, args?: any[]): any {
    return (service: any) => {
        window.addEventListener(eventName.replace('window:', ''), (event) => {
            console.log(service);
            service.apply(service, event['details'] || null);
            console.log('from serviceHostListener', event);
        });
    }
}
import {ViewContainerRef, Injectable, ComponentRef, ComponentFactoryResolver, Type, ReflectiveInjector} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs/Rx';
import {ModalComponent } from './ModalComponent';

@Injectable()
export class ModalService {
    public activeInstances: number = 0;
    factoryResolver: ComponentFactoryResolver;
    constructor(factoryResolver: ComponentFactoryResolver) {
        this.factoryResolver = factoryResolver;
    }

    public createModal<T>(component: Type<T>, vcRef: ViewContainerRef, parameters?: Object): Observable<ComponentRef<T>> {
        let modalComponentRef$ = new ReplaySubject();
        let modalComponent = this.factoryResolver.resolveComponentFactory(ModalComponent);
        let modalComponentRef = vcRef.createComponent(modalComponent);

        let compFactory = this.factoryResolver.resolveComponentFactory(component);
        let componentRef = modalComponentRef.instance.viewContainerRef.createComponent(compFactory);
        (<any>Object).assign(componentRef.instance, parameters); // pass the @Input parameters to the instance
        this.activeInstances++;

        modalComponentRef.instance['componentIndex'] = this.activeInstances;
        componentRef.instance['destroy'] = () => {
            this.activeInstances--;
            modalComponentRef.instance['closeClass'] = 'ngdialog-closing';
            setTimeout(() => {
                modalComponentRef.destroy();
            }, 400);
        };
        modalComponentRef.instance['destroy'] = () => {
            this.activeInstances--;
            modalComponentRef.instance['closeClass'] = 'ngdialog-closing';
            setTimeout(() => {
                modalComponentRef.destroy();
            }, 400);
        };

        modalComponentRef$.next(modalComponentRef);
        modalComponentRef$.complete();
        return <Observable<ComponentRef<T>>>modalComponentRef$.asObservable();
    }
}
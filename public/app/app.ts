import {OnInit} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
// import {MessageService} from './services/MessageService';
import {FirstComponent} from './components/component1/component';

@Component({
    selector: 'app',
    template: `<component></component>`,
    // directives: [FirstComponent]
})

export class CombineComponents implements OnInit {

	constructor(){}

	ngOnInit(){}
}

bootstrap(CombineComponents, []).catch(err => console.error(err)); //services injected here are singletons available app-wide
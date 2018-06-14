/// <reference path="../../vendor.d.ts"/>

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class MessageService {
	message$: Observable<object>;
	private _messageObserver: Observable<object>;

	constructor() {
		this.message$ = new Observable(observer => {
			this._messageObserver = observer;
		}).share();
	}

	broadcast(msgName:string, msgData?:Array<any>) {
		this._messageObserver["next"]({ name: msgName, data: msgData });
	}
}

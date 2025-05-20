import { Injectable } from '@angular/core';
import {
  Observable,
  Observer,
  Subscription,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  ConnectableObservable,
  interval
} from 'rxjs';
import { publish } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  basicObservable(): Observable<number> {
    return new Observable((observer: Observer<number>) => {
      observer.next(1);
      observer.next(2);
      observer.complete();
    });
  }

  private subject = new Subject<number>();
  emitSubjectValue(value: number) {
    this.subject.next(value);
  }
  getSubject(): Subject<number> {
    return this.subject;
  }

  private behavior = new BehaviorSubject<number>(0);
  emitBehaviorValue(value: number) {
    this.behavior.next(value);
  }
  getBehavior(): BehaviorSubject<number> {
    return this.behavior;
  }

  private replay = new ReplaySubject<number>(2);
  emitReplayValue(value: number) {
    this.replay.next(value);
  }
  getReplay(): ReplaySubject<number> {
    return this.replay;
  }

  private async = new AsyncSubject<number>();
  emitAsyncValue(value: number, complete = false) {
    this.async.next(value);
    if (complete) {
      this.async.complete();
    }
  }
  getAsync(): AsyncSubject<number> {
    return this.async;
  }

  getConnectable(): ConnectableObservable<number> {
    const source$ = interval(1000).pipe(publish()) as ConnectableObservable<number>;
    return source$;
  }
}

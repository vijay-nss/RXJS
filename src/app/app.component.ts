import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RxjsService } from './Service/rxjs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RXJS';
  private subscriptions: Subscription[] = [];

  constructor(public rxjs: RxjsService) { }


  ngOnInit(): void {
    this.basicObserv();
    this.basicSubject();
    this.basicBehaviorSubject();
    this.basicReplay();
  }

  basicObserv() {
    console.log('*********************************** OBSERVABLE ************************************')
    const sub$ = this.rxjs.basicObservable().subscribe({
      next: (res => {
        console.log('Observable:', res);
      }),
      //  complete: () => console.log('')
    })
    this.subscriptions.push(sub$);
  }

  basicSubject() {
    console.log('*********************************** SUBJECT ************************************')
    const sub$ = this.rxjs.getSubject().subscribe({
      next: (v =>
        console.log('Subject:', v)
      )
    });
    this.rxjs.emitSubjectValue(10);
    this.rxjs.emitSubjectValue(20);
    this.subscriptions.push(sub$);
  }

  basicBehaviorSubject() {
    console.log('*********************************** BEHAVIOR SUBJECT ************************************')
    const sub$ = this.rxjs.getBehavior().subscribe({
      next: (v =>
        console.log('Behavior:', v)
      )
    });
    this.rxjs.emitBehaviorValue(10);
    this.rxjs.emitBehaviorValue(20);
    this.subscriptions.push(sub$);
  }

  basicReplay() {
    console.log('*********************************** REPLAY ************************************')
    const sub$ = this.rxjs.getReplay().subscribe({
      next: (v =>
        console.log('Replay:', v)
      )
    });
    this.rxjs.emitReplayValue(10);
    this.rxjs.emitReplayValue(20);
    this.rxjs.emitReplayValue(30);
    
    const sub$1 = this.rxjs.getReplay().subscribe({
      next: (v =>
        console.log('Last 2 Values:', v)
      )
    });
    this.subscriptions.push(sub$);
    this.subscriptions.push(sub$1);
  }

}

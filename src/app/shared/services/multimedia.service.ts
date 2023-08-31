import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>()
  
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement
  public timeLapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject ('')

  constructor() { 
    this.audio = new Audio ()
    this.trackInfo$.subscribe(responseOK => {
      if (responseOK) {
        this.setAudio(responseOK)
      }

    })

    this.listenAllEvents()
  }

  private listenAllEvents(): void{
    
    this.audio.addEventListener('timeupdate', this.calculateTime, false)

  }

  private calculateTime = () => {
    console.log('Triggering event')
    const { duration, currentTime } = this.audio
    console.table([duration, currentTime])
    this.setTimeLapsed(currentTime)
    this.setRemaining(currentTime, duration)
  }


  private setTimeLapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60) // this operation will return an integer,previously the log table showed a decimal number 
    let minutes = Math.floor((currentTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes} : ${displaySeconds}`
    this.timeLapsed$.next(displayFormat)
  }

  private setRemaining(currentTime: number, duration: number) {
    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft % 60) // this operation will return an integer,previously the log table showed a decimal number 
    let minutes = Math.floor((timeLeft / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `- ${displayMinutes} : ${displaySeconds}`
    this.timeRemaining$.next(displayFormat)

  }


  //PUBLIC FUNCTION

  public setAudio(track: TrackModel): void{
    console.log('service with the track info', track);
    this.audio.src = track.url
    this.audio.play()
  }

}










// export class MultimediaService {

//   callback: EventEmitter<any> = new EventEmitter<any>()
  
//   myObservable1$:Observable<any> = new Observable()

//   Subject
//   myObservable1$: Subject<any> = new Subject()

//   BehaviorSubject (Is necessary inicializate it)
//   myObservable1$: BehaviorSubject<any> = new BehaviorSubject('Sending value to media player component')

//   constructor() {

//     BehaviorSubject
//     setTimeout(() => {
//       this.myObservable1$.next('Sending value to media player component')
//     }, 1000)

//     Subject
//     A Subject is both an Observable and an Observer, so we can use the methods inline, next to it (.next, .complete, .error)
//     Use a setTimeout to let the component's ngOnInit run before the service's method
//     setTimeout(() => {
//       this.myObservable1$.next('Sending value to media player component')
//     },1000)


//     this.myObservable1$ = new Observable(
//       (observer: Observer<any>) => {
//         observer.next('This is the value send to the observable1$ subscription')
        
//         setTimeout(() => {
//           observer.complete()//this observer send complete to the subscription, therefore all other observables will be stopped 
//         },1000)

//         setTimeout(() => {
//           observer.next('Every 2,5 seconds this observer send value to the subscription')
//         },2500)

//         setTimeout(() => {
//           observer.error('Every 3,5 seconds this observer send error to the subscription')
//         },3500)
//       }
    
//     )
//   }
// }

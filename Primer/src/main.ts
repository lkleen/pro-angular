import { Observable, Observer, Subject } from "rxjs";

function receiveEvents(observable: Observable<string>) {
  observable.subscribe({
    next: str => {console.log(`received: ${str}`);},
    complete: () => console.log("end")
  });
}

function sendEvents(observer: Observer<string>) {
  let count = 5;
  for (let i = 0; i < count; i++) {
    observer.next (`event ${i}`);
  }
  observer.complete ();
}

let subject = new Subject<string>();
receiveEvents(subject);
sendEvents(subject);

import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class ConnectionService {
  private connEvents: Subject<boolean>;

  constructor() {
    this.connEvents = new Subject<boolean>();
    window.addEventListener("online", e=> this.handleConnectionChange(e));
  }

  handleConnectionChange(event: any) {
    this.connEvents.next(this.connected);
  }

  get connected(): boolean {
    return window.navigator.onLine;
  }

  get changes(): Observable<boolean> {
    return this.connEvents;
  }
}

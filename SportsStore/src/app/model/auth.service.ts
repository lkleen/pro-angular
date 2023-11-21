import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RestDataSource} from "./rest.datasource";

@Injectable()
export class AuthService {

  constructor(private datasource: RestDataSource) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.datasource.authenticate(username, password);
  }

  get authenticated(): boolean {
    return this.datasource.authToken != null;
  }

  clear() {
    this.datasource.authToken = undefined
  }

}

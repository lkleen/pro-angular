import {Injectable} from "@angular/core";
import {AuthService} from "../model/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.authenticated) {
      this.router.navigateByUrl("/");
      return false;
    }
    return true;
  }

}

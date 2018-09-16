import {
  map
} from 'rxjs/operators';
import {
  AuthService
} from 'shared/services/auth.service';
import {
  CanActivate
} from '@angular/router';
import {
  Injectable
} from '@angular/core';
import {
  UserService
} from 'shared/services/user.service';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) {}


  canActivate(): Observable < boolean > {
    return this.auth.AppUser$.pipe(
        map(appUser => appUser.isAdmin));
  }
}

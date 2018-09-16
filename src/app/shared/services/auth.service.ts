import {
  UserService
} from 'shared/services/user.service';
import {
  AppUser
} from 'shared/models/app-user';
import {
  Observable , of
} from 'rxjs';
import {
  AngularFireAuth
} from 'angularfire2/auth';
import {
  Injectable
} from '@angular/core';
import * as firebase from 'firebase';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  switchMap
} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable < firebase.User > ;

  constructor(private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  get AppUser$(): Observable < AppUser > {
    return this.user$.pipe(
      switchMap(user =>  {
        if (user) {
          return this.userService.get(user.uid);
        }
        return of(null);
      }
      )
    );
  }
}

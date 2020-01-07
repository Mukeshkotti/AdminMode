import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { Constants } from '../constant.component';
import { Profile } from '../_models/profile';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private userDetailSubject: BehaviorSubject<Profile>;
    public userDetail: Observable<Profile>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.userDetailSubject = new BehaviorSubject<Profile>(JSON.parse(localStorage.getItem('userProfile')));
        this.userDetail = this.userDetailSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get userDetailValue(): Profile {
        return this.userDetailSubject.value;
    }

    login(login: string, password: string) {
        return this.http.post<any>(`${Constants.SERVER_URL}${Constants.LOGIN_API}`, { login, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.payload));
                this.currentUserSubject.next(user.payload);
                return user.payload;
            }));
    }

    userProfile(){
        return this.http.get<any>(`${Constants.SERVER_URL}${Constants.USER}`)
            .pipe(map(response => {
                localStorage.setItem('userProfile', JSON.stringify(response.payload));
                this.userDetailSubject.next(response.payload);
                return response.payload;
            }))
    }


    logout() {
        return this.http.get<any>(`${Constants.SERVER_URL}${Constants.LOGOUT}`)
                .pipe(map(res => {
                    // remove user from local storage to log user out
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('userProfile');
                    this.currentUserSubject.next(null);
                    this.userDetailSubject.next(null);
                    this.router.navigateByUrl('login');
                    return res;
                }));
        }
}
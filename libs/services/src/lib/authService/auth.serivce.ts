import { InjectionToken, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@ecommerce-angular/environments';
import { jwtDecode } from "jwt-decode";



interface MyTokenPayload {
  id: string,
  cartID: string,
  email: string
  username: string
  exp: number
  iat: number
}

@Injectable({
  providedIn: 'root',
})
export class AuthSerivce {
  private http = inject(HttpClient);
  cookies = inject(CookieService);

  private triggerSubject = new Subject<void>();

  trigger$ = this.triggerSubject.asObservable();

  redirectUrl = signal<string | undefined>('');

  loginForm = signal<boolean>(false);

  // isUserLogedin = signal<boolean>(true);
  isUserLogedin = signal<boolean>(!!this.getToken());


  prop1 = 123
  get userData() {
    const data = this.cookies.get('userdata');
    return data ? JSON.parse(data) : null;
  }

  get token() {
    if (this.cookies.get('token')) return JSON.parse(this.cookies.get('token'));
  }

  get decodedToken() {
    const decoded: MyTokenPayload = jwtDecode(this.token)
    return decoded
  }

  listOfUserForAdmin(queries: any): Observable<any> {
    return this.http.get(`${environment.adminApiUrl}/users/listUsers${queries}`)
  }

  updateUserDatails(userID: string, fieldToUpdate: string, newValue: any): Observable<any> {
    return this.http.put(`${environment.adminApiUrl}/users/updateUser`, {
      userID: userID,
      fieldToUpdate: fieldToUpdate,
      newValue: newValue
    })
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/signin/`, userData).pipe(
      tap((res: any) => {
        const decoded: MyTokenPayload = jwtDecode(res.token)

        this.cookies.set(
          'userdata',
          JSON.stringify({
            id: decoded.id,
            cartID: decoded.cartID,
            email: decoded.email,
            username: decoded.username,
          }),
        );

        this.setToken(res?.token);
        this.isUserLogedin.set(true);

      }),
    );
  }

  regster(userData: any) {
    return this.http.post('http://localhost:8000/auth/register/', userData).pipe(
      tap((res: any) => {
        if (res.token) {

          const decoded: MyTokenPayload = jwtDecode(res.token)

          this.cookies.set(
            'userdata',
            JSON.stringify({
              id: decoded.id,
              cartID: decoded.cartID,
              email: decoded.email,
              username: decoded.username,
            }),
          );

          this.setToken(res?.token);
          this.isUserLogedin.set(true);
        }
      }),
    );
  }

  openLoginForm() {
    this.loginForm.set(true);
    // console.log(this.loginForm())
  }

  closeLoginForm() {
    this.loginForm.set(false);
    // console.log(this.loginForm())
  }

  setToken(token: string) {
    this.cookies.set('token', JSON.stringify(token));
  }

  getToken() {
    return this.cookies.get('token');
  }

  deleteToken() {
    this.cookies.delete('token');
    this.cookies.delete('userdata');
    window.location.reload();
  }
}

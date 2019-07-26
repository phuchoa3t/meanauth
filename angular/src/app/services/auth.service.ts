import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

    authToken: any;
    user: any;
  constructor(private http: HttpClient) { }

  registerUser(user) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application-json');
      return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .pipe(map(res => {
          return res
      }));
  }

  authenticateUser(user) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .pipe(map(res => {
          return res
      }));
  }

  loadToken() {
      const token = localStorage.getItem('token')
      this.authToken = token
  }
  getProfile() {
      let headers = new HttpHeaders();
      this.loadToken()

// console.log(this.authToken)
// this.authToken = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzcwOTI2NjdjYjU2NDMwMzZkNDkwMCIsIm5hbWUiOiJQaHVjIEhvYSIsImVtYWlsIjoicGh1Y2hvYTN0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicGh1Y2hvYTN0IiwiaWF0IjoxNTYzOTgzNTY2LCJleHAiOjE1NjQ1ODgzNjZ9.OUxdE9mRUBXspa-zyqDHorB-L3QGXLFt-d8HIsI6WwE';
      // headers.headers.append('Authorization', this.authToken)
      // headers.headers.append('Content-Type', 'application/json');
    //   const httpOptions = {
    //   headers1 =  new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': this.authToken
    //   })
    // };
      // console.log(headers.getHeaders())
      return this.http.get('http://localhost:3000/users/profile', headers)
      .pipe(map(res => {
          return res
      }));
  }

  storeUserData(token) {
      localStorage.setItem('token', token)
      this.authToken = token
  }

  logout() {
      this.authToken = null;
      localStorage.clear()
  }
}

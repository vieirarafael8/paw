import { Injectable } from '@angular/core';
import { AuthData } from './auth-data-model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

const BACKEND_URL_USER = environment.apiUrl + '/user/';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userId: string;
  admin = false;
  totalGasto = 0;

  private users: User[] = [];
  private usersUpdated = new Subject<{users: User[], userCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    if (!this.isAuthenticated) {
        this.router.navigate(['/auth/login']);
    }
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsersUpdated() {
    return this.usersUpdated.asObservable();
  }

  createUser(
    nome: string,
    email: string,
    NIF: number,
    morada: string,
    password: string,
    numCartao: number,
    validade: Date,
    ccv: number,
    totalGasto: number
  ) {
    const authData: AuthData = {
      nome,
      email,
      NIF,
      morada,
      password,
      numCartao,
      validade,
      ccv,
      totalGasto
    };
    this.http
      .post(BACKEND_URL_USER + 'signup', authData)
      .subscribe(response => {
        this.router.navigate(['/auth/login']);
      }, error => {
          error.error.message = 'O Email introduzido já se encontra registado!';
          this.authStatusListener.next(false);
      });
  }

  getUsers(userPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${userPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; users: any; maxUsers: number }>(
        BACKEND_URL_USER + 'listar/' + queryParams
      )
      .pipe(
        map((usersData) => {
        return {
          users: usersData.users.map(user => {
            return {
              id: user._id,
              nome: user.nome,
              email: user.email,
              NIF: user.NIF,
              morada: user.morada,
              password: user.password,
              numCartao: user.numCartao,
              validade: user.validade,
              ccv: user.ccv,
              totalGasto: user.totalGasto
            };
          }),
          maxUsers: usersData.maxUsers
        };
      })
    )
      .subscribe(transformedUsersData => {
        this.users = transformedUsersData.users;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformedUsersData.maxUsers
        });
      });
  }

  getUser(id: string) {
    return this.http.get<{
      nome: string,
      email: string,
      NIF: number,
      morada: string,
      password: string,
      numCartao: number,
      validade: Date,
      ccv: number,
      totalGasto: number
    }>(BACKEND_URL_USER + id);
  }

  getIfAdmin() {
    return this.admin;
  }

  login(email: string, password: string) {
    const loginData = {
      email,
      password
    };
    this.http
      .post<{ token: string, expiresIn: number, userId: string }>(
        BACKEND_URL_USER + 'login',
        loginData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresDuration = response.expiresIn;
          this.setAuthTimer(expiresDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          if (this.userId === '5cddb3a670fffa33ec9bc45f') {
            this.admin = true;
            this.router.navigate(['/auth/admin']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.router.navigate(['/auth/login']);
        }
      }, error => {
        this.authStatusListener.next(false);
        this.router.navigate(['/auth/login']);
      });
    }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      if (this.userId === '5cddb3a670fffa33ec9bc45f') {
        this.admin = true;
        this.authStatusListener.next(true);
      }
      this.authStatusListener.next(true);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.admin = false;
    this.router.navigate(['/auth/login']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token && !expirationDate) {
      this.router.navigate(['/auth/login']);
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
    };
  }
  deleteU(userId: string) {
    return this.http.delete(BACKEND_URL_USER + 'listar/' + userId);
  }

}

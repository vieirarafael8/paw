import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-listagem-users',
  templateUrl: './listagem-users.component.html',
  styleUrls: ['./listagem-users.component.css']
})
export class ListagemUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private userSub: Subscription;
  isLoading = false;
  totalUsers = 0;
  usersPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;

  constructor(
  private authService: AuthService,
  private reservaService: ReservaService,
  private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.getUsers(this.usersPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.userSub = this.authService.getUsersUpdated()
      .subscribe(
        (userData: { users: User[]; userCount: number }) => {
          this.isLoading = false;
          this.totalUsers = userData.userCount;
          this.users = userData.users;
        }
      );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.authService.getUsers(this.usersPerPage, this.currentPage);

  }

  onDelete(userId: string) {
    this.isLoading = true;
    this.authService.deleteU(userId).subscribe(() => {
      this.authService.getUsers(this.usersPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onConfirmarReserva() {

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}

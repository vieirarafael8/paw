import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private admin: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.admin = false;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      if (this.authService.getIfAdmin()) {
        this.admin = true;
      }
    });
  }

  onLoginAdmin() {
    if (this.authService.getIfAdmin()) {
      this.admin = true;
      return this.admin;
    }
  }

  onLogout() {
    this.authService.logout();
    this.admin = false;
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.admin = false;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { PageEvent } from '@angular/material';
import { EspacoService } from '../services/espaco.service';
import { Espaco } from '../models/espaco.model';
import { User } from '../models/user.model';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../models/reserva.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  espacos: Espaco[] = [];
  espaco: Espaco;
  private espacoSub: Subscription;
  isLoading = false;
  totalEspacos = 0;
  espacoPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
  totalGasto: number;
  numeroClientes = 0;
  private userSub: Subscription;
  usersPerPage = 5;
  users: User[] = [];
  reservas: Reserva;
  private reservaSub: Subscription;
  numTotalSecret = 0;

  constructor(
    public espacosService: EspacoService,
    public reservasService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.calculosAuxiliares();
    this.calculosAuxiliares2();
    this.isLoading = true;
    this.espacosService.getEspacos(this.espacoPerPage, this.currentPage);
    this.espacoSub = this.espacosService
      .getEspacoUpdateListener()
      .subscribe(
        (espacosData: { espacos: Espaco[]; espacoCount: number }) => {
          this.isLoading = false;
          this.totalEspacos = espacosData.espacoCount;
          this.espacos = espacosData.espacos;
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
    this.espacoPerPage = pageData.pageSize;
    this.espacosService.getEspacos(this.espacoPerPage, this.currentPage);
    this.authService.getUsers(this.espacoPerPage, this.currentPage);

  }

  calculosAuxiliares() {

    this.isLoading = true;
    this.espacosService.getCountClientes().subscribe(
      (data) => {
        this.numeroClientes =  data['clientes'].length;
        this.isLoading = false;
      },
    );
    return this.numeroClientes;
  }

  calculosAuxiliares2() {

    this.isLoading = true;
    this.espacosService.getSecretarias().subscribe(data => {

      this.numTotalSecret = data['clientes'].map((x) =>  x.numComp).reduce((x, y) => x + y);
      this.isLoading = false;

    });
    return this.numTotalSecret;
  }

  ngOnDestroy() {
    this.espacoSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}

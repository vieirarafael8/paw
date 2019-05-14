import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemReservasComponent } from './listagem-reservas.component';

describe('ListagemReservasComponent', () => {
  let component: ListagemReservasComponent;
  let fixture: ComponentFixture<ListagemReservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemReservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

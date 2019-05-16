import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemUsersComponent } from './listagem-users.component';

describe('ListagemUsersComponent', () => {
  let component: ListagemUsersComponent;
  let fixture: ComponentFixture<ListagemUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

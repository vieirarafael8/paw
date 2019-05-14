import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEspacoComponent } from './criar-espaco.component';

describe('CriarEspacoComponent', () => {
  let component: CriarEspacoComponent;
  let fixture: ComponentFixture<CriarEspacoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarEspacoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarEspacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RealtyPageComponent } from './realty-page.component';

describe('RealtyPageComponent', () => {
  let component: RealtyPageComponent;
  let fixture: ComponentFixture<RealtyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

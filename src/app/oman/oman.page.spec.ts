import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmanPage } from './oman.page';

describe('OmanPage', () => {
  let component: OmanPage;
  let fixture: ComponentFixture<OmanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

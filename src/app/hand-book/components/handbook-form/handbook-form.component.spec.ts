import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandbookFormComponent } from './handbook-form.component';

describe('HandbookFormComponent', () => {
  let component: HandbookFormComponent;
  let fixture: ComponentFixture<HandbookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandbookFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandbookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

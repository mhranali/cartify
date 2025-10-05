import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificBrandsComponent } from './specific-brands.component';

describe('SpecificBrandsComponent', () => {
  let component: SpecificBrandsComponent;
  let fixture: ComponentFixture<SpecificBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificBrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

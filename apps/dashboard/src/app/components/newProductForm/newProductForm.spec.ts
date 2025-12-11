import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewProductForm } from './newProductForm';

describe('NewProductForm', () => {
  let component: NewProductForm;
  let fixture: ComponentFixture<NewProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProductForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

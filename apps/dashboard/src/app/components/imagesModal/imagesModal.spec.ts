import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagesModal } from './imagesModal';

describe('ImagesModal', () => {
  let component: ImagesModal;
  let fixture: ComponentFixture<ImagesModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

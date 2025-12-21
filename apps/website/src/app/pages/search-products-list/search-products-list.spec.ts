import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductsList } from './search-products-list';

describe('SearchProductsList', () => {
  let component: SearchProductsList;
  let fixture: ComponentFixture<SearchProductsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProductsList],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchProductsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

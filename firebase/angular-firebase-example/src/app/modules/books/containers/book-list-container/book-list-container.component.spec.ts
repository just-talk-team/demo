import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListContainerComponent } from './book-list-container.component';

describe('BookListContainerComponent', () => {
  let component: BookListContainerComponent;
  let fixture: ComponentFixture<BookListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

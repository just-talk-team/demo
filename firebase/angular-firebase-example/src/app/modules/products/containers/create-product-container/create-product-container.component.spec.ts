import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductContainerComponent } from './create-product-container.component';

describe('CreateProductContainerComponent', () => {
  let component: CreateProductContainerComponent;
  let fixture: ComponentFixture<CreateProductContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

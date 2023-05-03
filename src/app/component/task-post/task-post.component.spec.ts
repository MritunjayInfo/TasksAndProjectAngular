import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPostComponent } from './task-post.component';

describe('TaskPostComponent', () => {
  let component: TaskPostComponent;
  let fixture: ComponentFixture<TaskPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LeadCommentService } from './lead-comment.service';

describe('LeadCommentService', () => {
  let service: LeadCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { UrgentTasksPipe } from './urgent-tasks.pipe';

describe('UrgentTasksPipe', () => {
  it('create an instance', () => {
    const pipe = new UrgentTasksPipe();
    expect(pipe).toBeTruthy();
  });
});

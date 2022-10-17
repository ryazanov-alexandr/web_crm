import { MyTasksPipe } from './my-tasks.pipe';

describe('MyTasksPipe', () => {
  it('create an instance', () => {
    const pipe = new MyTasksPipe();
    expect(pipe).toBeTruthy();
  });
});

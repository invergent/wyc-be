import UsersHelpers from '../UsersHelpers';

describe('Users Helpers', () => {
  // just testing to ensure the loop runs through the other parts of the if statements
  it('should filter claim data when certain parameters are missing', () => {
    const user = UsersHelpers.refineUserData([{}]);
    expect(user.branch).toBe(null);
    expect(user.lineManagerEmailAddress).toBe(null);
    expect(user.lineManagerEmailAddress).toBe(null);
  });
});

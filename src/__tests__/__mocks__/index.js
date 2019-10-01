export const mockReq = {
  body: {
    staffId: 'someId',
    password: 'password',
    confirmPassword: 'password',
    permittedMonths: ['July']
  },
  query: {
    hash: 'someHash'
  },
  currentStaff: { staffId: 'someId' },
  lineManager: {},
  params: { claimId: 'someClaim' },
  worksheet: 'worksheet',
  path: '',
  claim: { status: 'Pending', claimer: {} }
};

export const mockStaff = {
  staffId: 'someId',
  password: 'password',
  role: { name: 'someRoleName' },
  email: {},
  supervisor: {},
  BSM: {}
};

export const models = {
  password: 'password'
};

export const mockLoginCredentials = {
  body: {
    staffId: 'someId',
    password: 'password'
  }
};

export const mockEmail = {
  to: 'to',
  from: 'from',
  subject: 'subject',
  html: 'html'
};

export const mockSettings = [{
  emailSchedule: '* * * * *'
}];

export const mockStaffWithPendingClaims = [{
  'Staff.firstname': 'MockJoe',
  'Staff.email': 'mockEmail@Address.com'
},
{
  'Staff.firstname': 'MockDoe',
  'Staff.email': 'anotherMockEmail@Address.com'
},
{
  'Staff.firstname': 'LastMockUser',
  'Staff.email': 'lastMockEmail@Address.com'
}];

export const mockFilteredStaffWithPendingClaims = [{
  firstname: 'MockJoe',
  email: 'mockEmail@Address.com'
},
{
  firstname: 'MockDoe',
  email: 'anotherMockEmail@Address.com'
},
{
  firstname: 'LastMockUser',
  email: 'lastMockEmail@Address.com'
}];

export const mockEmailTemplate = {
  subject: 'subject',
  htmlMessage: 'htmlMessage'
};

export const formProperties = {
  signin: ['staffId', 'password'],
  login: ['email', 'password'],
  claim: ['overtime', 'weekend', 'shift', 'atm', 'outstation'],
  lineManager: ['idNumber', 'phone', 'firstname', 'lastname', 'email'],
  image: ['image'],
  reset: ['password', 'confirmPassword'],
  changePassword: ['currentPassword', 'newPassword', 'confirmPassword'],
  rpcOvertimeRequest: ['weekday', 'weekend', 'atm'],
  schedules: ['emailSchedule', 'overtimeWindowStart', 'overtimeWindowEnd', 'overtimeWindowIsActive'],
  staff: ['doc'],
  branch: ['doc'],
  single: ['staffId', 'firstname', 'lastname', 'email', 'phone', 'accountNumber'],
  multipleClaims: ['staffId', 'extraMonthsPermitted', 'extraMonthsData'],
  resendCredentials: ['staffId']
};

export const staffIdRegex = /^[DdFfGgSsTt][DdCcEeRrSsNn][0-9]{5,6}$/;
export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
export const solIdRegex = /^\d{3}$/;
export const phoneAccRegex = /^\d{10}$/;
export const numberRegex = /^\d+$/;
export const holidayRegex = /^(0?[0-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[0-1])$/;

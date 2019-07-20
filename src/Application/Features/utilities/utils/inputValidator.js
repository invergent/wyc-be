export const formProperties = {
  signin: ['staffId', 'password'],
  login: ['email', 'password'],
  claim: ['overtime', 'weekend', 'shift', 'atm', 'outstation'],
  lineManager: ['lineManagerRole', 'firstname', 'lastname', 'email'],
  image: ['image'],
  reset: ['password', 'confirmPassword'],
  changePassword: ['currentPassword', 'newPassword', 'confirmPassword'],
  rpcOvertimeRequest: ['weekday', 'weekend', 'atm'],
  schedules: ['emailSchedule', 'overtimeWindowStart', 'overtimeWindowEnd', 'overtimeWindowIsActive'],
  staff: ['excelDoc'],
  branch: ['excelDoc'],
  single: ['staffId', 'firstname', 'lastname', 'middlename', 'email', 'phone']
};

export const staffIdRegex = /^[Tt][Nn][0-9]{6}$/;
export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
export const solIdRegex = /^\d{4}$/;
export const phoneRegex = /^\d{11}$/;
export const numberRegex = /^\d$/;

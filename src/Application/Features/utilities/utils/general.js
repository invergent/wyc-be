export const claimTypeRates = {
  weekday: 150,
  weekend: 800,
  atm: 3000,
  shift: 800
};

export const authErrorCodes = {
  admin: 'ERRADMAUTH',
  staff: 'ERRSTFAUTH',
  lineManager: 'ERRLMRAUTH',
  passwordReset: 'ERRPSRAUTH'
};

export const authRoleName = {
  admin: 'currentAdmin',
  staff: 'currentStaff',
  lineManager: 'lineManager',
  passwordReset: 'currentReset'
};

export const exportDocHeaders = [
  'S/N', 'Staff No', 'Full Name', 'Sol ID', 'Branch', 'Job Function', 'Account Number',
  'Overtime', 'Weekend', 'Shift Duty', 'ATM Duty', 'ATM Support', 'Holiday', 'OutStation Allowance',
  'Amount', 'Status', 'Month of Claim', 'Approved By', 'Approver Email Address'
];

export const claimTypes = [
  'overtime', 'weekend', 'shiftDuty', 'atmDuty', 'atmSupport', 'holiday', 'outstation',
  'Amount', 'Status', 'Month of Claim', 'Approved By', 'Approver Email Address'
];

export const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const notificationActivities = {
  lineManagerApproved: 'Your claim was approved by your line manager. It is now being processed by Admin.',
  lineManagerDeclined: 'Your claim was declined by your line manager.',
  EditRequested: 'Your line manager requested edit on your claim submission.',
  adminProcessed: 'Your claim has been processed. It would be credited on payday.',
  adminPaid: 'Your claim has been paid.'
};

export const companyInfo = {};

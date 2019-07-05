export const templateNames = Object.freeze({
  Reset: 'Reset Staff',
  NewClaimLineManager: 'New Claim Line Manager',
  NewClaimStaff: 'New Claim Staff',
  lineManagerApproved: 'Line Manager Approved Staff',
  lineManagerDeclined: 'Line Manager Declined Staff',
  Cancelled: 'Claim Cancelled Staff',
  Completed: 'Claim Completed Staff',
  Reminder: 'Pending Claim Reminder Staff'
});

export const roleNames = Object.freeze({
  supervisor: 'supervisor',
  BSM: 'BSM'
});

export const eventNames = Object.freeze({
  ForgotPassword: 'ForgotPassword',
  NewClaim: 'NewClaim',
  lineManagerApproved: 'lineManagerApproved',
  lineManagerDeclined: 'lineManagerDeclined',
  Cancelled: 'Cancelled',
  Reminder: 'Reminder',
  LogActivity: 'LogActivity'
});

export const activityNames = Object.freeze({
  PasswordReset: 'Requested a PasswordReset.',
  ChangePassword: 'Updated password',
  ChangeBranch: 'Changed branch to {{branchName}}',
  NewClaim: 'Created a new claim',
  Cancelled: 'Cancelled claim'
});

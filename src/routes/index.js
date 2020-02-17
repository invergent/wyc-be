import express from 'express';
import Controller from '../Application';
import InputValidator from '../Application/Middlewares/InputValidator';
import Authenticator from '../Application/Middlewares/Authenticator';
import ClaimAccessControl from '../Application/Middlewares/ClaimAccessControl';
import Administration from '../Application/Middlewares/Administration';

const router = express.Router();

const { validateClaimAccess } = ClaimAccessControl;
const { validateExcelValues } = Administration;
const {
  forgotPassword, authoriseStaff, authoriseAdmin, authoriseLineManager, changePassword,
  updateBranch, confirmPasswordResetRequest, resetPassword, addOrChangeLineManager,
  createOvertimeClaim, pendingClaimsForlineManagers, approveClaim, declineClaim, cancelClaim,
  submittedClaims, exportDoc, updateSchedules, createStaff, createBranches, fetchSingleClaim,
  staffClaimStats, staffActivities, staffProfileData, staffClaimHistory, uploadImage,
  updateProfileInfo, fetchLineManagers, fetchBranches, fetchRoles, fetchNotifications,
  markNotificationsAsReadAndViewed, chartStatistics, fetchStaff, createSingleBranchOrStaff,
  companySettings, requestEdit, updateOvertimeClaim, addHoliday, remove, fetchSingleStaff,
  fetchAllHolidays, authoriseMultipleClaimsApplication, resendLoginCredentials, removeSingleStaff,
  authoriseBranchEdit, fetchLogs, dashboardStats, fetchAdmins, createAdmin, createSingleSupervisor,
  createSupervisors, removeSingleSupervisor, requestBranchEdit
} = Controller;
const {
  checkProps, checkEntries, checkBranchId, /* checkIdParams, */ validateForgotPasswordRequest, checkOvertimeProps,
  checkDocType, checkOvertimeValues, checkFileType, customValidator, checkScheduleProps
} = InputValidator;
const {
  authenticateAdmin, authenticateStaff, authenticateLineManager, verifyLineManager,
  destroyToken, authenticatePasswordReset, authenticateAdminOrStaff, onlySuperAdminAuditor
} = Authenticator;

router.post('/signin', checkProps, checkEntries, authoriseStaff);
router.post('/admin/login', checkProps, checkEntries, authoriseAdmin);
router.post('/forgot-password', validateForgotPasswordRequest, forgotPassword);
router.get('/confirm-reset-request', confirmPasswordResetRequest);
router.get('/destroy-token', destroyToken);
router.post('/change-password', authenticateAdminOrStaff, checkProps, checkEntries, changePassword);

router.get('/line-managers', authenticateAdminOrStaff, fetchLineManagers);
router.get('/line-manager/verify', verifyLineManager, authoriseLineManager);
router.get('/line-manager/claims/pending', authenticateLineManager, pendingClaimsForlineManagers);
router.put('/line-manager/claims/pending/:claimId/approve', authenticateLineManager, approveClaim);
router.put('/line-manager/claims/pending/:claimId/decline', authenticateLineManager, declineClaim);
router.put('/line-manager/claims/pending/:claimId/request-edit', authenticateLineManager, requestEdit);

router.get('/branches', authenticateAdminOrStaff, fetchBranches);

router.get('/roles', authenticateAdminOrStaff, fetchRoles);

router.get('/notifications', authenticateAdminOrStaff, fetchNotifications);
router.put('/notifications/read', authenticateAdminOrStaff, markNotificationsAsReadAndViewed);

router.get('/users/claims/statistics', authenticateStaff, staffClaimStats);
router.get('/users/claims/pending', authenticateStaff, staffClaimStats);
router.get('/users/claims/history', authenticateStaff, staffClaimHistory);
router.post('/users/claim', authenticateStaff, checkOvertimeProps, checkOvertimeValues, createOvertimeClaim);
router.put('/users/claims/:claimId', authenticateStaff, validateClaimAccess, checkOvertimeProps, checkOvertimeValues, updateOvertimeClaim);
router.delete('/users/claims/:claimId', authenticateStaff, validateClaimAccess, cancelClaim);

router.get('/users/activities', authenticateStaff, staffActivities);

router.get('/users/profile', authenticateAdminOrStaff, staffProfileData);
router.put('/users/profile', authenticateAdminOrStaff, customValidator, updateProfileInfo);
router.post('/users/profile/image', authenticateAdminOrStaff, checkProps, checkFileType, uploadImage);
router.post('/users/profile/line-manager', authenticateStaff, checkProps, checkEntries, addOrChangeLineManager);
router.put('/users/profile/branch', authenticateStaff, checkBranchId, updateBranch);
router.post('/users/profile/reset', authenticatePasswordReset, checkProps, checkEntries, resetPassword);
router.put('/users/profile/edit-branch/request', authenticateStaff, requestBranchEdit);


router.get('/admin/claims', authenticateAdmin, submittedClaims);
router.get('/admin/claims/dashboard-statistics', authenticateAdmin, dashboardStats);
router.get('/admin/claims/chart-statistics', authenticateAdmin, chartStatistics);
router.get('/admin/claims/:claimId', authenticateAdmin, fetchSingleClaim);
router.get('/admin/claims/export/:docType', authenticateAdmin, checkDocType, exportDoc);

router.get('/admin/settings', authenticateAdminOrStaff, companySettings);
router.put('/admin/settings/schedules', authenticateAdmin, checkScheduleProps, updateSchedules);

router.get('/admin/admins', authenticateAdmin, onlySuperAdminAuditor, fetchAdmins);
router.delete('/admin/admins/:staffId', authenticateAdmin, onlySuperAdminAuditor, removeSingleStaff);
router.post('/admin/admins', authenticateAdmin, onlySuperAdminAuditor, createAdmin);

router.get('/admin/staff', authenticateAdmin, fetchStaff);
router.get('/admin/staff/:staffId', authenticateAdmin, fetchSingleStaff);
router.delete('/admin/staff/:staffId', authenticateAdmin, removeSingleStaff);
router.post('/admin/staff', authenticateAdmin, checkProps, checkFileType, validateExcelValues, createStaff);
router.post('/admin/staff/single', authenticateAdmin, checkProps, checkEntries, createSingleBranchOrStaff);
router.put('/admin/staff/multiple-claims', authenticateAdmin, checkProps, checkEntries, authoriseMultipleClaimsApplication);
router.post('/admin/staff/resend-credentials', authenticateAdmin, checkProps, checkEntries, resendLoginCredentials);
router.post('/admin/staff/edit-branch/authorise', authenticateAdmin, customValidator, authoriseBranchEdit);

router.post('/admin/branch', authenticateAdmin, checkProps, checkFileType, validateExcelValues, createBranches);
router.post('/admin/branch/single', authenticateAdmin, checkEntries, createSingleBranchOrStaff);

router.post('/admin/supervisors', authenticateAdmin, checkProps, checkFileType, validateExcelValues, createSupervisors);
router.post('/admin/supervisors/single', authenticateAdmin, checkEntries, createSingleSupervisor);
router.delete('/admin/supervisors/:supervisorId', authenticateAdmin, onlySuperAdminAuditor, removeSingleSupervisor);

router.post('/admin/holidays', authenticateAdmin, customValidator, addHoliday);
// router.put('/admin/holidays/:holidayId', authenticateAdmin, checkIdParams, customValidator, updateOrDelete);
router.delete('/admin/holidays', authenticateAdmin, remove);
router.get('/admin/holidays', authenticateAdminOrStaff, fetchAllHolidays);
router.get('/admin/logs', authenticateAdmin, onlySuperAdminAuditor, fetchLogs);

export default router;

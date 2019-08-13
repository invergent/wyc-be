import helpers from '../utilities/helpers';
import services from '../utilities/services';
import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';
import UsersHelpers from '../utilities/helpers/UsersHelpers';

const { AdministrationHelpers } = helpers;
const {
  StaffService, BranchService, ClaimService, SettingService
} = services;

class Administration {
  static async createStaff(req) {
    const { worksheet } = req;
    const worksheetConverter = AdministrationHelpers.convertStaffWorksheetToObjectsArray;

    try {
      const staffArray = worksheetConverter(worksheet);
      const results = await StaffService.bulkCreateStaff(staffArray);
      const createdStaff = results.map(result => result.dataValues);
      return [201, `${createdStaff.length} staff created successfully.`, createdStaff];
    } catch (e) {
      console.log(e);
      if (e.name) return [409, e.errors[0].message];
      return [500, 'There was an error creating staff ERR500CRTSTF.', e];
    }
  }

  static async createSingleBranchOrStaff(req) {
    const { body } = req;
    const resource = req.path.includes('branch') ? 'Branch' : 'Staff';
    try {
      const [created] = req.path.includes('branch')
        ? await BranchService.findOrCreateSingleBranch(body)
        : await StaffService.findOrCreateSingleStaff(body);
      return [201, `${resource} created successfully.`, created];
    } catch (e) {
      console.log(e);
      if (e.name) return [409, e.errors[0].message];
      return [500, 'There was an error while creating resource.', e];
    }
  }

  static async createBranches(req) {
    const { worksheet } = req;
    const worksheetConverter = AdministrationHelpers.convertBranchWorksheetToObjectsArray;

    try {
      const branchesArray = worksheetConverter(worksheet);
      const results = await BranchService.bulkCreateBranches(branchesArray);
      const createdBranches = results.map(result => result.dataValues);
      return [201, `${createdBranches.length} branches created successfully.`, createdBranches];
    } catch (e) {
      console.log(e);
      return [500, 'There was an error creating branches ERR500CRTBRC.', e];
    }
  }

  static async submittedClaims() {
    try {
      const submittedClaims = await ClaimService.fetchSubmittedClaims();
      const statistics = await AdministrationHelpers.getClaimStatistics(submittedClaims);
      return [200, 'Request successful', { submittedClaims, statistics }];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500ADMDSH.'];
    }
  }

  static async chartStatistics() {
    try {
      const stats = await AdministrationHelpers.getChartStatistics();
      return [200, 'Request successful', stats];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500CHRTST.'];
    }
  }

  static async fetchStaff() {
    const attributes = ['staffId', 'firstname', 'middlename', 'lastname', ['email', 'emailAddress'], 'image'];
    try {
      const staffList = await AdministrationHelpers.fetchStaff(attributes);
      return [200, 'Request successful', staffList];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500FETSTF.'];
    }
  }

  static async fetchSingleStaff(req) {
    const { params: { staffId } } = req;
    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(staffId, ['lineManager', 'role', 'branch']);
      const refinedUser = UsersHelpers.refineUserData(staff);
      return [200, 'Request successful', refinedUser];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500FETSTF.'];
    }
  }

  static async fetchSingleClaim(req) {
    const { params: { claimId } } = req;
    try {
      const claim = await ClaimService.findClaimByPk(claimId, ['claimer']);
      const refinedUClaim = AdministrationHelpers.refineSingleClaimData(claim);
      return [200, 'Request successful', refinedUClaim];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500FETSTF.'];
    }
  }

  static async markClaimsAsCompleted() {
    try {
      const [updated] = await ClaimService.markClaimsAsCompleted();
      if (updated) notifications.emit(eventNames.Completed, []);

      return [
        200,
        updated
          ? `Successfully marked ${updated} claims as completed.`
          : 'No claims were marked as completed.'
      ];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred while marking claims as completed ERR500CLMMCC.', e];
    }
  }

  static async fetchSettings() {
    try {
      const settings = await SettingService.fetchSettings();
      return [200, 'Request successful!', settings];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred while fetching settings.', e];
    }
  }
}

export default Administration;

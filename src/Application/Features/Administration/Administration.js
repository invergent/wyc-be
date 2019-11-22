import crypto from 'crypto';
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

      const listOfCreatedStaff = results.map((result) => {
        const { staffId, firstname, email, password } = result.dataValues;
        return { staffId, firstname, email, password };
      });

      const createdStaff = listOfCreatedStaff.map(eachStaff => ({ ...eachStaff, password: undefined }));

      notifications.emit(eventNames.Activation, [listOfCreatedStaff]);

      return [201, `${createdStaff.length} staff created successfully.`, createdStaff];
    } catch (e) {
      console.log(e);
      if (e.name) return [409, e.errors[0].message];
      return [500, 'There was an error creating staff ERR500CRTSTF.', e];
    }
  }

  static async createSingleBranchOrStaff(req) {
    const { body } = req;
    const resourceName = req.path.includes('branch') ? 'Branch' : 'Staff';
    if (resourceName === 'Staff') body.password = crypto.randomBytes(3).toString('hex');

    try {
      const [resource, created] = resourceName === 'Branch'
        ? await BranchService.findOrCreateSingleBranch(body)
        : await StaffService.findOrCreateSingleStaff(body);

      if (resourceName === 'Staff' && created) {
        notifications.emit(eventNames.Activation, [[resource.toJSON()]]);
      }
      resource.password = undefined;
      return created
        ? [201, `${resourceName} created successfully.`, resource]
        : [409, `${resourceName} already exists.`, resource];
    } catch (e) {
      console.log(e);
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

  static async removeSingleStaff(req) {
    const { params: { staffId } } = req;
    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(staffId);
      if (!staff) return [404, 'Staff not found'];
      await staff.destroy();

      return [200, 'Staff removed!'];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem removing staff ERR500RMVSTF.'];
    }
  }

  static async fetchSingleClaim(req) {
    const { params: { claimId } } = req;
    try {
      const claim = await ClaimService.findClaimByPk(claimId, ['claimer']);
      if (!claim) return [200, 'Request successful!', {}];
      const refinedUClaim = AdministrationHelpers.refineSingleClaimData(claim);
      return [200, 'Request successful!', refinedUClaim];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500FETSCM.'];
    }
  }

  static async markClaimsAsCompleted() {
    try {
      const [updated] = await ClaimService.markClaimsAsCompleted();
      await StaffService.resetMultipleClaimsAuthorisations();
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

  static async authoriseMultipleClaimsApplication(req) {
    const { body: { staffId, extraMonthsPermitted, extraMonthsData } } = req;

    try {
      const updated = await StaffService.updateStaffInfo(staffId, { extraMonthsPermitted, extraMonthsData });
      return [updated ? 200 : 500, `Permission${updated ? '' : ' not'} granted!`];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred while authorising multiple claim application.', e];
    }
  }

  static async resendLoginCredentials(req) {
    const { body: { staffId } } = req;

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(staffId);
      if (staff.changedPassword) return [403, 'Password already changed'];
  
      notifications.emit(eventNames.Activation, [[staff]]);
      return [200, 'Activation email resent!'];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred while resending activation email.'];
    }
  }
}

export default Administration;

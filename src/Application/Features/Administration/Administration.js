import crypto from 'crypto';
import helpers from '../utilities/helpers';
import services from '../utilities/services';
import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';
import UsersHelpers from '../utilities/helpers/UsersHelpers';

const { AdministrationHelpers } = helpers;
const {
  StaffService, BranchService, LineManagerService, ClaimService, SettingService, ActivityService
} = services;

class Administration {
  static async createStaff(req) {
    const { worksheet, currentAdmin: { staffId: adminStaffId } } = req;
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
      notifications.emit(eventNames.LogActivity, [`Created ${createdStaff.length} staff`, { staffId: adminStaffId }]);

      return [201, `${createdStaff.length} staff created successfully.`, createdStaff];
    } catch (e) {
      console.log(e);
      if (e.name) return [409, e.errors[0].message];
      return [500, 'There was an error creating staff ERR500CRTSTF.', e];
    }
  }

  static async createSingleBranchOrStaff(req) {
    const { body, currentAdmin: { staffId } } = req;
    const resourceName = req.path.includes('branch') ? 'Branch' : 'Staff';
    if (resourceName === 'Staff') body.password = crypto.randomBytes(3).toString('hex');

    try {
      const [resource, created] = resourceName === 'Branch'
        ? await BranchService.findOrCreateSingleBranch(body)
        : await StaffService.findOrCreateSingleStaff(body);

      if (resourceName === 'Staff' && created) {
        notifications.emit(eventNames.Activation, [[resource.toJSON()]]);
      }
      if (created) {
        notifications.emit(eventNames.LogActivity, [`Created ${resourceName === 'Staff' ? 'staff' : 'branch'}`, { staffId }]);
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

  static async createAdmin(req) {
    const { body, currentAdmin: { staffId } } = req;
    body.email = body.email.toLowerCase();
    body.password = crypto.randomBytes(3).toString('hex');

    try {
      const [resource, created] = await StaffService.findOrCreateSingleStaff(body);
      if (created) {
        notifications.emit(eventNames.Activation, [[resource.toJSON()]]);
        notifications.emit(eventNames.LogActivity, [`Created ${body.staffId}`, { staffId }]);
      }
      resource.password = undefined;
      return created
        ? [201, 'Admin created successfully.', resource]
        : [409, 'Admin already exists.', resource];
    } catch (error) {
      console.log(error);
      return [500, 'There was an error while creating admin.', error];
    }
  }

  static async createBranches(req) {
    const { worksheet, currentAdmin: { staffId } } = req;
    const worksheetConverter = AdministrationHelpers.convertBranchWorksheetToObjectsArray;

    try {
      const branchesArray = worksheetConverter(worksheet);
      const results = await BranchService.bulkCreateBranches(branchesArray);
      const createdBranches = results.map(result => result.dataValues);
      notifications.emit(eventNames.LogActivity, [`Created ${createdBranches.length} branches`, { staffId }]);
      return [201, `${createdBranches.length} branches created successfully.`, createdBranches];
    } catch (e) {
      console.log(e);
      return [500, 'There was an error creating branches ERR500CRTBRC.', e];
    }
  }

  static async createSupervisors(req) {
    const { worksheet, currentAdmin: { staffId } } = req;
    const worksheetConverter = AdministrationHelpers.convertSupervisorWorksheetToObjectsArray;

    try {
      const lineManagers = worksheetConverter(worksheet);
      const results = await LineManagerService.bulkCreateLineManagers(lineManagers);
      const createdLineManagers = results.map(result => result.dataValues);
      notifications.emit(eventNames.WelcomeLineManager, [createdLineManagers]);
      notifications.emit(eventNames.LogActivity, [`Created ${lineManagers.length} line managers`, { staffId }]);
      return [201, `${lineManagers.length} supervisors created successfully.`, createdLineManagers];
    } catch (e) {
      console.log(e);
      return [500, 'There was an error creating branches ERR500CRTLMGR.', e];
    }
  }

  static async createSingleSupervisor(req) {
    const { body, currentAdmin: { staffId } } = req;

    try {
      const [resource, created] = await LineManagerService.findOrCreateLineManager(body);
      if (created) {
        notifications.emit(eventNames.WelcomeLineManager, [[resource]]);
        notifications.emit(eventNames.LogActivity, [`Created ${body.idNumber}`, { staffId }]);
        notifications.emit(eventNames.UpdateOnAppraisal, [resource]);
        return [201, 'Supervisor created successfully.', resource];
      }
      return [409, 'supervisor already exists.', resource];
    } catch (e) {
      console.log(e);
      return [500, 'There was an error creating supervisor ERR500CRTLMGR.', e];
    }
  }

  static async submittedClaims(req) {
    const { query, currentAdmin: { staffId } } = req;
    try {
      const { count, rows } = await ClaimService.fetchSubmittedClaims(query);
      const submittedClaims = AdministrationHelpers.filterAdminClaims(rows);

      if (+query.page === 1) {
        notifications.emit(eventNames.LogActivity, ['Viewed claims', { staffId }]);
      }
      return [200, 'Request successful', { count, submittedClaims }];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500ASUBCLM.'];
    }
  }

  static async dashboardStats() {
    try {
      const claims = await ClaimService.fetchSubmittedClaims();
      const statistics = await AdministrationHelpers.getClaimStatistics(claims);
      return [200, 'Request successful', statistics];
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

  static async fetchStaff(req) {
    const { query: { staffId, limit, staffOnly } } = req;
    const attributes = ['id', 'staffId', 'firstname', 'middlename', 'lastname', ['email', 'emailAddress'], 'image'];
    const options = {
      attributes, limit, staffId, staffOnly
    };
    try {
      const staffList = await AdministrationHelpers.fetchStaff(options);
      return [200, 'Request successful', staffList];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500FETSTF.'];
    }
  }

  static async fetchAdmins(req) {
    const { currentAdmin: { staffId } } = req;
    try {
      const admins = await StaffService.fetchAdmins();
      notifications.emit(eventNames.LogActivity, ['Viewed admins', { staffId }]);
      return [200, 'Request successful', admins];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500FETSTF.'];
    }
  }

  static async fetchSingleStaff(req) {
    const { params: { staffId }, currentAdmin: { staffId: adminStaffId } } = req;
    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(staffId, ['lineManager', 'role', 'branch']);
      const refinedUser = UsersHelpers.refineUserData(staff);
      notifications.emit(eventNames.LogActivity, [`Viewed ${staffId} profile`, { staffId: adminStaffId }]);
      return [200, 'Request successful', refinedUser];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem fetching claims ERR500FETSTF.'];
    }
  }

  static async removeSingleStaff(req) {
    const { params: { staffId }, currentAdmin: { staffId: adminStaffId } } = req;
    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(staffId);
      if (!staff) return [404, 'Staff not found'];
      await staff.destroy();
      notifications.emit(eventNames.LogActivity, [`Deleted ${staffId}`, { staffId: adminStaffId }]);
      return [200, 'Staff removed!'];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem removing staff ERR500RMVSTF.'];
    }
  }

  static async updateSingleSupervisor(req) {
    const {
      body: {
        idNumber, solId, firstname, lastname, email, phone
      },
      currentAdmin: { staffId }
    } = req;

    const payload = {
      idNumber, solId, firstname, lastname, email, phone
    };
    try {
      const [updated, [lineManager]] = await LineManagerService.updateLineManager(payload);
      notifications.emit(eventNames.LogActivity, [`Updated ${lineManager.idNumber}`, { staffId }]);
      notifications.emit(eventNames.UpdateOnAppraisal, [lineManager]);
      return [200, 'Supervisor removed!'];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem removing staff ERR500UPDSUP.'];
    }
  }

  static async removeSingleSupervisor(req) {
    const { params: { supervisorId }, currentAdmin: { staffId } } = req;
    try {
      const staff = await LineManagerService.findLineManagerByPk(supervisorId);
      if (!staff) return [404, 'Supervisor not found'];
      await staff.destroy();
      notifications.emit(eventNames.LogActivity, [`Deleted ${staff.idNumber}`, { staffId }]);
      return [200, 'Supervisor removed!'];
    } catch (e) {
      console.log(e);
      return [500, 'There was a problem removing staff ERR500RMVSUP.'];
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
    const { body: { staffId, extraMonthsPermitted, extraMonthsData }, currentAdmin: { staffId: adminStaffId } } = req;

    try {
      const updated = await StaffService.updateStaffInfo(staffId, { extraMonthsPermitted, extraMonthsData });
      notifications.emit(eventNames.LogActivity, [`Authorised extra months for ${staffId}`, { staffId: adminStaffId }]);
      return [updated ? 200 : 500, `Permission${updated ? '' : ' not'} granted!`];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred while authorising multiple claim application.', e];
    }
  }

  static async resendLoginCredentials(req) {
    const { body: { staffId }, currentAdmin: { staffId: adminStaffId } } = req;

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(staffId);
      if (staff.changedPassword) return [403, 'Password already changed'];
  
      notifications.emit(eventNames.Activation, [[staff]]);
      notifications.emit(eventNames.LogActivity, [`Resent login credentials for ${staffId}`, { staffId: adminStaffId }]);
      return [200, 'Activation email resent!'];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred while resending activation email.'];
    }
  }

  static async authoriseBranchEdit(req) {
    const { body: { staffId }, currentAdmin: { staffId: adminStaffId } } = req;

    try {
      const updated = await StaffService.updateStaffInfo(staffId, { canUpdateBranch: true });
      const staff = await StaffService.findStaffByStaffIdOrEmail(staffId);

      notifications.emit(eventNames.CanUpdateBranch, [[staff]]);
      notifications.emit(eventNames.LogActivity, [`Authorised branch edit for ${staffId}`, { staffId: adminStaffId }]);
      return [updated ? 200 : 500, `Permission${updated ? '' : ' not'} granted!`];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred while granting permission.'];
    }
  }

  static async requestBranchEdit(req) {
    const { currentStaff: { staffId } } = req;
    const excludeAuditors = true;

    try {
      const admins = await StaffService.fetchAdmins(excludeAuditors);
      const staff = await StaffService.findStaffByStaffIdOrEmail(staffId);

      notifications.emit(eventNames.RequestToUpdateBranch, [admins, staff]);
      notifications.emit(eventNames.LogActivity, ['Requested branch edit', { staffId }]);
      return [200, 'Permission email sent!'];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred while granting permission.'];
    }
  }

  static async fetchLogs(req) {
    const { query: { exportable, page }, currentAdmin: { staffId } } = req;

    try {
      const logs = await ActivityService.fetchLogs(req.query);
      if (+page === 1) {
        // record view log activity only when first viewed
        notifications.emit(eventNames.LogActivity, ['Viewed logs', { staffId }]);
      }
      if (exportable) {
        notifications.emit(eventNames.LogActivity, ['Exported logs', { staffId }]);
      }
      return [200, 'success', logs];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred while fetching logs.'];
    }
  }
}

export default Administration;

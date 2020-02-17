import StaffService from '../utilities/services/StaffService';

class ProfileUpdate {
  static async profileInfo(req) {
    const { currentStaff, currentAdmin, body } = req;
    const requester = currentStaff || currentAdmin;

    if (body.branchId) body.canUpdateBranch = false;

    try {
      const updated = await StaffService.updateStaffInfo(requester.staffId, body);
      
      return [updated ? 200 : 500, `Profile ${updated ? '' : 'not '}updated!`];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred ERR500PRFUPD'];
    }
  }
}

export default ProfileUpdate;

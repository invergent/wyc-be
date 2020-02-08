class UsersHelpers {
  static refineUserData(user) {
    const {
      staffId, firstname, lastname, middlename, email: emailAddress, phone, altPhone, accountNumber, image, changedPassword, extraMonthsPermitted, extraMonthsData, canUpdateLineManager
    } = user;
    const branch = user.branch ? user.branch.name : null;
    const role = user.role ? user.role.name : null;
    let lineManagerIdNumber = null;
    let lineManagerFirstName = null;
    let lineManagerLastName = null;
    let lineManagerPhone = null;
    let lineManagerEmailAddress = null;
    
    if (user.lineManager) {
      lineManagerIdNumber = user.lineManager.idNumber;
      lineManagerFirstName = user.lineManager.firstname;
      lineManagerLastName = user.lineManager.lastname;
      lineManagerPhone = user.lineManager.phone;
      lineManagerEmailAddress = user.lineManager.email;
    }

    return {
      staffId,
      firstname,
      lastname,
      middlename,
      emailAddress,
      phone,
      altPhone,
      accountNumber,
      image,
      extraMonthsPermitted,
      extraMonthsData,
      role,
      branch,
      changedPassword,
      canUpdateLineManager,
      lineManagerIdNumber,
      lineManagerFirstName,
      lineManagerLastName,
      lineManagerPhone,
      lineManagerEmailAddress
    };
  }

  static refineUserClaim(user) {
    const {
      staffId, firstname, lastname, image, Claims
    } = user;

    return Claims.map((claim) => {
      const {
        id, amount, status, createdAt, claimElements, details
      } = claim;

      return {
        id, staffId, fullname: `${firstname} ${lastname}`, image, amount, status, createdAt, claimElements, details
      };
    });
  }
}

export default UsersHelpers;

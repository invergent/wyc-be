class UsersHelpers {
  static refineUserData(user) {
    const {
      staffId, firstname, lastname, middlename, email: emailAddress, phone, altPhone, accountNumber, image, changedPassword, extraMonthsPermitted, extraMonthsData, canUpdateBranch
    } = user;

    const branch = user.branch ? user.branch.name : null;
    const solId = user.branch ? user.branch.solId : null;
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
      solId,
      changedPassword,
      canUpdateBranch,
      lineManagerIdNumber,
      lineManagerFirstName,
      lineManagerLastName,
      lineManagerPhone,
      lineManagerEmailAddress
    };
  }

  static refineUserDataShared(user) {
    const {
      staffId, firstname, lastname, middlename, email: officeEmail, image, roleId, branchId
    } = user;

    return {
      staffId,
      type: 'Employee',
      firstname,
      lastname,
      middlename,
      officeEmail,
      imageUrl: image,
      jobFuntionId: roleId,
      branchId
    };
  }

  static refineUserClaim(user) {
    const {
      staffId, firstname, lastname, image, Claims
    } = user;

    return Claims.map((claim) => {
      const {
        id, amount, status, createdAt, claimElements, details, year, monthOfClaim
      } = claim;

      return {
        id, year, monthOfClaim, staffId, fullname: `${firstname} ${lastname}`, image, amount, status, createdAt, claimElements, details
      };
    });
  }
}

export default UsersHelpers;

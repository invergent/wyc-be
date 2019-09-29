class UsersHelpers {
  static refineUserData(user) {
    const {
      staffId, firstname, lastname, middlename, email: emailAddress, phone, altPhone, accountNumber, image, changedPassword, permittedMonths
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
      permittedMonths,
      role,
      branch,
      changedPassword,
      lineManagerIdNumber,
      lineManagerFirstName,
      lineManagerLastName,
      lineManagerPhone,
      lineManagerEmailAddress
    };
  }
}

export default UsersHelpers;

class UsersHelpers {
  static refineUserData(user) {
    const {
      staffId, firstname, lastname, middlename, email: emailAddress, phone, accountNumber, image, changedPassword
    } = user;
    const branch = user.branch ? user.branch.name : null;
    const role = user.role ? user.role.name : null;
    let lineManagerFirstName = null;
    let lineManagerLastName = null;
    let lineManagerEmailAddress = null;
    
    if (user.lineManager) {
      lineManagerFirstName = user.lineManager.firstname;
      lineManagerLastName = user.lineManager.lastname;
      lineManagerEmailAddress = user.lineManager.email;
    }

    return {
      staffId,
      firstname,
      lastname,
      middlename,
      emailAddress,
      phone,
      accountNumber,
      image,
      role,
      branch,
      changedPassword,
      lineManagerFirstName,
      lineManagerLastName,
      lineManagerEmailAddress
    };
  }
}

export default UsersHelpers;

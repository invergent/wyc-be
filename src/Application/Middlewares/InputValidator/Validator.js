import ValidatorHelpers from './ValidatorHelpers';
import {
  emailRegex, accNumRegex, staffIdRegex, solIdRegex, formProperties, phoneRegex, numberRegex
} from '../../Features/utilities/utils/inputValidator';

class Validator {
  static checkProps(reqObject, methodName) {
    const expectedProps = formProperties[methodName];
    const receivedProps = Object.keys(reqObject);

    return expectedProps.reduce((acc, item) => {
      if (!receivedProps.includes(item)) {
        acc = `${acc}, ${item}`;
      }
      return acc;
    }, '');
  }
  
  static errorDecider(errors) {
    if (errors.length) return { rowIsValid: false, errors };
    return { rowIsValid: true };
  }

  static signin(reqObject) {
    const { staffId, email, password } = reqObject;
    const errors = [];

    errors.push(...ValidatorHelpers.checkPatternedFields('Staff ID', staffId, staffIdRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Email', email, emailRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Password', password));
    return errors;
  }

  static lineManager(reqObject) {
    const { idNumber, firstname, lastname, email, phone } = reqObject;
    const errors = [];

    if (!emailRegex.test(email)) errors.push('Email is invalid');

    errors.push(...ValidatorHelpers.checkPatternedFields('email', email, emailRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('idNumber', idNumber, staffIdRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('email', email, emailRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('phone', phone, phoneRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('firstname', firstname));
    errors.push(...ValidatorHelpers.checkForEmptyFields('lastname', lastname));

    return errors;
  }

  static reset(reqObject) {
    const { password, newPassword, confirmPassword } = reqObject;
    const truthyPassword = password || newPassword;

    const errors = [];

    errors.push(...ValidatorHelpers.checkForEmptyFields('password', truthyPassword));
    errors.push(...ValidatorHelpers.checkForEmptyFields('confirmPassword', confirmPassword));

    if (truthyPassword.trim() !== confirmPassword.trim()) {
      errors.push('Passwords do not match');
    }

    return errors;
  }

  static changePassword(reqObject) {
    const { currentPassword } = reqObject;
    const errors = [];

    errors.push(...ValidatorHelpers.checkForEmptyFields('currentPassword', currentPassword));
    errors.push(...this.reset(reqObject));

    return errors;
  }

  static login(reqObject) {
    return Validator.signin(reqObject);
  }

  static schedules(reqObject) {
    const expectedProps = formProperties.schedules;
    const receivedProps = Object.keys(reqObject).filter(prop => (!expectedProps.includes(prop)));

    if (receivedProps.length) return ['Request contains unrecognised props.'];

    const {
      emailSchedule, overtimeWindowStart, overtimeWindowEnd, overtimeWindowIsActive
    } = reqObject;
    const errors = [];

    errors.push(...ValidatorHelpers.checkCronTime('emailSchedule', emailSchedule));
    errors.push(...ValidatorHelpers.checkCronTime('overtimeWindowStart', overtimeWindowStart));
    errors.push(...ValidatorHelpers.checkCronTime('overtimeWindowEnd', overtimeWindowEnd));
    errors.push(...ValidatorHelpers.checkBooleanField('overtimeWindowIsActive', overtimeWindowIsActive, true));

    return errors;
  }

  static staff(rowValues) {
    // eslint-disable-next-line
    const [emptyCell, staffId, firstname, lastname, middlename, emailAddress, phone, altPhone, accountNumber] = rowValues;
    const errors = [];

    errors.push(...ValidatorHelpers.checkPatternedFields('Staff ID', staffId, staffIdRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Email Address', emailAddress, emailRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Phone Number', phone, phoneRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Alternate Phone Number', altPhone, phoneRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Account Number', accountNumber, accNumRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Firstname', firstname));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Lastname', lastname));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Middlename', middlename, true));

    return Validator.errorDecider(errors);
  }

  static branch(rowValues) {
    const [emptyCell, name, solId, address] = rowValues; // eslint-disable-line
    const errors = [];

    errors.push(...ValidatorHelpers.checkForEmptyFields('Branch Name', name));
    errors.push(...ValidatorHelpers.checkPatternedFields('Sol ID', solId, solIdRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Branch address', address));

    return Validator.errorDecider(errors);
  }

  static profile(profileInfo) {
    const errors = [];
    const {
      firstname, lastname, middlename, email, phone, altPhone, roleId, branchId, accountNumber
    } = profileInfo;

    errors.push(...ValidatorHelpers.checkPatternedFields('Email Address', email, emailRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Firstname', firstname, true));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Lastname', lastname, true));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Middlename', middlename, true));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Phone', phone, phoneRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Alternate Phone', altPhone, phoneRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Account Number', accountNumber, accNumRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('roleId', roleId, numberRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Branch ID', branchId, numberRegex));

    return errors;
  }

  static single(data, path) {
    const errors = [];
    const {
      staffId, firstname, lastname, middlename, email, phone, solId, name, address
    } = data;

    if (path.includes('branch')) {
      errors.push(...ValidatorHelpers.checkPatternedFields('SOL ID', solId, solIdRegex));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Branch name', name));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Branch address', address));
    } else {
      errors.push(...ValidatorHelpers.checkPatternedFields('Staff ID', staffId, staffIdRegex));
      errors.push(...ValidatorHelpers.checkPatternedFields('Email Address', email, emailRegex));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Firstname', firstname));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Lastname', lastname));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Middlename', middlename));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Phone', phone, phoneRegex));
    }

    return errors;
  }

  static holidays(data) {
    const errors = [];
    const { name, yearMonth, fullDate } = data;
    const [year, month] = yearMonth.split('/');
    errors.push(...ValidatorHelpers.checkForEmptyFields('Holiday name', name, true));
    if (month < 1 || month > 12 || year < 2019) errors.push('yearMonth value is invalid');
    errors.push(...ValidatorHelpers.checkForEmptyFields('Full date', fullDate));

    return errors;
  }

  static multipleClaims(data) {
    const errors = [];
    const { staffId, extraMonthsData: { permittedMonths } } = data;

    errors.push(...ValidatorHelpers.checkPatternedFields('Staff ID', staffId, staffIdRegex));
    if (!permittedMonths || !Array.isArray(permittedMonths)) {
      errors.push('permittedMonths is required and must be an array');
    } else if (!permittedMonths.length) {
      errors.push('List of permitted months is empty');
    } else {
      const numberOfErrors = permittedMonths.reduce((acc, yearMonth) => {
        const [year, month] = yearMonth.split('/');
        if (+year < 2019 || Number.isNaN(+month) || +month < 0 || +month > 11) acc += 1;
        return acc;
      }, 0);

      if (numberOfErrors) errors.push('permittedMonths contain invalid month entries');
    }

    return errors;
  }

  static resendCredentials(data) {
    return ValidatorHelpers.checkPatternedFields('Staff ID', data.staffId, staffIdRegex);
  }
}

export default Validator;

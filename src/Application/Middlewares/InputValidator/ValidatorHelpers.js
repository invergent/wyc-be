class ValidatorHelpers {
  static checkForEmptyFields(field, value, optional) {
    if (!value && optional) return []; // do not return errors if field is optional
    if (!value) return [`${field} is required`];
    if (typeof value !== 'string' || !value.trim()) return [`${field} is invalid`];
    return [];
  }

  static checkPatternedFields(field, value, regex) {
    if (field === 'Sol ID' && !value) return ['Sol ID is required'];

    if (!value) return [];
    if (!regex.test(value)) return [`${field} is invalid`];
    return [];
  }

  static checkDocTypeParam(docType) {
    if (!['xlsx', 'csv'].includes(docType)) return ['Invalid! DocType can only be "xlsx" or "csv".'];
    return [];
  }

  static checkFileType(files) {
    const { doc, image } = files;
    const imageTypes = '.jpg, .jpeg, .png or .svg';
    const sheetTypes = '.xlsx, .csv';
    const expectedFileType = doc ? sheetTypes : imageTypes;

    const file = doc || image;
    const fileNameSplits = file.name.split('.');
    const fileExtension = fileNameSplits[fileNameSplits.length - 1];

    // if file is neither an sheet type or an image file, return an error
    if ((doc && !sheetTypes.includes(fileExtension)) || (image && !imageTypes.includes(fileExtension))) {
      return [`file type must be ${expectedFileType}`];
    }

    file.docType = fileExtension;
    return [];
  }

  static validateNumberParam(field, param) {
    const isInter = Number.isInteger(parseInt(param, 10));
    const isGreaterThanZero = parseInt(param, 10) > 0;
  
    if (isInter && isGreaterThanZero) return [];
    return [`${field} must be an integer greater than zero.`];
  }

  static checkCronTime(field, cronTime) {
    if (typeof cronTime === 'undefined') return [];
    return cronTime.trim().split(' ').length === 5 ? [] : [`${field} cron time setting is invalid.`];
  }

  static checkBooleanField(field, value, optional) {
    if (typeof value !== 'boolean' && !optional) return [`${field} must be a boolean`];
    return [];
  }

  static getMethodName(path) {
    let methodName;

    switch (true) {
      case (path.includes('update')):
        // use the same method for validating a single branch creation
        methodName = 'single';
        break;
      case (path.includes('supervisor')):
        methodName = 'supervisor';
        break;
      case (path.includes('edit-branch')):
        methodName = 'branchEdit';
        break;
      case (path === '/users/profile'):
        methodName = 'profile';
        break;
      case (path.includes('users')):
        methodName = path.slice(15);
        break;
      case (path.includes('single')):
      case (path.includes('multiple')):
      case (path.includes('resend')):
      case (path.includes('manager-edit')):
        methodName = path.slice(path.includes('branch') ? 14 : 13);
        break;
      case (path.includes('login')):
      case (path.includes('staff')):
      case (path.includes('branch')):
      case (path.includes('holidays')):
        methodName = path.slice(7);
        if (path.includes('holidays/')) methodName = methodName.substr(0, 8);
        break;
      default:
        methodName = path.slice(1);
    }
    return ValidatorHelpers.convetWordToCamelCase(methodName);
  }

  static convetWordToCamelCase(word) {
    const [firstWord, secondWord] = word.split('-');
    if (!secondWord) {
      return firstWord;
    }
    return `${firstWord}${secondWord.charAt(0).toUpperCase()}${secondWord.slice(1)}`;
  }

  static validatorResponder(res, errors, next) {
    if (errors.length) {
      return res.status(400).json({ message: 'validationErrors', errors });
    }
    return next();
  }
}

export default ValidatorHelpers;

import BasicQuerier from '../BasicQuerier';

class PasswordResetService {
  static fetchPasswordResetRequest(staffId) {
    return BasicQuerier.passwordResetQueries('findOne', staffId);
  }

  static deletePasswordResetRequest(staffId) {
    return BasicQuerier.passwordResetQueries('destroy', staffId);
  }

  static updateOrInsertResetRequest(data) {
    return BasicQuerier.passwordResetQueries('upsert', undefined, data);
  }
}

export default PasswordResetService;

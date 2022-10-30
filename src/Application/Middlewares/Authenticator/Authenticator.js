import krypter from '../../Features/utilities/helpers/krypter';
import { authErrorCodes, authRoleName } from '../../Features/utilities/utils/general';

const errorToStaff = 'Please login first.';
const passwordResetError = 'Action unauthorised!';
const errorToLineManager = `Your request was unauthorised.${
  ''
} Be sure to have clicked the button in the email you recieved.`;

class Authenticator {
  static authenticateAdmin(req, res, next) {
    return Authenticator.authenticate(req, res, next, 'admin', errorToStaff);
  }

  static authenticateStaff(req, res, next) {
    return Authenticator.authenticate(req, res, next, 'staff', errorToStaff);
  }

  static authenticateLineManager(req, res, next) {
    return Authenticator.authenticate(req, res, next, 'lineManager', errorToLineManager);
  }

  static authenticatePasswordReset(req, res, next) {
    return Authenticator.authenticate(req, res, next, 'passwordReset', passwordResetError);
  }

  static onlySuperAdminAuditor(req, res, next) {
    const { currentAdmin } = req;
    if (!currentAdmin) return res.status(401).json({ message: 'unauthenticated' });
    if (!['Super Admin', 'Auditor'].includes(currentAdmin.staffRole)) {
      return res.status(401).json({ message: 'unauthenticated' });
    }
    return next();
  }

  static superAdmin(req, res, next) {
    const { currentAdmin } = req;
    if (!currentAdmin) return res.status(401).json({ message: 'unauthenticated' });
    if (currentAdmin.staffRole !== 'Super Admin') {
      return res.status(401).json({ message: 'unauthenticated' });
    }
    return next();
  }

  static authenticateAdminOrStaff(req, res, next) {
    console.log(req.cookies);
    if (req.cookies.staffToken) return Authenticator.authenticateStaff(req, res, next);
    if (req.cookies.adminToken) return Authenticator.authenticateAdmin(req, res, next);
    return res.status(401).json({ message: errorToStaff });
  }

  static authenticate(req, res, next, requester, message) {
    const token = req.cookies[`${requester}Token`];
    if (!token) {
      return res.status(401).json({ message });
    }
    return Authenticator.decrypt(req, res, next, requester, token);
  }

  static verifyLineManager(req, res, next) {
    const { query: { hash } } = req;
    if (!hash) {
      return res.status(401).json({ message: 'Your request was unauthorised. Access denied.' });
    }
    return Authenticator.decrypt(req, res, next, 'lineManager', hash);
  }

  static verifyServiceRequest(req, res, next) {
    const { query: { token } } = req;
    if (!token) {
      return res.status(401).json({ message: 'Your request was unauthorised. Access denied.' });
    }
    try {
      const decoded = krypter.authenticationDecryption(token);
      req.serviceToken = decoded.secret;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Service authentication error.' });
    }
  }

  static decrypt(req, res, next, requester, token) {
    const errorCode = authErrorCodes[requester];
    const currentUserRole = authRoleName[requester];

    try {
      const decoded = krypter.authenticationDecryption(token);
      req[currentUserRole] = decoded[requester];
      return next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: `Authentication error ${errorCode}.` });
    }
  }

  static destroyToken(req, res) {
    res.clearCookie('staffToken', {
      domain: process.env.NODE_ENV === 'development' ? 'localhost' : 'whytecleon.ng',
      httpOnly: true
    });
    res.clearCookie('adminToken', {
      domain: process.env.NODE_ENV === 'development' ? 'localhost' : 'whytecleon.ng',
      httpOnly: true
    });
    return res.status(200).json({ message: 'Token destroyed successfully.' });
  }
}

export default Authenticator;

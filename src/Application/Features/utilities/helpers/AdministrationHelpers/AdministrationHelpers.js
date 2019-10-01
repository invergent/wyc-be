import crypto from 'crypto';
import ClaimService from '../../services/ClaimService';
import StaffService from '../../services/StaffService';

class AdministrationHelpers {
  static convertStaffWorksheetToObjectsArray(worksheet) {
    const arrayOfStaff = [];

    worksheet.eachRow((row) => {
      // eslint-disable-next-line
      const [emptyCell, staffId, firstname, lastname, middlename, email, phone, altPhone, accountNumber] = row.values;

      arrayOfStaff.push({
        staffId: staffId.toUpperCase(),
        firstname,
        lastname,
        middlename,
        email: email.toLowerCase(),
        phone,
        altPhone,
        accountNumber,
        password: crypto.randomBytes(3).toString('hex')
      });
    });

    return arrayOfStaff;
  }

  static convertBranchWorksheetToObjectsArray(worksheet) {
    const arrayOfBranches = [];

    worksheet.eachRow((row) => {
      // eslint-disable-next-line
      const [emptyCell, name, solId, address] = row.values;
      arrayOfBranches.push({ name, solId, address });
    });

    return arrayOfBranches;
  }

  static filterAdminClaimsQueryResult(queryResult) {
    return queryResult.map((result) => {
      const {
        details,
        amount,
        status,
        monthOfClaim,
        claimer: {
          firstname, lastname, middlename, staffId, accountNumber,
          branch: { solId, name: branch },
          role: { name: role },
          lineManager: { firstname: lmFirstname, lastname: lmLastname, email: lmEmail }
        },
      } = result;

      const parseDetails = details.total ? details : JSON.parse(details);
      const claimDetails = Object.keys(parseDetails).reduce((acc, item) => {
        if (item === 'outstation') {
          acc[item] = parseDetails[item];
        } else if (parseDetails[item].selectedDates) {
          acc[item] = parseDetails[item].selectedDates.length;
        }
        return acc;
      }, {});

      return {
        ...claimDetails,
        amount,
        status,
        staffId,
        fullname: `${firstname} ${lastname}${middlename ? ' ' : ''}${middlename || ''}`,
        solId,
        branch,
        accountNumber,
        monthOfClaim,
        role,
        approvedby: `${lmFirstname} ${lmLastname}`,
        approverEmail: lmEmail
      };
    });
  }

  static async exportableClaims() {
    const claims = await ClaimService.fetchClaimsInProcessingForExports('Processing');
    return AdministrationHelpers.filterAdminClaimsQueryResult(claims);
  }

  static getClaimStatistics(filteredClaims) {
    const claimStats = {
      total: filteredClaims.length, approved: 0, declined: 0, pending: 0
    };
    return filteredClaims.reduce(AdministrationHelpers.statAccumulator, claimStats);
  }

  static statAccumulator(acc, claim) {
    if (['Processing', 'Completed'].includes(claim.status)) acc.approved += 1;
    if (claim.status === 'Pending') acc.pending += 1;
    if (claim.status === 'Declined') acc.declined += 1;
    if (claim.status === 'Cancelled') acc.total -= 1;
    return acc;
  }

  static getChartStatistics() {
    return ClaimService.getChartStatistics();
  }

  static fetchStaff(attributes) {
    return StaffService.fetchStaff(attributes);
  }

  static refineSingleClaimData(claim) {
    const {
      id, monthOfClaim, claimElements, amount, details, status, editRequested, editMessage, createdAt, updatedAt
    } = claim;
    const {
      staffId, firstname, lastname, middlename
    } = claim.claimer;
    return {
      id, monthOfClaim, claimElements, amount, details, status, editRequested, editMessage, createdAt, updatedAt, staffId, firstname, lastname, middlename
    };
  }
}

export default AdministrationHelpers;

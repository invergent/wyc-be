/* eslint-disable object-curly-newline */
import ValidatorHelpers from './ValidatorHelpers';
import { months } from '../../Features/utilities/utils/general';

const { validateNumberParam } = ValidatorHelpers;

class OvertimeRequestValidator {
  static checkOvertimeProps(overtimeRequest) {
    const expectedProps = ['claimElements', 'amount', 'details', 'monthOfClaim', 'year'];
    const missingProp = expectedProps.filter(field => !overtimeRequest[field]);
    if (missingProp.length) return [`The following props are missing: ${missingProp}`];

    try {
      const detailsKeys = Object.keys(JSON.parse(overtimeRequest.details));
      if (!detailsKeys || !detailsKeys.length) return ['claim request details cannot be empty'];

      const expectedDetailsProps = [
        'overtime', 'weekend', 'shiftDuty', 'atmDuty', 'atmSupport', 'holiday', 'outstation',
        'allSelectedDates', 'applyingMonth', 'currentlyPressedBtn', 'total', 'visiblePaneItems'
      ];
      const containsUnknownItems = detailsKeys.some(item => !expectedDetailsProps.includes(item));
      if (containsUnknownItems) return ['Invalid request'];

      return [];
    } catch (error) {
      return ['Error passing request'];
    }
  }

  static checkOvertimeEntries(overtimeRequest) {
    const { claimElements, amount, monthOfClaim, year } = overtimeRequest;
    const errors = [];
    errors.push(...validateNumberParam('claimElements', claimElements));
    errors.push(...validateNumberParam('amount', amount));
    errors.push(...validateNumberParam('year', year));

    const [claimMonth, claimYear] = monthOfClaim.split(' ');
    if (+claimYear < 2019 || !months.includes(claimMonth)) {
      errors.push('Invalid claim period');
    }

    return errors;
  }
}

export default OvertimeRequestValidator;

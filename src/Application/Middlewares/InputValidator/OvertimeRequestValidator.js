/* eslint-disable object-curly-newline */
import ValidatorHelpers from './ValidatorHelpers';

const { validateNumberParam } = ValidatorHelpers;

class OvertimeRequestValidator {
  static checkOvertimeProps(overtimeRequest) {
    const expectedProps = ['claimElements', 'amount', 'details'];
    const missingProp = expectedProps.filter(field => !overtimeRequest[field]);
    if (missingProp.length) return [`The following props are missing: ${missingProp}`];

    const detailsKeys = Object.keys(overtimeRequest.details);
    if (!detailsKeys.length) return ['claim request details cannot be empty'];
    return [];
  }

  static checkOvertimeEntries(overtimeRequest) {
    const { claimElements, amount } = overtimeRequest;
    const errors = [];
    errors.push(...validateNumberParam('claimElements', claimElements));
    errors.push(...validateNumberParam('amount', amount));

    return errors;
  }
}

export default OvertimeRequestValidator;

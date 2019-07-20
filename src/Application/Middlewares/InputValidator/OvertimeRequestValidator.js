/* eslint-disable object-curly-newline */
import ValidatorHelpers from './ValidatorHelpers';

const { validateNumberParam } = ValidatorHelpers;

class OvertimeRequestValidator {
  static checkOvertimeProps(overtimeRequest) {
    const expectedProps = ['claimElements', 'amount', 'details', 'dates'];
    const missingProp = expectedProps.filter(field => !overtimeRequest[field]);
    if (missingProp.length) return [`The following props are missing: ${missingProp}`];

    const overtimeFields = ['overtime', 'weekend', 'shift', 'atm', 'outstation'];
    const detailsKeys = Object.keys(overtimeRequest.details);

    if (!detailsKeys.length) return ['claim request details cannot be empty'];
    const unknownProps = detailsKeys.reduce((acc, item) => {
      if (!overtimeFields.includes(item)) acc.push(item);
      return acc;
    }, []);

    return unknownProps.length ? [`unrecognised fields: ${unknownProps}`] : [];
  }

  static checkOvertimeEntries(overtimeRequest) {
    const { claimElements, amount, details } = overtimeRequest;
    const errors = [];
    errors.push(...validateNumberParam('claimElements', claimElements));
    errors.push(...validateNumberParam('amount', amount));
    Object.keys(details).forEach((detailKey) => {
      errors.push(...validateNumberParam(detailKey, details[detailKey]));
    });

    return errors;
  }
}

export default OvertimeRequestValidator;

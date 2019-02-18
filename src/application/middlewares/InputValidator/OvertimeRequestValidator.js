import OvertimeRequestValidatorHelpers from './OvertimeRequestValidatorHelpers';

const helpers = OvertimeRequestValidatorHelpers;

class OvertimeRequestValidator {
  static checkOvertimeProps(overtimeRequest, staffRole) {
    const overtimeTypes = Object.keys(overtimeRequest);
    if (helpers.canApplyForShifts(staffRole)) {
      return helpers.checkRPCRequest(overtimeTypes);
    }
    return helpers.checkNonRPCRequest(overtimeTypes);
  }

  static checkOvertimeEntries(overtimeRequest, maxValues) {
    const [numberOfWeekdays, numberOfWeekdends] = maxValues;
    const validator = helpers.validateOvertimeValues;

    const errors = Object.keys(overtimeRequest).reduce((acc, item) => {
      if (['weekend', 'atm'].includes(item)) {
        acc.push(...validator(overtimeRequest[item], numberOfWeekdends, item));
      } else {
        acc.push(...validator(overtimeRequest[item], numberOfWeekdays, item));
      }
      return acc;
    }, []);

    return errors;
  }
}

export default OvertimeRequestValidator;

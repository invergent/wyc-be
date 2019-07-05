import EmailService from '../../services/EmailService';

class EmailConstructor {
  static async create(emailDetails) {
    const { email: staffEmailAddress, lineManager, emailTemplateName } = emailDetails;
    const emailTemplate = await EmailService.fetchEmailTemplateByName(emailTemplateName);
    const { htmlMessage, subject } = emailTemplate;

    let toEmailAddress;

    if (emailTemplateName.includes('Staff')) {
      toEmailAddress = staffEmailAddress;
    } else {
      toEmailAddress = lineManager.email;
    }

    const personalizedEmail = EmailConstructor.personalizeMessage(emailDetails, htmlMessage);
    return {
      to: toEmailAddress,
      subject,
      html: personalizedEmail
    };
  }

  static async createForMany(reciepients, emailTemplateName) {
    const emailTemplate = await EmailService.fetchEmailTemplateByName(emailTemplateName);
    const { htmlMessage, subject } = emailTemplate;

    const personalizedEmails = reciepients.map((reciepient) => {
      const { email: reciepientEmailAddress } = reciepient;
      const personalizedEmail = EmailConstructor.personalizeMessage(reciepient, htmlMessage);

      return {
        to: reciepientEmailAddress,
        subject,
        html: personalizedEmail
      };
    });

    return personalizedEmails;
  }

  static personalizeMessage(reciepient, htmlMessage) {
    const {
      firstname: staffFirstName,
      lastname: staffLastName,
      hash,
      monthOfClaim,
      amount,
      lineManager
    } = reciepient;
    let lineManagerFirstName;

    if (lineManager) lineManagerFirstName = lineManager.firstname;

    return htmlMessage
      .replace(/{{staffFirstName}}/g, staffFirstName)
      .replace(/{{staffLastName}}/g, staffLastName)
      .replace(/{{lineManagerFirstName}}/g, lineManagerFirstName)
      .replace(/{{url}}/g, 'overtime.invergent-technologies.com')
      .replace(/{{hash}}/g, hash)
      .replace(/{{amount}}/g, amount)
      .replace(/{{monthOfClaim}}/g, monthOfClaim);
  }
}

export default EmailConstructor;

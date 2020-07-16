import sendgrid from '@sendgrid/mail';
import { companyInfo } from '../../utils/general';

class Mailer {
  constructor() {
    this.from = 'claims@whytecleon.ng';
  }

  create(email) {
    const { to, subject, html } = email;
    return {
      from: this.from,
      to,
      subject,
      html
    };
  }

  send(email) {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    const formattedEmail = this.create(email);
    return sendgrid.send(formattedEmail);
  }

  sendToMany(emails) {
    emails.forEach(email => this.send(email));
  }
}

export default Mailer;

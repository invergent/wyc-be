import '@babel/polyfill';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'express-cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import morgan from 'morgan';
import Cron from './Application/Features/Cron';
import routes from './routes';
import CompanyService from './Application/Features/utilities/services/CompanyService';
import StaffService from './Application/Features/utilities/services/StaffService';

const devWhitelist = ['localhost:4200'];
const prodWhitelist = ['cleontime.herokuapp.com', 'cleontime.whytecleon.ng', 'cleontime-ui-test.whytecleon.ng'];

const app = express();
CompanyService.fetchInfo(); // initialise company info for mailing/other operations
StaffService.createSuperAdmin();

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== 'test') {
  app.use(cors({ allowedOrigins: [...devWhitelist, ...prodWhitelist] }));
}

app.use(fileUpload({
  abortOnLimit: true,
  limits: { fileSize: 5000000 },
  responseOnLimit: 'File too large',
  useTempFiles: true,
  tempFileDir: '/tmp'
}));
app.use(morgan('combined'));

// Configuration to uploading to cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

app.use((req, res, next) => {
  if (!['development', 'test'].includes(process.env.NODE_ENV)) {
    if (!prodWhitelist.includes(req.headers.host)) {
      return res.sendStatus(403).json({ message: 'Not allowed' });
    }
  }
  return next();
});

app.use('/', routes);
app.get('*', (req, res) => res.status(200).json({ message: 'Project started' }));

// Schedule jobs
Cron.Scheduler.scheduleJobs();
Cron.Scheduler.scheduleStatsUpdateJob();

export default app;

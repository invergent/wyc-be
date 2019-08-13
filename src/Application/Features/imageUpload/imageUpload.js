import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import path from 'path';
import StaffService from '../utilities/services/StaffService';

export default async (req) => {
  const { currentStaff, currentAdmin, files: { image } } = req;
  const requester = currentStaff || currentAdmin;

  try {
    const response = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      public_id: `${requester.staffId}`,
      folder: 'overtime/whytecleon'
    });
    const { url, secure_url: secureUrl } = response;

    // update staff data with image url
    await StaffService.updateStaffInfo(requester.staffId, { image: secureUrl });

    return [201, 'Image upload successful.', { url, secureUrl }];
  } catch (e) {
    console.log(e);
    return [500, 'An error occurred while uploading your image ERR500IMGUPL.'];
  } finally {
    fs.remove(image.tempFilePath); // remove file after upload
  }
};

import fs from 'fs-extra';
import ExportDocHelpers from '../../utilities/helpers/ExportDocHelpers';

class Excel {
  static async createExcelDocument(workbook) {
    const filePath = '/tmp/report.xlsx';
    const file = fs.createWriteStream(filePath);
    await workbook.xlsx.write(file);
    return filePath;
  }

  static async claimReport() {
    try {
      const populatedWorkbook = await ExportDocHelpers.populateWorkbooksSheetWithData();
      const pathToDocument = await Excel.createExcelDocument(populatedWorkbook);
<<<<<<< HEAD
      return [pathToDocument, 'cleontimeReport.xlsx'];
=======
      return [pathToDocument, 'VLAClaimReport.xlsx'];
>>>>>>> update overtimeWindowIsActive field when cron job updates overtimeWindow status
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred ERR500DWLEXL'];
    }
  }
}

export default Excel;

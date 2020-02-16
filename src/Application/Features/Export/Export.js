import fs from 'fs-extra';
import ExportDocHelpers from '../utilities/helpers/ExportDocHelpers';

class Export {
  static async createExcelDocument(workbook, docType) {
    const filePath = `/tmp/report.${docType}`;
    const file = fs.createWriteStream(filePath);
    await workbook[docType].write(file, { sheetName: 'Submitted Claims' });
    return filePath;
  }

  static async claimReport(req) {
    const { params: { docType }, query } = req;
    try {
      const populatedWorkbook = await ExportDocHelpers.populateWorkbooksSheetWithData(query);
      const pathToDocument = await Export.createExcelDocument(populatedWorkbook, docType);
      return [pathToDocument, `cleontimeReport.${docType}`];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred ERR500DWLEXL'];
    }
  }
}

export default Export;

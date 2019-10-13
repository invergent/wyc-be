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
      return [pathToDocument, 'cleontimeReport.xlsx'];
    } catch (e) {
      console.log(e);
      return [500, 'An error occurred ERR500DWLEXL'];
    }
  }
}

export default Excel;

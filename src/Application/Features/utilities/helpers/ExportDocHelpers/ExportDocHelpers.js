import Exceljs from 'exceljs';
import GenericHelpers from '../GenericHelpers';
import AdministrationHelpers from '../AdministrationHelpers';
import { companyInfo, exportDocHeaders } from '../../utils/general';

let workbook;

class ExportDocHelpers {
  static async setWorkBookPropertiesAndCreateSheet() {
    workbook = new Exceljs.Workbook();
    workbook.creator = companyInfo.businessName;
    workbook.created = new Date();
    const worksheet = workbook.addWorksheet('Submitted Claims');
    return worksheet;
  }

  static createDocColumnHeaders(worksheet) {
    const headerKey = GenericHelpers.createColumnHeaderKeys;

    const headerCreator = header => ({
      header,
      key: headerKey(header),
      width: 10,
      style: {
        font: { name: 'Arial' },
        numFmt: header.includes('Account') ? '@' : ''
      }
    });
    const columnHeaders = exportDocHeaders.map(headerCreator);

    worksheet.columns = columnHeaders;
    worksheet.getRow(1).font = { bold: true };
    return worksheet;
  }

  static populateRowsWithClaimData(worksheet, claims) {
    claims.forEach((claim, index) => {
      claim.sn = index + 1;
      claim.monthOfClaim = `${claim.monthOfClaim}, ${claim.year}`;
      worksheet.addRow(claim);
    });
    return worksheet;
  }

  static async populateWorkbooksSheetWithData() {
    const claims = await AdministrationHelpers.exportableClaims();
    const preparedWorksheet = await ExportDocHelpers.setWorkBookPropertiesAndCreateSheet();
    const worksheetWithHeader = ExportDocHelpers.createDocColumnHeaders(preparedWorksheet);
    ExportDocHelpers.populateRowsWithClaimData(worksheetWithHeader, claims);
    return workbook;
  }
}

export default ExportDocHelpers;

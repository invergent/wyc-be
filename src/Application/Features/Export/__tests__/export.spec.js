import Export from '../Export';
import ExportDocHelpers from '../../utilities/helpers/ExportDocHelpers';

describe('Excel Unit Tests', () => {
  it('should fail if an error occurs', async () => {
    jest.spyOn(ExportDocHelpers, 'populateWorkbooksSheetWithData').mockRejectedValue('err');
    jest.spyOn(Export, 'createExcelDocument');

    const result = await Export.claimReport({ params: { doctype: 'csv' } });

    expect(result).toHaveLength(2);
    expect(result[0]).toBe(500);
    expect(result[1]).toBe('An error occurred ERR500DWLEXL');
  });
});

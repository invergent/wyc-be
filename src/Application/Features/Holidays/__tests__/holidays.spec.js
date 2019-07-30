import Holidays from '../Holidays';
import models from '../../../Database/models';

describe('Holidays Unit Tests', () => {
  const req = { body: 'claim request object', params: { holidayId: 1 } };
  it('should send a 500 fail response if an error occurs while adding holiday.', async () => {
    jest.spyOn(models.Holidays, 'findOrCreate').mockRejectedValue('err');

    const result = await Holidays.add(req);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(500);
    expect(result[1]).toEqual('There was a problem creating holiday ERR500HOLCRT');
  });

  it('should send a 500 fail response if an error occurs while updating holiday.', async () => {
    jest.spyOn(models.Holidays, 'update').mockRejectedValue('err');

    const result = await Holidays.update(req);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(500);
    expect(result[1]).toEqual('There was a problem updating holiday ERR500HOLUPD');
  });

  it('should send a 500 fail response if an error occurs while removing holiday.', async () => {
    jest.spyOn(models.Holidays, 'findByPk').mockRejectedValue('err');

    const result = await Holidays.delete(req);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(500);
    expect(result[1]).toEqual('There was a problem removing holiday ERR500HOLDEL');
  });

  it('should send a 500 fail response if an error occurs while fetching holiday.', async () => {
    jest.spyOn(models.Holidays, 'findAll').mockRejectedValue('err');

    const result = await Holidays.getAll(req);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(500);
    expect(result[1]).toEqual('There was a problem fetching holidays ERR500HOLGET');
  });
});

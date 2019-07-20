module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Claims', [{
    monthOfClaim: 'Oct, 2018',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 7200,
    requester: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Nov, 2018',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 7400,
    requester: 3,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Dec, 2018',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 7350,
    requester: 3,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Dec, 2018',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 6850,
    requester: 4,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Jan, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 6900,
    requester: 5,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Jan, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 6150,
    requester: 6,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Jan, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 2950,
    requester: 7,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Jan, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 6400,
    requester: 8,
    status: 'Processing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'March, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 8200,
    requester: 6,
    status: 'Processing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'April, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 9400,
    requester: 6,
    status: 'Processing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'March, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 9400,
    requester: 6,
    status: 'Completed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'March, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 9400,
    requester: 10,
    status: 'Completed',
    createdAt: new Date(2018, 10, 15),
    updatedAt: new Date(2018, 10, 15)
  },
  {
    monthOfClaim: 'March, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 9400,
    requester: 6,
    status: 'Declined',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'March, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 9400,
    requester: 6,
    status: 'Cancelled',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Oct, 2018',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 9400,
    requester: 11,
    status: 'Cancelled',
    createdAt: new Date(2018, 10, 15),
    updatedAt: new Date(2018, 10, 15)
  },
  {
    monthOfClaim: 'Oct, 2018',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 9600,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2018, 10, 15),
    updatedAt: new Date(2018, 10, 15)
  },
  {
    monthOfClaim: 'Nov, 2018',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 6700,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2018, 11, 15),
    updatedAt: new Date(2018, 11, 15)
  },
  {
    monthOfClaim: 'Dec, 2018',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 9800,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2019, 0, 15),
    updatedAt: new Date(2019, 0, 15)
  },
  {
    monthOfClaim: 'Jan, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 9800,
    requester: 11,
    status: 'Declined',
    createdAt: new Date(2019, 1, 15),
    updatedAt: new Date(2019, 1, 15)
  },
  {
    monthOfClaim: 'Jan, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 6000,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2019, 1, 17),
    updatedAt: new Date(2019, 1, 17)
  },
  {
    monthOfClaim: 'March, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 7000,
    requester: 11,
    status: 'Cancelled',
    createdAt: new Date(2019, 2, 13),
    updatedAt: new Date(2019, 2, 13)
  },
  {
    monthOfClaim: 'March, 2019',
    details: `{
      "weekend": 4,
      "atm": 7,
      "outstation": 350000,
      "shift": 2
    }`,
    dates: `{
      "weekend": "2/24/2019, 2/25/2019",
      "atm": "2/24/2019, 2/25/2019",
      "outstation": "2/24/2019, 2/25/2019",
      "shift": "2/24/2019, 2/25/2019"
    }`,
    amount: 8000,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2019, 2, 13),
    updatedAt: new Date(2019, 2, 13)
  }]),
  down: queryInterface => queryInterface.bulkDelete('Claims')
};

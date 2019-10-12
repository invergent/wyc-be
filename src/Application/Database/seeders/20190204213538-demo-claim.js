module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Claims', [{
    monthOfClaim: 'Oct, 2018',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2018/10",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 7200,
    requester: 1,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Nov, 2018',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2018/11",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 7400,
    requester: 3,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Dec, 2018',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "applyingMonth": "2018/12",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 7350,
    requester: 3,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Dec, 2018',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "applyingMonth": "2018/12",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 6850,
    requester: 4,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Jan, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/01",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 6900,
    requester: 5,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Jan, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/01",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 6150,
    requester: 6,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Jan, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/01",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 2950,
    requester: 7,
    status: 'Pending',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Jan, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/01",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 6400,
    requester: 8,
    status: 'Processing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'March, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/03",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 8200,
    requester: 6,
    status: 'Processing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'April, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/04",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 9400,
    requester: 6,
    status: 'Processing',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'March, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/03",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 9400,
    requester: 6,
    status: 'Completed',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'March, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/03",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 9400,
    requester: 10,
    status: 'Completed',
    createdAt: new Date(2018, 10, 15),
    updatedAt: new Date(2018, 10, 15)
  },
  {
    monthOfClaim: 'March, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates":["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates":["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates":["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates":["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total":80050,
      "applyingMonth": "2019/03",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 9400,
    requester: 6,
    status: 'Declined',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'March, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/03",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 9400,
    requester: 6,
    status: 'Cancelled',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    monthOfClaim: 'Oct, 2018',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2018/10",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 9400,
    requester: 11,
    status: 'Cancelled',
    createdAt: new Date(2018, 10, 15),
    updatedAt: new Date(2018, 10, 15)
  },
  {
    monthOfClaim: 'Oct, 2018',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2018/10",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 9600,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2018, 10, 15),
    updatedAt: new Date(2018, 10, 15)
  },
  {
    monthOfClaim: 'Nov, 2018',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2018/11",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 6700,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2018, 11, 15),
    updatedAt: new Date(2018, 11, 15)
  },
  {
    monthOfClaim: 'Dec, 2018',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2018/12",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 9800,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2019, 0, 15),
    updatedAt: new Date(2019, 0, 15)
  },
  {
    monthOfClaim: 'Jan, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/01",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 9800,
    requester: 11,
    status: 'Declined',
    createdAt: new Date(2019, 1, 15),
    updatedAt: new Date(2019, 1, 15)
  },
  {
    monthOfClaim: 'Jan, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/01",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 6000,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2019, 1, 17),
    updatedAt: new Date(2019, 1, 17)
  },
  {
    monthOfClaim: 'March, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/03",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 7000,
    requester: 11,
    status: 'Cancelled',
    createdAt: new Date(2019, 2, 13),
    updatedAt: new Date(2019, 2, 13)
  },
  {
    monthOfClaim: 'March, 2019',
    claimElements: 4,
    details: `{
      "overtime": {
        "selectedDates": ["2019-06-30T23:00:00.000Z","2019-07-01T23:00:00.000Z","2019-07-02T23:00:00.000Z","2019-07-07T23:00:00.000Z","2019-07-08T23:00:00.000Z"]
      },
      "shiftDuty": {
        "selectedDates": ["2019-07-21T23:00:00.000Z","2019-07-28T23:00:00.000Z","2019-07-29T23:00:00.000Z","2019-07-22T23:00:00.000Z"]
      },
      "atmDuty": {
        "selectedDates": ["2019-07-17T23:00:00.000Z","2019-07-23T23:00:00.000Z","2019-07-25T23:00:00.000Z","2019-07-19T23:00:00.000Z"]
      },
      "atmSupport": {
        "selectedDates":["2019-07-18T23:00:00.000Z","2019-07-16T23:00:00.000Z","2019-07-24T23:00:00.000Z"]
      },
      "holiday": {
        "selectedDates": ["2019-07-14T23:00:00.000Z","2019-07-15T23:00:00.000Z"]
      },
      "outstation": "55000",
      "allSelectedDates": [1,2,3,8,9,22,29,30,23,18,24,26,20,19,17,25,15,16],
      "total": 80050,
      "applyingMonth": "2019/03",
      "currentlyPressedBtn": "outstation",
      "visiblePaneItems":6
    }`,
    amount: 8000,
    requester: 11,
    status: 'Completed',
    createdAt: new Date(2019, 2, 13),
    updatedAt: new Date(2019, 2, 13)
  }]),
  down: queryInterface => queryInterface.bulkDelete('Claims')
};

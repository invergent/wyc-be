class Dates {
  static getPreviousYearMonth() {
    const { year, month } = Dates.getCurrentYearMonth();
    return new Date(year, month, 0);
  }

  static getLastMonthYearAndMonth() {
    const previousYearMonth = Dates.getPreviousYearMonth();
    const year = previousYearMonth.getFullYear();
    const month = previousYearMonth.getMonth();
    return { year, month };
  }

  static getCurrentYearMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    return { year, month };
  }

  static convertPreviousYearMonthToString() {
    const previousYearMonth = this.getPreviousYearMonth().toDateString().split(' ');
    const month = previousYearMonth[1];
    const year = previousYearMonth[3];
    return `${month}, ${year}`;
  }
}

export default Dates;

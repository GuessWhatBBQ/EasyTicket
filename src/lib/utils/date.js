function splitDateToBeforeAndAfter(tripDate) {
    const tripDateFormatted = {};
    const today = new Date();
    today.setDate(today.getDate() - 1);
    tripDateFormatted.beforeToday = tripDate.filter((trip) => {
        if (new Date(trip.starting_date) < today) {
            return true;
        }
        return false;
    });
    tripDateFormatted.afterToday = tripDate.filter((trip) => {
        if (new Date(trip.starting_date) >= today) {
            return true;
        }
        return false;
    });
    return tripDateFormatted;
}

exports.splitDateToBeforeAndAfter = splitDateToBeforeAndAfter;

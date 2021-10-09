function splitDateToBeforeAndAfter(tripDate) {
    const tripDateFormatted = {};
    const today = new Date();
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

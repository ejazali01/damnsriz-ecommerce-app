const getTimedifference = (timestamp) => {

    const currentDate = new Date();
    const givenDate = new Date(timestamp);

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - givenDate;

    // Convert milliseconds to desired units (years, days, hours, minutes, seconds)
    const totalSeconds = Math.floor(timeDifference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalYears = Math.floor(totalDays / 365);

    // Calculate remaining hours after subtracting days
    const remainingDays = totalDays % 365;
    const remainingHours = totalHours % 24;
    const remainingMinutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;

    // Format the time difference based on the largest applicable unit
    let formattedDifference = '';

    if (totalYears > 0) {
        formattedDifference = `${totalYears}y:${remainingDays}d:${remainingHours}h:${remainingMinutes}m`;
    } else if (remainingDays > 0) {
        formattedDifference = `${remainingDays}d:${remainingHours}h:${remainingMinutes}m`;
    } else if (remainingHours > 0) {
        formattedDifference = `${remainingHours}h:${remainingMinutes}m`;
    } else {
        formattedDifference = `${remainingMinutes}m`;
    }

    return formattedDifference;

};

export { getTimedifference };

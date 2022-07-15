function isOutdated(date) {
    return !date || Date.now() - date > 10 * 60 * 1000;
}

export default isOutdated;

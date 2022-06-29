function isOutdated(date) {
    if (!date || Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export default isOutdated;

class TokenService {
    // userId: accessToken:	refreshToken: exporesIn:
    generate({ userId }) {
        return {
            userId,
            accessToken: null,
            refreshToken: null,
            exporesIn: null
        };
    }
}

module.exports = new TokenService();

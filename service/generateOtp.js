module.exports = function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000);
}
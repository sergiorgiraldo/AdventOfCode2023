const gcd = (x, y) => (!y ? x : gcd(y, x % y)); // recursive, get remainder until it is 0

const lcm = (x, y) => (x * y) / gcd(x, y); 

module.exports = { gcd, lcm };
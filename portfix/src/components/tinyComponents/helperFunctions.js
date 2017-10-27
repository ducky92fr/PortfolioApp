
// Function that takes in the securities in the Portfolio and returns
// the portfolio P&L
export function calculatePortfolioPnL (securities) {
  let PNL = 0
  securities.forEach(security => {
    PNL += security.PL
  })
  return PNL
}

// Function that takes in a security and returns its P&L
export function calculateSecurityPnL (security) {
  return security.IEXprice - security.breakEven
}

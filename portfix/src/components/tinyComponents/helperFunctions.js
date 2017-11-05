import dateFormat from 'dateformat'

// Function that takes in the securities in the Portfolio and returns
// the portfolio value
export function calculatePortfolioValue (securities) {
  let value = 0
  securities.forEach(security => {
    if (security.ticker === 'PFAPPCASH') value += parseInt(security.quantity)
    if (security.ticker !== 'PFAPPCASH') value += parseInt(security.quantity) * parseInt(security.IEXprice)
  })
  return value
}

// Function that takes in the securities in the Portfolio and returns
// the portfolio P&L
export function calculatePortfolioPnL (securities) {
  let PNL = 0
  securities.forEach(security => {
    if (security.ticker === 'PFAPPCASH') PNL += 0
    if (security.ticker !== 'PFAPPCASH') PNL += parseInt(security.quantity) * parseInt(security.PL)
  })
  return (PNL / calculatePortfolioValue(securities))
}

// Function that takes in a security and returns its P&L
export function calculateSecurityPnL (security) {
  return security.IEXprice - security.breakEven
}

// Function that formats the P&L
export function formatPL (PL) {
  return (PL * 100).toFixed(2) + '%'
}

// Function that formats Dates
export function formatDates (date) {
  return dateFormat(date, 'd mmm yyyy')
}

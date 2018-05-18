const {inspect} = require('util')

const defaultSummaryInterval = 30e3

// globals
// =

var summaryInterval
var summaries = {}

// exported api
// =

module.exports = {
  log (...args) {
    addSummary('log', args)
  },
  error (...args) {
    addSummary('error', args)
  },
  setInterval (ts) {
    if (summaryInterval) clearInterval(summaryInterval)
    summaryInterval = setInterval(outputSummary, ts)
    summaryInterval.unref()
  }
}

// internal methods
// =

function ensureSummaryIntervalIsActive () {
  if (!summaryInterval) {
    module.exports.setInterval(defaultSummaryInterval)
  }
}

function addSummary (type, args) {
  ensureSummaryIntervalIsActive()

  // create summary
  var out = args.map(toOut).join(' ')
  var summaryLine = getSummaryLine(out)

  // store summary for interval output
  if (!(summaryLine in summaries)) {
    summaries[summaryLine] = {log: (type === 'log'), count: 1}
  } else {
    summaries[summaryLine].count++
  }

  // log full item to file
  // TODO
}

function outputSummary () {
  // output all summaries
  for (var summaryLine in summaries) {
    let summary = summaries[summaryLine]
    if (summary.count > 1) {
      summaryLine = `(${summary.count}x) ${summaryLine}`
    }
    if (summary.log) {
      console.log(summaryLine)
    } else {
      console.error(summaryLine)      
    }
  }
  summaries = {}
}

function getSummaryLine (v) {
  return v.split('\n')[0]
}

function toOut (v) {
  if (typeof v === 'string') {
    return v
  }
  return inspect(v)
}
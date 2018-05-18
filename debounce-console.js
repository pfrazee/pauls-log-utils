// globals
// =

var debounces = {}

// exported api
// =

module.exports = {
  log (msg, timeout, ...args) {
    addDebounce('log', msg, timeout, args)
  },
  error (msg, timeout, ...args) {
    addDebounce('error', msg, timeout, args)
  }
}

// internal methods
// =

function addDebounce (type, msg, timeout, args) {
  if (msg in debounces) {
    // count the call
    clearTimeout(debounces[msg].timeout)
    debounces[msg].calls++
  } else {
    // save
    debounces[msg] = {
      log: (type === 'log'),
      timeout: null,
      args,
      calls: 1
    }
  }

  // queue up next call
  debounces[msg].timeout = setTimeout(outputDebounce, timeout, msg) 
  debounces[msg].timeout.unref()
}

function outputDebounce (msg) {
  var debounce = debounces[msg]
  if (!debounce) return // sanity check

  var extra = debounce.calls > 1 ? [`(${debounce.calls}x)`] : debounce.args
  if (debounce.log) {
    console.log(msg, ...extra)
  } else {
    console.error(msg, ...extra)    
  }
  delete debounces[msg]
}
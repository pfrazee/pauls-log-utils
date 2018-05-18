// globals
// =

var debounces = {}

// exported api
// =

module.exports = {
  log (msg, opts, ...args) {
    addDebounce('log', msg, opts, args)
  },
  error (msg, opts, ...args) {
    addDebounce('error', msg, opts, args)
  }
}

// internal methods
// =

function toOpts (v) {
  if (typeof v === 'number') {
    return {timeout: v}
  }
  return v
}

function addDebounce (type, msg, opts, args) {
  opts = toOpts(opts)
  if (msg in debounces) {
    // count the call
    clearTimeout(debounces[msg].debounceTimeout)
    debounces[msg].calls++
  } else {
    // save
    debounces[msg] = {
      log: (type === 'log'),
      debounceTimeout: null,
      maxTimeout: null,
      args,
      calls: 1
    }
    if (opts.max) {
      // set max timer
      debounces[msg].maxTimeout = setTimeout(outputDebounce, opts.max, msg) 
      debounces[msg].maxTimeout.unref()
    }
  }

  // queue up next call
  debounces[msg].debounceTimeout = setTimeout(outputDebounce, opts.timeout, msg) 
  debounces[msg].debounceTimeout.unref()
}

function outputDebounce (msg) {
  var debounce = debounces[msg]
  if (!debounce) return // sanity check

  // output
  var extra = debounce.calls > 1 ? [`(${debounce.calls}x)`] : debounce.args
  if (debounce.log) {
    console.log(msg, ...extra)
  } else {
    console.error(msg, ...extra)    
  }

  // cleanup
  clearTimeout(debounces[msg].debounceTimeout)
  clearTimeout(debounces[msg].maxTimeout)
  delete debounces[msg]
}
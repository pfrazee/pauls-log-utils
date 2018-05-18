# pauls-log-utils

Use STDIO like your ops console. (An assortment of things I needed for Hashbase.)

## summaryConsole

```
summaryConsole.log(msg, ...more)
summaryConsole.error(msg, ...more)
summaryConsole.setInterval(ts)
```

Accumulates the log()s and outputs the first line on an interval. Duplicates are grouped together.

```js
const {summaryConsole} = require('pauls-log-utils')

summaryConsole.log('Hello world!\nMore details')
summaryConsole.log('Hello world!\nMore details')
summaryConsole.log('Hello world!\nMore details')
await sleep(30e3)
// will output "(3x) Hello world!"

summaryConsole.log('Hello world!\nMore details')
await sleep(30e3)
// will output "Hello world!"

summaryConsole.error('same usage as log but to stderr')
summaryConsole.setInterval(5e3) // more frequent
```

## debounceConsole

```
debounceConsole.log(msg, timeout, ...more)
debounceConsole.error(msg, timeout, ...more)
```

Debounces the log()s by the first param `msg`. If only one call is made, will output `...more`. Otherwise will output the repeat count.

(Note this is not like `summaryConsole`. The summary console outputs the first line always, whereas this one outputs `msg` if there are multiple and also outputs `...more` if there's just one call. Not sure if it makes sense that the APIs are different, but that's what I did.)

```js
const {debounceConsole} = require('pauls-log-utils')

debounceConsole.log('Hello', 500, 'world!')
debounceConsole.log('Hello', 500, 'world!')
debounceConsole.log('Hello', 500, 'world!')
await sleep(500)
// will output "Hello (3x)" (summary output)

debounceConsole.log('Hello', 500, 'world!')
await sleep(500)
// will output "Hello world!" (full output)

debounceConsole.error('same usage as log but to stderr', 500)
```

Can also specify a max wait on the debounce:

```
debounceConsole.log('Hi!', {timeout: 500, max: 3e3}, 'some', 'more')
```

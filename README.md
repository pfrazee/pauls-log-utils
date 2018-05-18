# pauls-log-utils

Use STDIO like your ops console. (An assortment of things I needed for Hashbase.)

## summaryConsole

Accumulates the log()s and outputs them on an interval. Duplicates are grouped together.

```js
const {summaryConsole} = require('pauls-log-utils')

summaryConsole.log('Hi!')
summaryConsole.log('Hi!')
summaryConsole.log('Hi!')
// in 30s will output "(3x) Hi!"

summaryConsole.error('same usage as log but to stderr')
summaryConsole.setInterval(5e3) // more frequent
```
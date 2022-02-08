# cli-stage
**Simple tool for displaying stages in the terminal**
![demo](https://i.imgur.com/wEpqxfX.gif)

## Example
```js
import { CliStage } from 'cli-stage'

const wait = timeout => new Promise(r => setTimeout(r, timeout))

;(async () => {
  const cls = new CliStage('Installing', 'Building', 'Packing')
  cls.start()
  await wait(5000)
  cls.success()
  await wait(5000)
  cls.success()
  await wait(5000)
  cls.error()
})()
```

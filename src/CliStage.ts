import { Spinner } from 'cli-spinner'

import chalk from 'chalk'
import figures from 'figures'

export class CliStage {
  private currentStage: string
  private stageIndex: number = 0
  private readonly maxStageIndex: number
  private readonly stages: string[]

  private spinner: Spinner = new Spinner()

  constructor(...stages: string[]) {
    if (stages.length === 0)
      throw new Error('The number of stages must be greater than 0')
    this.stages = stages
    this.maxStageIndex = stages.length
    this.currentStage = stages[this.stageIndex]
    this.spinner.setSpinnerString(18)
    this.spinner.setSpinnerTitle(this.currentStage)
  }

  start() {
    this.spinner.start()
  }

  success() {
    try {
      this.stop('success')
    } catch (e) {
    }
  }

  error() {
    try {
      this.stop('error')
    } catch (e) {
    }
  }

  private stop(result: 'error' | 'success') {
    this.spinner.stop()
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    if (result === 'success') {
      process.stdout.write(
        `${chalk.green(figures.tick)} ${this.currentStage}\n`
      )
    } else {
      process.stdout.write(`${chalk.red(figures.cross)} ${this.currentStage}\n`)
    }
    if (this.stageIndex < this.maxStageIndex) {
      this.currentStage = this.stages[++this.stageIndex]
      this.spinner.setSpinnerTitle(this.currentStage)
      this.spinner.start()
    }
  }
}

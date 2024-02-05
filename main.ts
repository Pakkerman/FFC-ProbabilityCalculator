type Balls = { [key: string]: number }

class Hat {
  contents: Array<string>
  initialContents: Array<string>
  ballCounts: { [key: string]: number }

  constructor(balls: Balls) {
    this.ballCounts = balls
    this.initialContents = []
    this.initContents()
    this.contents = []
    this.refillContents()
  }

  draw(): string {
    if (this.contents.length === 0) return 'empty hat'

    const idx = Math.floor(Math.random() * this.contents.length)
    if (1 < this.contents.length) {
      const tmp = this.contents[idx]
      const last = this.contents.length - 1
      this.contents[idx] = this.contents[last]
      this.contents[last] = tmp
    }
    const out = this.contents.pop()!
    return out
  }

  getBalls(): string[] {
    return this.contents
  }
  getBallCounts(): Balls {
    return this.ballCounts
  }

  refillContents(): void {
    this.contents = []
    for (const ball of this.initialContents) {
      this.contents.push(ball)
    }
  }

  initContents(): void {
    for (const key of Object.keys(this.ballCounts)) {
      for (let i = this.ballCounts[key]; i > 0; i--) {
        this.initialContents.push(key)
      }
    }
  }
}

function experiment(
  hat: Hat,
  target: Balls,
  num_balls_drawn: number,
  num_experiments: number
): number {
  let successes = 0
  for (let i = 0; i < num_experiments; i++) {
    if (runDraws()) successes++
  }

  function runDraws(): boolean {
    hat.refillContents()
    const draws: Balls = {}
    for (let i = num_balls_drawn; i > 0; i--) {
      const ball = hat.draw()
      if (!draws[ball]) draws[ball] = 0
      draws[ball]++
    }

    for (const key of Object.keys(target)) {
      if (draws[key] !== target[key]) return false
    }

    return true
  }

  return 0
}
const hat = new Hat({ blue: 4, red: 2, green: 6 })
const probability = experiment(hat, { red: 1, blue: 2 }, 4, 3000)
console.log('Probability:', probability)

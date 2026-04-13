import { bootstrap } from './core/bootstrap'

async function main() {
  try {
    await bootstrap()
  } catch (error) {
    console.error('Failed to start application:', error)
    process.exit(1)
  }
}

main()
const formatTimestamp = () => {
  return new Date().toISOString()
}

export const logger = {
  info: (...args: unknown[]) => {
    console.log(`[INFO] [${formatTimestamp()}]`, ...args)
  },
  warn: (...args: unknown[]) => {
    console.warn(`[WARN] [${formatTimestamp()}]`, ...args)
  },
  error: (...args: unknown[]) => {
    console.error(`[ERROR] [${formatTimestamp()}]`, ...args)
  },
  debug: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] [${formatTimestamp()}]`, ...args)
    }
  }
}
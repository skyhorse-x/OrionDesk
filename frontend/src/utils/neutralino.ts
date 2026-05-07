export const isNeutralino = () => typeof window !== 'undefined' && !!window.Neutralino

export const ensureNeutralinoReady = async (): Promise<boolean> => {
  if (!isNeutralino()) return false
  return new Promise((resolve) => {
    if (window.Neutralino && typeof window.Neutralino.computer?.getOSInfo === 'function') {
      resolve(true)
      return
    }
    window.addEventListener('Neutralino.ready', () => resolve(true))
    setTimeout(() => resolve(false), 5000)
  })
}

export const getNeutralino = () => {
  if (!window.Neutralino) throw new Error('Neutralino is not available')
  return window.Neutralino
}

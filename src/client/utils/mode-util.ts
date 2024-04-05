export enum AppMode {
  MAIN = 'main',
  SERVER = 'server'
}

export const getCurrentAppmode = (): AppMode => (window as any).__APP_MODE__ as AppMode;

type iGameMethods = {
  create: () => void,
  edit: (id: string, call?: (id: string) => void) => void,
}

export {
  iGameMethods
}
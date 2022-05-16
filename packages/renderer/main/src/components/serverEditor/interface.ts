type iServerMethods = {
  create: () => void,
  edit: (id: string, call?: (id: string) => void) => void,
}

export {
  iServerMethods
}
type iMContextMenuItem = {
  id: number,
  type: 'item',
  title: string,
  warn?: boolean,
  icon?: string,
  disabled?: boolean,
} | {
  type: 'line',
}

export {
  iMContextMenuItem
}
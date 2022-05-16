const calcTimeDiff = (time: number) => {
  const now = new Date().getTime();
  const diff = now - time * 1000;

  if (diff < 60000)
    return {
      path: 'time.justnow'
    }
  if (diff < 3600000)
    return {
      path: 'time.minutesago',
      args: {
        m: Math.floor(diff / 60000)
      }
    }
  if (diff < 86400000)
    return {
      path: 'time.hoursago',
      args: {
        h: Math.floor(diff / 3600000)
      }
    }
  if (diff < 172800000)
    return {
      path: 'time.yesterday'
    }
  if (diff < 604800000)
    return {
      path: 'time.daysago',
      args: {
        d: Math.floor(diff / 86400000)
      }
    }
  return {
    path: 'time.weeksago',
    args: {
      w: Math.floor(diff / 604800000)
    }
  }
}

export {
  calcTimeDiff
}
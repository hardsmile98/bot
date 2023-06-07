function escape (str: string | undefined): string {
  if (!str) {
    return ''
  }

  return str.replace(/[|\\{()[^$+*?.-]/g, '\\$&')
}

export {
  escape
}

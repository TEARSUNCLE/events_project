export const getPageTitle = (name: string) => {
  const title = 'ev_'
  if (name) {
    return `${title}${name}`
  }
  return title
}
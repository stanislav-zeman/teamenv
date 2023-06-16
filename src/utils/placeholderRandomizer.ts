const placeholderMessages = [
  'Name of cool project',
  'I am hungery',
  'Give A pls',
  'Points for effort',
  '9/10 by dentists',
  ':--)',
  'Javascript != Java',
  'stonks',
  '?????',
]

export const placeholderRandomizer = () => {
  return placeholderMessages[
    Math.floor(Math.random() * placeholderMessages.length)
  ]
}

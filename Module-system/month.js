var monthNames = ['January', 'Feburary', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
]

export function name(number) {
  return monthNames[number]
}

export function number(name) {
  return monthNames.indexOf(name)
}
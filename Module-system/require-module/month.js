var monthNames = ['January', 'Feburary', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
]

function name(number) {
  return monthNames[number]
}

function number(name) {
  return monthNames.indexOf(name)
}

exports.name = name
exports,number = number
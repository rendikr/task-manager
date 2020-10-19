const calculateTip = (total, tipPercent = 10) => {
  const tip = (total * tipPercent) / 100
  return total + tip
}

const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
  return (temp * 1.8) + 32
}

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('number must be positive number')
      }
      resolve(a + b)
    }, 2000)
  })
}

module.exports = {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add
}

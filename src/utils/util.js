import * as mathjs from "mathjs";

export function formatDisplay(value) {
  if (value > 999999999 || value < -999999999) {
    value = mathjs.format(value, { notation: "exponential" });
    let exponent = value.substring(value.indexOf("e") + 1).startsWith("+")
      ? value.substring(value.indexOf("e") + 2)
      : value.substring(value.indexOf("e") + 1);
    let coefficient = parseFloat(value.substring(0, value.indexOf("e")));
    coefficient = mathjs.round(coefficient, 9 - exponent.length - 1);
    if (coefficient === 10) {
      coefficient = 1;
      exponent = parseInt(exponent, 10) + 1;
    }
    if (coefficient === -10) {
      coefficient = -1;
      exponent = parseInt(exponent, 10) + 1;
    }
    value = coefficient + "e" + exponent;
  } else {
    let isNumber = value.toString().match(/^-?[0-9]\d*(\.\d+)?$/) != null;
    if (isNumber) {
      value = numberWithCommas(value);
    }
  }
  if (Number.isFinite(value)) {
    return value.toString();
  }
  return value;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

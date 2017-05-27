module.exports = {
  anySymbol: {
    regExp: /./,
    descr: `сопоставляется с любым символом за исключением символов новой строки: \n, \r, \u2028 или \u2029`
  },
  processId: {
    regExp: /ProcessId=("([^"]|"")*")/,
    descr: `Удаление всех ProcessId`,
    result: undefined
  },
  beforeSemikolon: {
    regExp: /(\w.+?:)/,
    descr: `Захват всей строки до двоеточия`
  },
  afterSemikolon: {
    regExp: /(: .+)/,
    descr: `2029`
  },
  getUnderscoreSymbol: {
    regExp: /[_]/,
    descr: `Get Underscore Symbol`
  },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
  // anySymbol: {
  //   regExp: //,
  //   descr: `2029`
  // },
}

import { expect }        from 'chai'
import path              from 'node:path'
import { readFile }      from 'node:fs/promises'
import { transliterate } from './transliterate.js'

import { describe, it } from 'node:test'

const dataDir = path.resolve(import.meta.dirname, `./data`)

const blnsJSON = await readFile(path.join(dataDir, `blns.json`))
const blns     = JSON.parse(blnsJSON)

const chatinoJSON = await readFile(path.join(dataDir, `chatino.json`))
const chatino     = JSON.parse(chatinoJSON)

describe(`transliterate`, function() {

  it(`accepts empty strings`, function() {

    const substitutions = { t: `d` }
    const output        = transliterate(``, substitutions)

    expect(output).to.be.empty

  })

  it(`accepts Maps`, function() {

    const substitutions = new Map([
      [`a`, `aa`],
      [`bc`, `cc`],
      [`b`, `bb`],
    ])

    const input         = `abbc`
    const correctOutput = `aabbcc`
    const actualOutput  = transliterate(input, substitutions)

    expect(actualOutput).to.be.equal(correctOutput)

  })

  it(`handles bleeding problems`, function() {

    const substitutions = {
      s:  `z`,
      ts: `c`,
    }

    const input         = `atsa`
    const correctOutput = `aca`
    const actualOutput  = transliterate(input, substitutions)

    expect(actualOutput).to.equal(correctOutput)

  })

  it(`handles feeding problems`, function() {

    const substitutions = {
      d: `θ`,
      t: `d`,
    }

    const input         = `atada`
    const correctOutput = `adaθa`
    const actualOutput  = transliterate(input, substitutions)

    expect(actualOutput).to.equal(correctOutput)

  })

  it(`handles naughty strings`, function() {

    const substitutions = { ʃ: `s` }

    for (const str of blns) {
      expect(transliterate(str, substitutions)).to.equal(str)
    }

  })

  it(`handles numbers as inputs`, function() {

    const substitutions = {
      0: `a`,
      1: `b`,
      2: `c`,
      3: `d`,
      4: `e`,
      5: `f`,
      6: `g`,
      7: `h`,
      8: `i`,
      9: `j`,
    }

    const input         = `0123456789`
    const correctOutput = `abcdefghij`
    const actualOutput  = transliterate(input, substitutions)

    expect(actualOutput).to.equal(correctOutput)

  })

  it(`retains line breaks`, function() {

    const substitutions = {}

    const input = `Hello world,
    This is some multi-line input.\nThis is also multi-line.`

    const output = transliterate(input, substitutions)

    expect(output).to.equal(input)

  })

  it(`transliterates Chatino`, function() {

    const input         = `ji_& xiku_na!7a laa7 nka7nelo!7o_ na! nkata_a!`
    const correctOutput = `jï̱ xiku̱ná'a laa' nka'neló'o̱ ná nkata̱á`
    const actualOutput  = transliterate(input, chatino)

    expect(actualOutput).to.equal(correctOutput)

  })

})

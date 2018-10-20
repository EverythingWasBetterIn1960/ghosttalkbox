import {expect} from 'chai'
import questionParser from './characterQuestionParser'

describe.only('Character Question Parser', () => {
  it('Will return null if no match', () => {
    const res1 = questionParser('Hello')
    const res2 = questionParser('World')
    const res3 = questionParser('I love ghosts')

    expect(res1).to.equal(null)
    expect(res2).to.equal(null)
    expect(res3).to.equal(null)
  })
  it('Will return a match rule on a match', () => {
    const res1 = questionParser('Are you at rest')
    const res2 = questionParser('WhERe did you die')
    const res3 = questionParser('is HEAVEN rEaL')

    expect(res1).to.equal('AT_PEACE')
    expect(res2).to.equal('LOCATION')
    expect(res3).to.equal('HEAVEN')
  })
  it('Will ignore punctuation', () => {
    const res1 = questionParser('Are you at rest')
    const res2 = questionParser('WhERe did you die')
    const res3 = questionParser('is HEAVEN rEaL')
    expect(res1).to.equal('AT_PEACE')
    expect(res2).to.equal('LOCATION')
    expect(res3).to.equal('HEAVEN')
  })
})

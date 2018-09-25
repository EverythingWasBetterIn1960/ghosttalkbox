const {expect} = require('chai');
const db = require('../db')
const {Interaction, Character} = require('./index');

describe('Interaction Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  it('requires response not to be null', async () => {
    try{
      await Interaction.create();
      throw new Error('Interaction was created without a response');
    } catch(err){
        expect(err.message).to.equal('notNull Violation: interaction.response cannot be null'
        )
    }
  })
  it('can find the root interaction for a character', async () => {
    await Character.create({name: "George"});
    await Interaction.create({
      response: "Hello",
      isRoot: true,
      CharacterId: 1
    });
    await Interaction.create({
      response: "Goodbye",
      isRoot: false,
      CharacterId: 1
    });

    const rootInteraction = await Interaction.findRoot(1);
    expect(rootInteraction.response).to.equal("Hello");
  })
})

/**
 * The Character Question Parser parses user input and determines whether there is a match for a factual question that can be answered from the ghost's profile.
 *
 * ex: What is your name? - parses to 'name', character will respond with name
 *
 * The Question Parser consists of the ruleTrie and a parsing algorithm.
 *
 * The ruleTrie is a set of nested objects that represent the composition of a question.
 * A word object's properties are the potential next words in the question. At a questions end or when enough of a question has been constructed to match a profile rule, the word node will contain a boolean to stop parsing and an identifier for the profile rule the question meets will be returned.
 *
 * The parsing algorithm traverses the ruleTrie, looking to match each word in the question with a corresponding property in the current ruleTrie node until either a rule is met or no matches can be made.
 */

const dummyResposes = ['response 1', 'response 2', 'response 3']

const ruleTypes = {
  AFTERLIFE: {
    AT_PEACE: 'AT_PEACE',
    LOCATION: {
      HEAVEN: 'HEAVEN'
    }
  },
  DEATH: {
    LOCATION: 'DEATH_LOCATION',
    CAUSE: 'CAUSE_OF_DEATH',
    MURDERED: 'MURDERED'
  },
  DESIRES: {},
  PROFILE: {
    FAMILY: {
      CHILDREN: 'CHILDREN',
      PARENTS: 'PARENTS',
      SIBLINGS: 'SIBLINGS',
      SPOUSE: {
        WIFE_NAME: 'WIFE_NAME',
        HUSBAND_NAME: 'HUSBAND_NAME'
      }
    },
    HOMETOWN: 'HOMETOWN',
    GENDER: 'GENDER',
    NAME: 'NAME',
    PET: 'PET',
    YEAR_OF_BIRTH: 'YEAR_OF_BIRTH',
    YEAR_OF_DEATH: 'YEAR_OF_DEATH',
    WEALTH: 'WEALTH'
  }
}

const ruleTrie = {
  are: {
    you: {
      angry: {},
      afraid: {},
      at: {
        rest: {profileRule: ruleTypes.AFTERLIFE.AT_PEACE},
        the: {
          pearly: {
            gates: {}
          }
        }
      },
      happy: {},
      sad: {},
      holding: {
        on: {
          to: {
            anything: {}
          }
        }
      },
      in: {
        heaven: {},
        hell: {},
        purgatory: {},
        pain: {},
        denial: {}
      },
      male: {
        or: {
          female: {}
        }
      }
    }
  },
  can: {
    you: {
      see: {
        us: {},
        god: {},
        my: {
          mother: {},
          father: {},
          grand: {},
          son: {},
          daughter: {}
        }
      },
      fly: {},
      taste: {},
      touch: {},
      hear: {},
      remember: {}
    }
  },
  does: {
    god: {
      exist: {},
      love: {
        us: {},
        you: {}
      },
      forgive: {us: {}, you: {}, me: {}, sinners: {}}
    },
    love: {}
  },
  do: {},
  did: {
    you: {
      die: {
        because: {},
        from: {},
        in: {
          battle: {}
        },
        of: {
          sickness: {}
        }
      },
      have: {
        a: {
          dog: {},
          good: {
            life: {}
          },
          husband: {},
          spouse: {},
          wife: {}
        },
        an: {
          illness: {}
        },
        brothers: {
          and: {
            sisters: {}
          }
        },
        children: {},
        sibling: {},
        sisters: {}
      },
      like: {
        to: {
          dance: {},
          travel: {}
        }
      }
    }
  },
  has: {},
  have: {},
  how: {
    did: {
      you: {
        die: {
          profileRule: ruleTypes.DEATH.CAUSE
        }
      }
    },
    old: {
      were: {
        you: {
          when: {
            you: {
              died: {}
            }
          }
        }
      }
    }
  },
  is: {
    heaven: {
      real: {
        profileRule: ruleTypes.AFTERLIFE.LOCATION.HEAVEN
      }
    }
  },
  was: {},
  were: {
    you: {
      happy: {
        in: {
          your: {
            life: {}
          }
        }
      },
      married: {},
      murdered: {},
      poor: {},
      rich: {}
    }
  },
  who: {},
  what: {
    did: {you: {do: {for: {a: {living: {}}}}}},
    do: {you: {do: {in: {the: {afterlife: {}}}}}},
    is: {your: {birthdate: {}, name: {}}},
    was: {
      your: {
        birthdate: {},
        husbands: {name: {}},
        "husband's": {name: {}},
        spouse: {name: {}},
        "spouse's": {name: {}},
        wifes: {name: {}},
        "wife's": {name: {}}
      }
    },
    were: {
      your: {
        hobbies: {}
      }
    },
    year: {
      were: {you: {born: {}, married: {}, killed: {}}},
      did: {you: {die: {}}}
    }
  },
  when: {
    did: {
      you: {die: {}}
    }
  },
  where: {
    did: {
      you: {
        die: {
          profileRule: ruleTypes.DEATH.LOCATION
        },
        like: {
          to: {
            travel: {},
            go: {}
          }
        },
        live: {}
      }
    },
    were: {
      you: {
        born: {},
        killed: {},
        married: {}
      },
      your: {
        parents: {
          from: {}
        }
      }
    }
  },
  why: {
    are: {
      you: {
        still: {
          here: {}
        }
      }
    },
    did: {
      you: {
        die: {}
      }
    }
  }
}

const parsingAlgorithm = input => {
  //remove punctuation
  const lastChar = input[input.length - 1]
  if (lastChar === '?' || lastChar === '.' || lastChar === '!') {
    input = input.slice(0, input.length - 1)
  }

  const inputArray = input.toLowerCase().split(' ')
  console.log(inputArray)
  let idx = 0
  let profileRule = null
  let currentNode = ruleTrie
  let parsing = true

  while (parsing && idx <= inputArray.length) {
    if (currentNode.profileRule) {
      profileRule = currentNode.profileRule
      parsing = false
    } else if (currentNode[inputArray[idx]]) {
      currentNode = currentNode[inputArray[idx]]
      idx++
    } else {
      parsing = false
    }
  }
  return profileRule
}

export default parsingAlgorithm

export const teams = [
  {
    name: 'xxx',
    displayName: 'A-team',
    image: 'https://goodlogo.com/images/logos/the_a-team_logo_2777.gif',
    members: [{
      fullName: 'John  Smith',
      character: 'Hannibal',
      actor: 'George Peppard',
    }, {
      fullName: 'Templeton  Peck',
      character: 'Face',
      actor: 'Dirk Benedict',
    }, {
      fullName: 'H.M.  Murdock',
      character: 'Howling Mad',
      actor: 'Dwight Schultz',
    }, {
      fullName: 'Bosco  Baracus',
      character: 'B.A.',
      actor: 'Mr. T',
    }],
  }, {
    name: 'zzz',
    displayName: 'Avengers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Marvel%27s_The_Avengers_logo.svg',
    members: [{
      actor: 'Robert Downey Jr.',
      character: 'Iron Man',
      fullName: 'Tony Stark ',
    },
    {
      actor: 'Chris Evans',
      character: 'Captain America',
      fullName: 'Steve Rogers ',
    },
    {
      actor: 'Mark Ruffalo',
      character: 'The Hulk',
      fullName: 'Bruce Banner ',
    },
    {
      actor: 'Chris Hemsworth',
      character: 'Thor',
      fullName: 'Thor',
    },
    {
      actor: 'Scarlett Johansson',
      character: 'Black Widow',
      fullName: 'Natasha Romanoff ',
    },
    {
      actor: 'Jeremy Renner',
      character: 'Hawkeye',
      fullName: 'Clint Barton ',
    },
    {
      actor: 'Tom Hiddleston',
      character: 'Loki',
      fullName: 'Loki',
    },
    {
      actor: 'Clark Gregg',
      character: 'Agent Phil Coulson',
      fullName: 'Agent Phil Coulson',
    },
    {
      actor: 'Cobie Smulders',
      character: 'Agent Maria Hill',
      fullName: 'Agent Maria Hill',
    },
    {
      actor: 'Stellan Skarsgard',
      character: 'Selvig',
      fullName: 'Selvig',
    },
    {
      actor: 'Samuel L. Jackson',
      character: 'Nick Fury',
      fullName: 'Nick Fury',
    },
    {
      actor: 'Gwyneth Paltrow',
      character: 'Pepper Potts',
      fullName: 'Pepper Potts',
    },
    {
      actor: 'Paul Bettany',
      character: 'Jarvis (voice)',
      fullName: 'Jarvis (voice)',
    },
    {
      actor: 'Alexis Denisof',
      character: 'The Other',
      fullName: 'The Other',
    },
    {
      actor: 'Tina Benko',
      character: 'NASA Scientist',
      fullName: 'NASA Scientist',
    }],
  }];

export const getTeams = (name) => teams.filter((item => item.name === name));
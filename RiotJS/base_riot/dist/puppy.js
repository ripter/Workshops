riot.tag2('puppy', '<h1>Rose {title}</h1>', '', '', function(opts) {
    const titles = [
      'The Puppy',
      'The Princess',
      'The Pirate',
      'smoosh face'
    ];
    const index = 0 | (Math.random() * titles.length);

    this.title = titles[index];
}, '{ }');

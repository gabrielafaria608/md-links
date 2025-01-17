const {
  extractLinks,
  validate,
  stats,
  checkStatusOfLinks,
} = require('../src/validate-stats.js');

describe('extractLinks', () => {
  it('should extract all links of a file', () => {
    const path = './files/test.md';
    const links = [
      {
        text: 'test 1',
        url: 'https://becode.com.br/wp-content/uploads/2018/07/teste-logica-1152x605.png',
        file: './files/test.md',
      },
      {
        text: 'test 2',
        url: 'https://pt.wikipedia.org/wiki/Teste_de_software',
        file: './files/test.md',
      },
      {
        text: 'test 3',
        url: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%',
        file: './files/test.md',
      },
      {
        text: 'test 4',
        url: 'https://pt.wikipedia.org/wiki/Teste_de_software',
        file: './files/test.md',
      },
    ];
    extractLinks(path)
      .then((result) => expect(result).toEqual(links));
  });
});

describe('validate', () => {
  it('should return status 200 for a valid link', () => {
    const MOCK_FETCH = 200;
    global.fetch = jest.fn(() => Promise.resolve({
      status: (MOCK_FETCH),
    }));
    const validLink = [{
      url: 'https://www.youtube.com',
    }];
    validate(validLink)
      .then((response) => {
        expect(response).toEqual([{
          url: 'https://www.youtube.com',
          status: MOCK_FETCH,
        }]);
      });
  });

  it('should return status 400 for a invalid link', () => {
    const MOCK_FETCH = 400;
    global.fetch = jest.fn(() => Promise.resolve({
      status: (MOCK_FETCH),
    }));
    const brokenLink = [{
      url: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%',
    }];
    validate(brokenLink)
      .then((response) => {
        expect(response).toEqual([{
          url: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%',
          status: MOCK_FETCH,
        }]);
      });
  });
});

describe('stats', () => {
  it('should inform statistics from a array of links', () => {
    const arrayOfLinks = [
      {
        text: 'test 1',
        url: 'https://becode.com.br/wp-content/uploads/2018/07/teste-logica-1152x605.png',
        file: './files/test.md',
        status: 200,
      },
      {
        text: 'test 2',
        url: 'https://pt.wikipedia.org/wiki/Teste_de_software',
        file: './files/test.md',
        status: 200,
      },
      {
        text: 'test 3',
        url: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%',
        file: './files/test.md',
        status: 400,
      },
      {
        text: 'test 4',
        url: 'https://pt.wikipedia.org/wiki/Teste_de_software',
        file: './files/test.md',
        status: 200,
      },
    ];
    const expectedResult = {
      countLinks: 4,
      uniqueLinks: 3,
      brokenLinks: 1,
    };
    const result = stats(arrayOfLinks);
    expect(expectedResult).toEqual(result);
  });
});

describe('checkStatusOfLinks', () => {
  it('should return an array of checked links', async () => {
    const MOCK_FETCH = 200;
    global.fetch = jest.fn(() => Promise.resolve({
      status: (MOCK_FETCH),
    }));
    const path = './files/test.md';
    const arrayOfLinks = [
      {
        text: 'test 1',
        url: 'https://becode.com.br/wp-content/uploads/2018/07/teste-logica-1152x605.png',
        file: './files/test.md',
        status: 200,
      },
      {
        text: 'test 2',
        url: 'https://pt.wikipedia.org/wiki/Teste_de_software',
        file: './files/test.md',
        status: 200,
      },
      {
        text: 'test 3',
        url: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%',
        file: './files/test.md',
        status: 200,
      },
      {
        text: 'test 4',
        url: 'https://pt.wikipedia.org/wiki/Teste_de_software',
        file: './files/test.md',
        status: 200,
      },
    ];
    checkStatusOfLinks(path)
      .then((result) => expect(result).toEqual(arrayOfLinks));
  });
});

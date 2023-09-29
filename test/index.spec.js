const { extractLinks, validate } = require('../src/md-links.js');

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
    const validLink = {
      url: 'https://www.youtube.com',
    };
    validate(validLink)
      .then((response) => {
        expect(response).toEqual(200);
      });
  });
  it('should return status 400 for a invalid link', () => {
    const brokenLink = {
      url: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%',
    };
    validate(brokenLink)
      .then((response) => {
        expect(response).toEqual(400);
      });
  });
  it('should catch an error', () => {
    const path = './files/empty-test.md';
    const errorMessage = 'ENOENT';
    extractLinks(path)
      .catch((error) => {
        expect(error.code).toEqual(errorMessage);
      });
  });
});

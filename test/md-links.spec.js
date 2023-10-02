const { mdLinks } = require('../src/md-links.js');

describe('md-links', () => {
  it('should read directory', () => {
    const path = './files';
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
    mdLinks(path)
      .then((response) => {
        expect(response).toEqual(arrayOfLinks);
      });
  });
  it('should read file', () => {
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
        status: 400,
      },
      {
        text: 'test 4',
        url: 'https://pt.wikipedia.org/wiki/Teste_de_software',
        file: './files/test.md',
        status: 200,
      },
    ];
    mdLinks(path)
      .then((response) => {
        expect(response).toEqual(arrayOfLinks);
      });
  });

  it('should throw error if directory doesn\'t have .md files', () => {
    const path = './files/empty';
    const errorMessage = 'directory doesn\'t have files .md';
    mdLinks(path)
      .catch((error) => expect(error.message).toEqual(errorMessage));
  });

  it('should throw error if file is not .md', () => {
    const path = './src/cli.js';
    const errorMessage = 'file is not .md';
    mdLinks(path)
      .catch((error) => expect(error.message).toEqual(errorMessage));
  });
});

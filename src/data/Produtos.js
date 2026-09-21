// Para imagem remota (internet): imagem: 'https://...'
// Para imagem local: coloque o arquivo em assets/produtos/ e use:
//   imagem: require('../../assets/produtos/xburger.jpg')
// Enquanto não tiver a imagem, deixe null — o card mostra um placeholder.

export const produtos = [
  {
    id: '1',
    nome: 'X-Burger',
    descricao: 'Pão, carne, queijo',
    preco: 24.90,
    imagem: require('../../assets/xburger.jpg'),
  },
  {
    id: '2',
    nome: 'X-Salada',
    descricao: 'Alface, tomate',
    preco: 27.90,
    imagem: require('../../assets/xsalada.jpg'),
  },
  {
    id: '3',
    nome: 'X-Bacon',
    descricao: 'Bacon crocante',
    preco: 29.90,
    imagem: require('../../assets/xbacon.jpg'),
  },
  {
    id: '4',
    nome: 'X-Tudo',
    descricao: 'Pão, carne, queijo, bacon, ovo',
    preco: 34.90,
    imagem: require('../../assets/xtudo.jpg'),
  },
  {
    id: '5',
    nome: 'X-Frango',
    descricao: 'Frango grelhado, alface',
    preco: 26.90,
    imagem: require('../../assets/xfrango.jpg'),
  },
];
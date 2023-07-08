Mock.mock('/api/cart', 'get', {
    code: 0,
    msg: '',
    'data|5-20': [
      {
        productName: '@csentence',
        productUrl: '@image(100x80, #008c8c, #fff, testimage)',
        'unitPrice|1-500.2': 1,
        'count|1-10': 1,
      },
    ],
  });
  
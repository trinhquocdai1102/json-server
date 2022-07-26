const faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });

  return categoryList;
};

const categoryListNum = 50;
const productListNum = 20;

const randomProductList = (categoryList, numberOfProduct) => {
  if (numberOfProduct <= 0) return [];

  const productList = [];

  for (const category of categoryList) {
    Array.from(new Array(numberOfProduct)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price()),
        color: faker.commerce.color(),
        amount: +Number(faker.finance.amount()).toFixed(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      productList.push(product);
    });
  }
  return productList;
};

const randomAuth = (n) => {
  if (n <= 0) return [];
  const authList = [];

  Array.from(new Array(n)).forEach(() => {
    const auth = {
      email: 'trinhquocdai1102@gmail.com',
      password: 'dai123',
      name: 'dai',
      gender: 'male',
    };
    authList.push(auth);
  });

  return authList;
};

const randomRegister = (n) => {
  if (n <= 0) return [];
  const registerList = [];

  Array.from(new Array(n)).forEach(() => {
    const register = {
      isLoggedIn: false,
      user: {
        name: '',
        expires_at: '',
        jwttoken: '',
        authorities: [],
      },
    };
    registerList.push(register);
  });

  return registerList;
};
(() => {
  const categoryList = randomCategoryList(categoryListNum);
  const productList = randomProductList(categoryList, productListNum);
  const authList = randomAuth(1);
  const registerList = randomRegister(1);

  const db = {
    categories: categoryList,
    products: productList,
    auth: authList,
    register: registerList,
    profile: {
      name: 'Dai',
    },
  };

  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('generate data successfully');
  });
})();

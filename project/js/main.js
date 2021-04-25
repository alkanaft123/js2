
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// // В ДЗ переделать на промисы не используя fetch
// var getRequest = (url, callBack) => {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         callBack(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// }
// - - - - - - - - - - - - - - - - - - - - - - - - - -

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this._goods = []; // data
    this._allProducts = []; // массив экземпляров товаров на основе this._goods

    this._getGoods()
        .then((data) => {
          this._goods = data;
          this._render();
        });
  }

  sum() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }

  _getGoods() {
    // return fetch(`${API}/catalogData.json`)
    //     .then(result => result.json()).catch(error => console.log(error));

    return new Promise((resolve, reject)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${API}/catalogData.json`, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status !== 200) {
            reject('Error');
          } else {
            resolve(JSON.parse(xhr.responseText));
          }
        }
      };
      xhr.send();  
    });
  }

  _render() {
    const block = document.querySelector(this.container);

    for (const product of this._goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }

    document.querySelectorAll('.buy-btn').forEach((el)=>{
      el.addEventListener('click',(event)=>{
        cart.addProduct(this._goods.find((item, index, array)=>{
          if (item.id_product = event.target.parentNode.parentNode.dataset.id) {
            return item;
          }
        }));
        cart._render(); 
      });  
    });
  }
}

class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class Cart{
  constructor(){
    this._amount = 0;
    this._countGoods = 0;
    this._contents = [];
    this._getGoods()
        .then((data) => {
          this._contents = data.contents;
          this._amount = data.amount;
          this._countGoods = data.countGoods;
          this._render();
        });
  }

  _getGoods() {

    return new Promise((resolve, reject)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `${API}/getBasket.json`, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status !== 200) {
            reject('Error');
          } else {
            resolve(JSON.parse(xhr.responseText));
          }
        }
      };
      xhr.send();  
    });
  }

  addProduct(product){
    this._countGoods+=1;
    this._amount+=product.price;
    for (let el of this._contents) {
      if (el.id_product==product.id_product) {
        el.quantity+=1;
        return;  
      }  
    }
    this._contents.push(product);
  }

  removeProduct(id){
    this._countGoods-=1;
    this._amount-=product.price;
    for (let i = 0; i < this._contents.length; i++) {
      
      if (this._contents[i].id_product==product.id_product) {
        if (this._contents[i].quantity == 1) {
          this.products.splice(i, 1);
        } else {
          this._contents[i].quantity-=1;
        }
      }  
    }
  }

  _render() {
    document.querySelector('.btn-cart').textContent = `Корзина (${this._countGoods})`;
    }
}


const catalog = new ProductList();
const cart = new Cart();
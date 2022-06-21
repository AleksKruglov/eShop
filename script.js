const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`;
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
  return fetch(url)
    .then((res) => res.json())
}

function init() {
  Vue.component('search-field', {
    template:
      `<input type="text" class="goods-search" @input="$emit('input', $event.target.value)"/>`
  })
  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      search: '',
      isVisibleCart: false
    },
    methods: {
      fetchGoods() {
        service(GET_GOODS_ITEMS).then((data) => {
          this.items = data;
          this.filteredItems = data;
        });
      },
      setVisibleCart() {
        this.isVisibleCart = !this.isVisibleCart
      }
    },
    computed: {
      calculatePrice() {
        return this.filteredItems.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      },
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.search, 'gui'))
        })
      }
    },
    mounted() {
      this.fetchGoods();
    }
  })
}
window.onload = init
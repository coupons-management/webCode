import homePage from '../homePage/homePage.vue';
import searchPage from '../searchPage/searchPage.vue';
import aboutUs from '../aboutUs/aboutUs.vue';
import categoryPage from '../categoryPage/categoryPage.vue';
import storePage from '../storePage/storePage.vue';
import detailFirst from '../couponsDetail/detailFirst.vue';
import detailSecond from '../couponsDetail/detailSecond.vue';

export default {
  components: { homePage, searchPage, aboutUs, categoryPage, storePage, detailFirst, detailSecond },
  name: 'layout',
  data() {
    return {
      activeIndex: '1',
      input2: '',
      greenText: 'Stores in VOUCHERPA', //About us --- Search result for "WOW" --- Categories in DISCOUNTMM --- Stores in VOUCHERPA
      greenTextState: false,
      wordsList: [
        'TOP',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9'
      ],
      showPage: {
        homePage: true,
        searchPage: false,
        aboutUs: false,
        categoryPage: false,
        storePage: false,
        detailFirst: false,
        detailSecond: false
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goToPage(type, value) {
      // let data = this.showPage;
      // for (let i in data) {
      //   data[i] = false;
      // }
      // this.showPage[type] = true;
      if (type === 'homePage') {
        this.$router.push(`/websiteFir`);
      } else if (type === 'searchPage') {
        this.$router.push(`/websiteFir/searchPage?search=${value}`);
      } else {
        this.$router.push(`/websiteFir/${type}`);
      }
    },
    search() {
      console.log(this.input2);
      this.goToPage('searchPage', this.input2);
    }
  }
};

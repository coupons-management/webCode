import { mapGetters } from 'vuex';
export default {
  name: 'siteStat',
  data() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    return {
      time: [start.getTime(), end.getTime()],
      spiderId: '',
      range: '1',
      radio4: '1',
      data: [],
      totalStat: {
        pageSize: 10,
        pageTotal: 3,
        page: 1,
        totalList: [
          { date: '2019-04-18', couponNum: '1', newStoreNum: '5', totalStoreNum: '6', storeNum: '2', rightCouponNum: '3', totalCouponNum: '4' },
          { date: '2019-04-18', couponNum: '1', newStoreNum: '5', totalStoreNum: '6', storeNum: '2', rightCouponNum: '3', totalCouponNum: '4' },
          { date: '2019-04-18', couponNum: '1', newStoreNum: '5', totalStoreNum: '6', storeNum: '2', rightCouponNum: '3', totalCouponNum: '4' },
          { date: '2019-04-18', couponNum: '1', newStoreNum: '5', totalStoreNum: '6', storeNum: '2', rightCouponNum: '3', totalCouponNum: '4' },
          { date: '2019-04-18', couponNum: '1', newStoreNum: '5', totalStoreNum: '6', storeNum: '2', rightCouponNum: '3', totalCouponNum: '4' }
        ]
      },
      storeStat: {
        pageSize: 10,
        pageTotal: 3,
        page: 1,
        storeList: [
          { date: '2019-04-18', num0: '1', num3: '2', num5: '3', numMore: '4' },
          { date: '2019-04-18', num0: '1', num3: '2', num5: '3', numMore: '4' },
          { date: '2019-04-18', num0: '1', num3: '2', num5: '3', numMore: '4' },
          { date: '2019-04-18', num0: '1', num3: '2', num5: '3', numMore: '4' }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$sendData(
        'post',
        'statistic/site',
        { siteId: this.siteId, beginTime: this.time[0] || '', endTime: this.time[1] || '', range: this.range },
        (data, all) => {
          this.data = data;
        }
      );
    },
    handleSelectChange() {
      this.$nextTick(() => {
        this.getData();
      });
    }
  },
  computed: {
    ...mapGetters(['spiderList', 'siteId'])
  }
};

import { mapGetters } from 'vuex';
export default {
  name: 'spiderStat',
  data() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    return {
      time: [start.getTime(), end.getTime()],
      spiderId: 0,
      range: '1',
      type: 1,
      data: [],
      loading: false,
      storeData: [],
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
    this.initData(['spiderSite']);
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      // console.log(this.time);
      if (this.type === 1) {
        this.$sendData('post', 'statistic/spider', { beginTime: this.time[0] || '', endTime: this.time[1] || '', range: this.range, spiderId: this.spiderId }, (data, all) => {
          this.data = data;
          this.loading = false;
        });
      } else {
        this.$sendData(
          'post',
          'statistic/storeStatistic',
          { beginTime: this.time[0] || '', endTime: this.time[1] || '', range: this.range, spiderId: this.spiderId },
          (data, all) => {
            this.storeData = data;
            this.loading = false;
          }
        );
      }
    },
    handleSelectChange() {
      this.$nextTick(() => {
        this.getData();
      });
    }
  },
  computed: {
    ...mapGetters(['spiderList'])
  }
};

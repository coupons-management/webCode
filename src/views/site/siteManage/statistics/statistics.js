import { mapGetters } from 'vuex';
export default {
  name: 'siteStatistics',
  data() {
    return {
      statDate: [{ value1: '9', value2: '18', value3: '7', value4: '6' }],
      data: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$sendData('post', 'statistic/siteStatistic', { siteId: this.siteId }, (data, all) => {
        this.data = [data];
      });
    }
  },

  computed: {
    ...mapGetters(['siteId'])
  }
};

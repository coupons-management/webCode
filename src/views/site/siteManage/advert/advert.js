import { mapGetters } from 'vuex';

export default {
  name: 'siteAdvert',
  data() {
    return {
      type: 'hotStore',
      modalName: '热门商家',
      advertData: [
        //广告推荐的数据
        {
          type: 'hotStore',
          name: '热门商家'
        },
        {
          type: 'introduceStore',
          name: '推荐商家'
        },
        {
          type: 'hotCoupon',
          name: '热门优惠券'
        },
        {
          type: 'intruduceCoupon',
          name: '推荐优惠券'
        }
      ],
      advertBox: false, //广告推荐排序的开关
      currAdvertData: {}, //选中的某个广告词条数据
      orderList: [], //广告推荐排序后的数组顺序
      advData: [],
      selectStoreBox: false,
      selectCouponBox: false,
      urlsTopList: {
        hotStore: 'storeAudit/getTopHotStroreList',
        introduceStore: 'storeAudit/getTopAdviseStroreList',
        hotCoupon: 'storeAudit/getTopHotCouponList',
        intruduceCoupon: 'storeAudit/getTopAdviseCouponList'
      },
      urlsList: {
        hotStore: 'showSiteTwo/getTwoList',
        introduceStore: 'showSiteTwo/getTwoList',
        hotCoupon: 'showSiteTwo/getCouponList',
        intruduceCoupon: 'showSiteTwo/getCouponList'
      },
      urlsPostList: {
        hotStore: 'storeAudit/updateHotSortBatch',
        introduceStore: 'storeAudit/updateAdviseSortBatch',
        hotCoupon: 'storeAudit/updateHotSortBatch',
        intruduceCoupon: 'storeAudit/updateAdviseSortBatch'
      },
      tableData: {
        pageNumber: 1,
        pageSize: 10
      },
      selectList: []
    };
  },
  mounted() {
    this.$dragging.$on('dragged', ({ value }) => {
      //排序拖拽后的数组重建
      this.orderList = value.list;
    });
  },
  methods: {
    inputBlur(data) {
      //table表中的直接编辑
      console.log(data);
    },
    editorAdvert(e) {
      //单个广告词条的编辑
      this.currAdvertData = e;
      this.type = e.type;
      this.modalName = e.name;
      this.getAdSingle();
    },
    getAdSingle() {
      let params = {};
      if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
        params.outSiteId = this.siteId;
      } else {
        params.outId = this.siteId;
      }
      this.$sendData('post', this.urlsTopList[this.type], params, (data, all) => {
        this.advData = data;
        this.advertBox = true;
      });
    },
    deleteAdvert() {
      //单个广告词条的删除
    },
    deleteAdvertBtn() {
      //单个广告词条中 商家的单个删除
    },
    tableChange(e) {
      this.tableData.pageNumber = e;
      this.addStore(true);
    },
    addStore(bool) {
      // let params = {};
      // if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
      //   params.outSiteId = this.siteId;
      // } else {
      //   params.outId = this.siteId;
      // }
      this.$sendData('post', this.urlsList[this.type], { outId: this.siteId, pageNumber: this.tableData.pageNumber, pageSize: this.tableData.pageSize }, (data, all) => {
        this.tableData = data;
        this.$nextTick(() => {
          this.toggleSelection(this.advData);
        });
        if (bool === true) return;
        if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
          this.selectCouponBox = true;
        } else {
          this.selectStoreBox = true;
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          let temp = this.tableData.list.filter(i => i.id === row.id);
          if (temp.lenngth > 0) {
            this.$refs.multipleTable.toggleRowSelection(temp);
          }
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(vals) {
      this.selectList = vals;
      // this.toggleSelection(this.selectList);
    },
    handleSelectCoupon() {
      this.$sendData(
        'post',
        this.urlsPostList[this.type],
        {
          outId: this.siteId,
          cpOutSiteStoreList: this.selectList.map((i, x) => ({
            id: i.id,
            hotsort: x + 1
          }))
        },
        (data, all) => {
          this.getAdSingle();
          this.$message({ type: 'success', message: '编辑成功！' });
          if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
            this.selectCouponBox = false;
          } else {
            this.selectStoreBox = false;
          }
        }
      );
    }
  },
  computed: {
    ...mapGetters(['siteId'])
  }
};

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
        hotCoupon: 'showSiteCoupon/getCouponPage',
        intruduceCoupon: 'showSiteCoupon/getCouponPage'
      },
      urlsPostList: {
        hotStore: 'storeAudit/updateHotSortBatch',
        introduceStore: 'storeAudit/updateAdviseSortBatch',
        hotCoupon: 'storeAudit/updateCouponHotSortBatch',
        intruduceCoupon: 'storeAudit/updateCouponAdviseSortBatch'
      },
      deleteUrl: {
        hotStore: 'storeAudit/deleteHotSort',
        introduceStore: 'storeAudit/deleteAdviseSort',
        hotCoupon: 'storeAudit/deleteCouponHotSort',
        intruduceCoupon: 'storeAudit/deleteCouponAdviseSort'
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
      console.log(value.list);
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
      this.orderList = [];
      if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
        params.outSiteId = this.siteId;
      } else {
        params.outId = this.siteId;
      }
      this.$sendData('post', this.urlsTopList[this.type], params, (data, all) => {
        this.advData = data;
        this.orderList = data;
        this.advertBox = true;
      });
    },
    deleteAdvert() {
      //单个广告词条的删除
    },
    deleteAdvertBtn(item) {
      //单个广告词条中 商家的单个删除
      // this.$sendData('post', this.deleteUrl[this.type], { id: item.id }, (data, all) => {
      //   this.getAdSingle();
      //   this.$message({ type: 'success', message: '删除成功！' });
      // });
      this.advData = this.advData.filter(i => i.id !== item.id);
    },
    tableChange(e) {
      this.tableData.pageNumber = e;
      this.addStore(true);
    },
    addStore(bool) {
      let params = { pageNumber: this.tableData.pageNumber, pageSize: this.tableData.pageSize };
      if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
        params.siteId = this.siteId;
      } else {
        params.outId = this.siteId;
      }

      this.$sendData('post', this.urlsList[this.type], params, (data, all) => {
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
          if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
            let temp = this.tableData.list.filter(i => i.mapId === row.id);
            if (temp.length > 0) {
              this.$refs.multipleTable.toggleRowSelection(temp[0], true);
            }
          } else {
            let temp = this.tableData.list.filter(i => i.id === row.id);
            if (temp.length > 0) {
              this.$refs.multipleTable.toggleRowSelection(temp[0], true);
            }
          }
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    submitOrder() {
      let _data = {
        hotStore: 'hotSort',
        introduceStore: 'adviseSort',
        hotCoupon: 'hotSort',
        intruduceCoupon: 'adviseSort'
      };
      let params = { outId: this.siteId };
      if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
        params.cpOutSiteCouponList = this.advData.map((i, x) => ({
          id: i.id,
          [_data[this.type]]: x + 1
        }));
      } else {
        params.cpOutSiteStoreList = this.advData.map((i, x) => ({
          id: i.id,
          [_data[this.type]]: x + 1
        }));
      }
      this.$sendData('post', this.urlsPostList[this.type], params, (data, all) => {
        this.$message({ type: 'success', message: '排序成功！' });
      });
    },
    selectAll(e){
      this.selectList = e;
    },
    handleSelectionChange(vals) {
      this.selectList = vals;
      // this.toggleSelection(this.selectList);
    },
    handleSelectCoupon() {
      let _data = {
        hotStore: 'hotSort',
        introduceStore: 'adviseSort',
        hotCoupon: 'hotSort',
        intruduceCoupon: 'adviseSort'
      };
      let params = { outId: this.siteId };
      console.log(this.selectList);
      if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
        params.cpOutSiteCouponList = this.selectList.map((i, x) => ({
          id: i.mapId,
          [_data[this.type]]: x + 1
        }));
      } else {
        params.cpOutSiteStoreList = this.selectList.map((i, x) => ({
          id: i.id,
          [_data[this.type]]: x + 1
        }));
      }

      this.$sendData('post', this.urlsPostList[this.type], params, (data, all) => {
        this.getAdSingle();
        this.$message({ type: 'success', message: '编辑成功！' });
        this.toggleSelection();

        if (this.type === 'hotCoupon' || this.type === 'intruduceCoupon') {
          this.selectCouponBox = false;
        } else {
          this.selectStoreBox = false;
        }
      });
    }
  },
  computed: {
    ...mapGetters(['siteId'])
  }
};

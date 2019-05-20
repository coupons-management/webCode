import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data(){
    return{
      isLogin:false
    }
  },
  mixins: [ResizeMixin],
  mounted(){
    if(!sessionStorage.axiosLocalUrl || sessionStorage.axiosLocalUrl == 'null'){
      this.$message({ type: "warning", message: "尚未登录！"});
      this.$router.push('/login');
    }else{
      this.isLogin = true;
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}

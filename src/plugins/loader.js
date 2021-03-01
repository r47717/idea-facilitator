import Vue from "vue";

function LoaderPlugin() {}

LoaderPlugin.install = function(Vue) {
  Vue.prototype.$api = async function(fn) {
    try {
      this.$emit("loaderOn");
      await fn();
    } catch (err) {
      console.log(err);
    } finally {
      this.$emit("loaderOff");
    }
  };
};

Vue.use(LoaderPlugin);

export default new LoaderPlugin({});

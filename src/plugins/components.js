import MyCard from "../components/common/MyCard.vue";
import MyPagination from "../components/common/MyPagination.vue";
import MyModal from "../components/common/MyModal.vue";
import MySideModal from "../components/common/MySideModal.vue";
import MyTable from "../components/common/MyTable.vue";
import MyTableFilter from "../components/common/MyTableFilter.vue";

const components = {
  MyCard,
  MyPagination,
  MyModal,
  MySideModal,
  MyTable,
  MyTableFilter
};

const registerComponents = (app) => {
  for (const component in components) {
    app.component(component, components[component]);
  }
}

export default registerComponents;

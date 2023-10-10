import MyCard from "../components/common/MyCard.vue";
import MyPagination from "../components/common/MyPagination.vue";

const components = {
  MyCard,
  MyPagination
};

const registerComponents = (app) => {
  for (const component in components) {
    app.component(component, components[component]);
  }
}

export default registerComponents;

import { List as ListComponent } from "./index";

export default {
  component: ListComponent,
};

export const List = () => (
  <ListComponent
    entity={{ id: "es", name: "Spain", type: 3 }}
    list={[]}
    stats={[]}
    toggleNavbar={() => {}}
    hoverEnd={() => {}}
    hoverStart={() => () => {}}
    onSelect={() => () => {}}
  ></ListComponent>
);

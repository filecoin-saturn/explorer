import { List as ListComponent } from "./index";

export default {
  component: ListComponent,
};

export const List = () => (
  <ListComponent
    entity={{ name: "Spain" }}
    list={[]}
    stats={[]}
    toggleNavbar={() => {}}
    hoverEnd={() => {}}
    hoverStart={() => () => {}}
    onSelect={() => () => {}}
  ></ListComponent>
);

import { SearchResult as SearchResultComponent, SearchResultProps } from "./SearchResult";
import {Meta, Story} from '@storybook/react'

export default {
  component: SearchResultComponent,
} as Meta;

const Template: Story<SearchResultProps> = (args) => <SearchResultComponent {...args} />

export const Icon = Template.bind({});
Icon.args = {
  result: {title: 'Portugal', parent: 'Europe'},
  onClick: () => {}
};

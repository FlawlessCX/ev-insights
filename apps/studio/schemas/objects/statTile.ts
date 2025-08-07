import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'statTile', type: 'object', title: 'Stat Tile',
  fields: [
    defineField({ name: 'label', type: 'string' }),
    defineField({ name: 'value', type: 'string' }),
  ]
});

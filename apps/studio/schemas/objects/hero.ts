import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'hero', type: 'object', title: 'Hero',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'subheading', type: 'text' }),
  ]
});

import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'tooltip', type: 'document', title: 'Tooltip/Explainer',
  fields: [
    defineField({ name: 'key', type: 'string', description: 'Unique frontend key, e.g. bev_share' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
  ]
});

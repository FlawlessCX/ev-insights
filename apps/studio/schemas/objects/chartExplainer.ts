import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'chartExplainer', type: 'object', title: 'Chart Explainer',
  fields: [
    defineField({ name: 'metricKey', type: 'string', description: 'e.g. bev_share' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
  ]
});

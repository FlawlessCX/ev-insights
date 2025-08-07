import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'page', type: 'document', title: 'Page',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r=>r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'visibility', type: 'string', options: { list: ['public','member'] }, initialValue: 'public' }),
    defineField({ name: 'blocks', type: 'array', of: [
      { type: 'hero' }, { type: 'statTile' }, { type: 'chartExplainer' }, { type: 'block' }
    ]})
  ]
});

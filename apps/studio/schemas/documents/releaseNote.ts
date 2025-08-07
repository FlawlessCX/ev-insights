import { defineType, defineField } from 'sanity';
export default defineType({
  name: 'releaseNote', type: 'document', title: 'Release Note',
  fields: [
    defineField({ name: 'version', type: 'string' }),
    defineField({ name: 'summary', type: 'text' }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
  ]
});

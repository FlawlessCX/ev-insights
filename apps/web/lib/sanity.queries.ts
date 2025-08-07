export const pageBySlug = `*[_type == "page" && slug.current == $slug][0]{ title, visibility, blocks }`;
export const tooltipByKey = `*[_type == "tooltip" && key == $key][0]{ title, body }`;
export const latestReleaseNote = `*[_type == "releaseNote"]|order(publishedAt desc)[0]{ version, summary, publishedAt }`;

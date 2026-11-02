import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { loadRenderers } from 'astro:container';
import { getContainerRenderer as mdxRenderer } from '@astrojs/mdx/container-renderer';
import { SITE } from '../lib/site';
import { getIssues, postUrl, excerpt } from '../lib/posts';

/** Makes root-relative src/href attributes absolute, as feed readers need. */
const absolutize = (html: string, site: URL) =>
  html.replace(/\s(src|href|srcset)="\/(?!\/)([^"]*)"/g, (_, attr: string, path: string) => {
    if (attr !== 'srcset') return ` ${attr}="${new URL(path, site)}"`;
    const set = `/${path}`.replace(/(^|,\s*)\/(?!\/)/g, `$1${site.origin}/`);
    return ` srcset="${set}"`;
  });

/** Strips scoped-style hooks and scripts that mean nothing outside the site. */
const clean = (html: string) =>
  html.replace(/\sdata-astro-cid-[\w-]+(="[^"]*")?/g, '').replace(/<script\b[\s\S]*?<\/script>/g, '');

// Same path as the Gatsby feed: /rss.xml
export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);
  const renderers = await loadRenderers([mdxRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const issues = (await getIssues()).filter((issue) => !issue.post.data.draft);

  const items = await Promise.all(
    issues.map(async ({ post }) => {
      const { Content } = await render(post);
      const html = await container.renderToString(Content);
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.deck ?? excerpt(post),
        link: postUrl(post),
        categories: post.data.section ? [post.data.section] : undefined,
        content: absolutize(clean(html), site),
      };
    }),
  );

  return rss({
    title: `${SITE.title}: ${SITE.author}'s personal blog`,
    description: SITE.description,
    site,
    items,
    customData: '<language>en</language>',
    trailingSlash: true,
  });
}

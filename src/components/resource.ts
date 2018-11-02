import linksTable from './links-table';
import { Link, SureOptions } from '../types';
import pager from './pager';
import embedded from './embedded';
import { Context } from '@curveball/core';
import halBody from './hal-body';
import markdownBody from './markdown-body';
import csvBody from './csv-body';

/**
 * This component renders an entire resource.
 */
export default async function resource(ctx: Context, body: any, links: Link[], options: SureOptions) {

  return `
${linksTable(links, options)}
${await parseBody(ctx, body)}
${await embedded(ctx, body, options)}
${pager(links, options)}
`;

}

async function parseBody(ctx: Context, body: any): Promise<string> {

  if (!body) {
    // Ignore empty bodies
    return '';
  }

  switch (ctx.response.type) {

    case 'application/json' :
    case 'application/problem+json' :
    case 'application/hal+json' :
      return halBody(ctx, body);

    case 'text/markdown' :
      return markdownBody(ctx, body);

    case 'text/csv' :
      return csvBody(ctx, body);

    default:
      return '';

  }

}
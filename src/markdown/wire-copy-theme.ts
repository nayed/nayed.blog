import type { ThemeRegistration } from 'shiki';

/**
 * "Wire copy": an ink-only Shiki theme. Weight and slant carry the syntax;
 * colour comes from CSS variables so code follows the active edition.
 *   keywords, selectors, tags  → bold
 *   strings, values            → italic
 *   comments, punctuation      → faded ink
 *   numbers, units             → red
 */
export const wireCopyTheme: ThemeRegistration = {
  name: 'wire-copy',
  type: 'light',
  colors: {
    'editor.background': 'transparent',
    'editor.foreground': 'var(--ink)',
  },
  tokenColors: [
    {
      settings: { foreground: 'var(--ink)' },
    },
    {
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'storage.modifier',
        'entity.name.tag',
        'entity.other.attribute-name.class',
        'entity.other.attribute-name.id',
        'entity.other.attribute-name.pseudo-class',
        'entity.other.attribute-name.pseudo-element',
        'meta.selector',
        'keyword.control.at-rule',
        'variable.language',
        'constant.language',
      ],
      settings: { fontStyle: 'bold' },
    },
    {
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'support.constant.property-value',
        'support.constant.font-name',
        'support.constant.color',
        'constant.other.color',
        'constant.character.escape',
        'markup.italic',
      ],
      settings: { fontStyle: 'italic' },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: 'var(--code-faded)', fontStyle: 'italic' },
    },
    {
      scope: [
        'punctuation',
        'meta.brace',
        'punctuation.definition.string',
        'punctuation.separator',
        'punctuation.terminator',
        'punctuation.section',
        'punctuation.definition.tag',
        'keyword.operator',
      ],
      settings: { foreground: 'var(--code-faded)', fontStyle: '' },
    },
    {
      scope: ['constant.numeric', 'keyword.other.unit', 'constant.other.color.rgb-value'],
      settings: { foreground: 'var(--code-accent)', fontStyle: '' },
    },
  ],
};

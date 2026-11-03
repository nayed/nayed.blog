export const EDITIONS = [
  { id: 'morning', name: 'Morning Edition', paper: '#F1EADB' },
  { id: 'evening', name: 'Evening Edition', paper: '#1A1815' },
  { id: 'late', name: 'Late Final', paper: '#EBC4AC' },
] as const;

export type EditionId = (typeof EDITIONS)[number]['id'];

export const nextEdition = (i: number) => EDITIONS[(i + 1) % EDITIONS.length]!;

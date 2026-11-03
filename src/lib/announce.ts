/**
 * Read a message aloud to screen readers through one shared live region.
 * The region is looked up on each call because page swaps replace <body>.
 */
export function announce(message: string) {
  let live = document.getElementById('announcer');
  if (!live) {
    live = document.createElement('p');
    live.id = 'announcer';
    live.className = 'visually-hidden';
    live.setAttribute('aria-live', 'polite');
    document.body.append(live);
  }
  live.textContent = message;
}

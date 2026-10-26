/* GoatCounter integration. The account endpoint is supplied by the script tag.
   No requests are made until a verified account endpoint is configured. */
(() => {
  'use strict';
  const endpoint = document.currentScript?.dataset.endpoint || '';
  if (location.hostname !== 'sohds.github.io' ||
      !['/daangn/', '/daangn/index.html'].includes(location.pathname)) return;

  const preference = new URLSearchParams(location.search).get('analytics');
  let excluded = preference === 'off';
  try {
    if (preference === 'off') localStorage.setItem('portfolio-analytics-excluded', '1');
    if (preference === 'on') localStorage.removeItem('portfolio-analytics-excluded');
    excluded ||= localStorage.getItem('portfolio-analytics-excluded') === '1';
  } catch { /* Explicit ?analytics=off still works if storage is unavailable. */ }
  if (excluded || navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;
  if (!/^https:\/\/[a-z0-9][a-z0-9-]*\.goatcounter\.com\/count$/.test(endpoint)) return;

  let referrer = '';
  try {
    const source = new URL(document.referrer);
    if (source.hostname !== location.hostname) referrer = source.origin;
  } catch { /* Direct visits have no referrer. */ }
  window.goatcounter = {
    no_onload: true, endpoint,
    path: '/daangn/', title: 'Daangn portfolio', referrer
  };
  const script = document.createElement('script');
  script.src = 'https://gc.zgo.at/count.js';
  script.async = true;
  script.referrerPolicy = 'strict-origin';
  script.onload = () => {
    const counter = window.goatcounter;
    if (typeof counter?.count !== 'function') return;
    counter.count({path: '/daangn/', title: 'Daangn portfolio', referrer});
    const sent = new Set();
    function track(name, title) {
      if (sent.has(name)) return;
      sent.add(name);
      counter.count({path: name, title, event: true, referrer: ''});
    }
    for (const id of ['wiki', 'pension', 'engineering']) {
      const details = document.querySelector(`#${id} details`);
      if (!details) continue;
      const opened = () => {
        if (details.open) track(`daangn-detail-${id}`, `Project details: ${id}`);
      };
      details.addEventListener('toggle', opened);
      opened();
    }
    document.querySelectorAll('a[href="../assets/chunk-review-public.png"]').forEach(link => {
      link.addEventListener('click', () => track('daangn-review-image', 'Review tool screenshot'));
    });
  };
  document.head.appendChild(script);
})();

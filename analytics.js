/* GoatCounter integration for the main portfolio and its variant pages.
   The /daangn/ page keeps its own daangn/analytics.js. */
(() => {
  'use strict';
  const endpoint = document.currentScript?.dataset.endpoint || '';
  if (location.hostname !== 'sohds.github.io') return;

  const PAGES = {
    '/': ['main', 'Main portfolio'],
    '/bmwfs/': ['bmwfs', 'BMW FS portfolio'],
    '/healingpaper/': ['healingpaper', 'Healingpaper portfolio'],
    '/demo/vllm-dashboard/': ['vllm-demo', 'vLLM dashboard demo']
  };
  const path = location.pathname.replace(/index\.html$/, '');
  const page = PAGES[path];
  if (!page) return;
  const [slug, title] = page;

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

  window.goatcounter = {no_onload: true, endpoint, path, title, referrer};
  const script = document.createElement('script');
  script.src = 'https://gc.zgo.at/count.js';
  script.async = true;
  script.referrerPolicy = 'strict-origin';
  script.onload = () => {
    const counter = window.goatcounter;
    if (typeof counter?.count !== 'function') return;
    counter.count({path, title, referrer});

    const sent = new Set();
    const track = (name, label) => {
      if (sent.has(name)) return;
      sent.add(name);
      counter.count({path: `${slug}-${name}`, title: label, event: true, referrer: ''});
    };

    document.querySelectorAll('details').forEach((details, i) => {
      const label = (details.querySelector('summary')?.textContent || '').replace(/[+\s]+$/, '').trim();
      details.addEventListener('toggle', () => {
        if (details.open) track(`detail-${i + 1}`, `Details opened: ${label}`);
      });
    });
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
      link.addEventListener('click', () => track('pdf', 'PDF download'));
    });
    document.querySelectorAll('a.demo-link').forEach(link => {
      link.addEventListener('click', () => track('demo', 'Dashboard demo opened'));
    });
  };
  document.head.appendChild(script);
})();

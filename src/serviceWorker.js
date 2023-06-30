/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Define the array of entries to be precached
const precacheEntries = [
  { url: '/index.html', revision: null },
  { url: '/static/css/main.css', revision: null },
  // Add more entries as needed
];

precacheAndRoute(precacheEntries);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') {
      return false;
    }
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  async ({ event }) => {
    const handler = new StaleWhileRevalidate();
    try {
      return await handler.handle({ event });
    } catch (error) {
      return caches.match(event.request);
    }
  }
);

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Remove the existing fetch event listener
self.removeEventListener('fetch', () => {});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async function () {
      try {
        return await fetch(event.request);
      } catch (error) {
        return caches.match(event.request);
      }
    })()
  );
});

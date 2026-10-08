// 집속사정 서비스 워커: 앱 설치(홈 화면 추가)와 오프라인 대비용.
// 화면(index.html)은 항상 네트워크 먼저 → 새 버전이 바로 반영되고, 인터넷이 끊겼을 때만 저장본을 보여준다.
// Firebase·카카오맵 등 외부 요청은 건드리지 않는다.
var CACHE = "jipsok-v1";
var SHELL = ["./", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).catch(function () {}));
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 외부(Firebase, 카카오 등)는 그대로 통과

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put("./", copy); });
        return res;
      }).catch(function () {
        return caches.match("./").then(function (r) { return r || new Response("<h3 style='font-family:sans-serif;padding:24px'>인터넷 연결을 확인해주세요.</h3>", { headers: { "Content-Type": "text/html; charset=utf-8" } }); });
      })
    );
    return;
  }
  if (url.pathname.indexOf("/icons/") > -1 || url.pathname.slice(-20) === "manifest.webmanifest") {
    e.respondWith(caches.match(req).then(function (r) { return r || fetch(req); }));
  }
});

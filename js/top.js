/* =========================================================
   SANTOIRE MAMIE ／ TOPページ専用スクリプト
   - オープニング演出の開始
   - スクロールに合わせたフェード表示
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- オープニング ---------- */
  var started = false;
  function start() {
    if (started) return;
    started = true;
    // 1フレーム待ってからクラスを付けると、確実にトランジションが走る
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { root.classList.add('is-loaded'); });
    });
  }
  var hero = document.querySelector('.hero__img');
  if (hero && !hero.complete) {
    hero.addEventListener('load', start, { once: true });
    hero.addEventListener('error', start, { once: true });
    setTimeout(start, 1600); // 画像が遅い場合も待たせすぎない
  } else {
    start();
  }

  /* ---------- スクロール表示 ---------- */
  var targets = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (t) { t.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  targets.forEach(function (t) { io.observe(t); });
})();

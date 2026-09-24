/* =========================================================
   SANTOIRE MAMIE ／ GALLERY ライトボックス
   - クリックで拡大 / 左右ボタン・矢印キー・スワイプで切替 / Esc で閉じる
   ========================================================= */
(function () {
  'use strict';

  var items = window.GALLERY || [];
  var lb = document.querySelector('.lightbox');
  if (!lb || !items.length) return;

  var root = document.documentElement;
  var img = lb.querySelector('.lightbox__img');
  var count = lb.querySelector('.lightbox__count');
  var cat = lb.querySelector('.lightbox__cat');
  var ja = lb.querySelector('.lightbox__ja');
  var btnClose = lb.querySelector('.lightbox__close');
  var btnPrev = lb.querySelector('.lightbox__prev');
  var btnNext = lb.querySelector('.lightbox__next');
  var current = 0;
  var opener = null;

  if (items.length < 2) { btnPrev.hidden = true; btnNext.hidden = true; }

  function pad(n) { return String(n).padStart(2, '0'); }

  function show(i, animate) {
    current = (i + items.length) % items.length;
    var g = items[current];
    var apply = function () {
      img.src = g.file;
      img.alt = g.caption || g.category || '';
      count.textContent = pad(current + 1) + ' / ' + pad(items.length);
      cat.textContent = g.category || '';
      ja.textContent = g.caption || '';
      img.classList.remove('is-changing');
    };
    if (animate) {
      img.classList.add('is-changing');
      setTimeout(apply, 250);
    } else {
      apply();
    }
    // 前後の写真を先読み
    [current - 1, current + 1].forEach(function (k) {
      var p = new Image();
      p.src = items[(k + items.length) % items.length].file;
    });
  }

  function open(i, trigger) {
    opener = trigger || null;
    show(i, false);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    root.classList.add('is-locked');
    btnClose.focus();
  }
  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    root.classList.remove('is-locked');
    if (opener) opener.focus();
  }

  document.querySelectorAll('.gallery__btn').forEach(function (b) {
    b.addEventListener('click', function () {
      open(parseInt(b.getAttribute('data-index'), 10) || 0, b);
    });
  });
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(current - 1, true); });
  btnNext.addEventListener('click', function () { show(current + 1, true); });

  // 背景クリックで閉じる
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lightbox__figure')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1, true);
    else if (e.key === 'ArrowRight') show(current + 1, true);
    else if (e.key === 'Tab') { // フォーカスをライトボックス内に留める
      var f = [btnClose, btnPrev, btnNext].filter(function (b) { return !b.hidden; });
      var idx = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(idx + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  // スワイプ（スマートフォン）
  var sx = 0, sy = 0;
  lb.addEventListener('touchstart', function (e) {
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - sx;
    var dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && items.length > 1) {
      show(current + (dx < 0 ? 1 : -1), true);
    }
  }, { passive: true });
})();

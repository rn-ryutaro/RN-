/* =========================================================
   SANTOIRE MAMIE ／ 共通スクリプト（全ページ）
   - ヘッダー / スマホメニュー
   - config.js の店舗情報・料金・ギャラリーを各ページへ反映
   ========================================================= */
(function () {
  'use strict';

  var SITE = window.SITE || {};
  var root = document.documentElement;

  function has(key) {
    return SITE[key] != null && String(SITE[key]).trim() !== '';
  }
  function mapUrl() {
    if (has('mapUrl')) return SITE.mapUrl;
    return 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent((SITE.address || '') + ' ' + (SITE.name || ''));
  }
  function mapEmbedUrl() {
    return 'https://maps.google.com/maps?q=' +
      encodeURIComponent(SITE.address || '') + '&z=17&output=embed';
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- 店舗情報の反映 ---------- */
  function bindSite() {
    // 値が一つも無ければ要素ごと削除（例: data-site-if="tel|line"）
    document.querySelectorAll('[data-site-if]').forEach(function (n) {
      var keys = n.getAttribute('data-site-if').split('|');
      if (!keys.some(has)) n.remove();
    });
    // 値が一つでもあれば削除（未設定時だけ出す案内用）
    document.querySelectorAll('[data-site-ifnot]').forEach(function (n) {
      var keys = n.getAttribute('data-site-ifnot').split('|');
      if (keys.some(has)) n.remove();
    });
    document.querySelectorAll('[data-site]').forEach(function (n) {
      var key = n.getAttribute('data-site');
      if (has(key)) n.textContent = SITE[key];
    });
    document.querySelectorAll('[data-site-href]').forEach(function (n) {
      var key = n.getAttribute('data-site-href');
      if (key === 'map') {
        n.href = mapUrl();
      } else if (key === 'tel' && has('tel')) {
        n.href = 'tel:' + String(SITE.tel).replace(/[^\d+]/g, '');
      } else if (key === 'line' && has('line')) {
        n.href = SITE.line;
      }
    });
    document.querySelectorAll('[data-site-embed="map"]').forEach(function (n) {
      n.src = mapEmbedUrl();
    });
    document.querySelectorAll('[data-year]').forEach(function (n) {
      n.textContent = new Date().getFullYear();
    });
  }

  /* ---------- CONTACT：電話番号・LINEボタン ---------- */
  function initContact() {
    var tel = document.querySelector('[data-contact-tel]');
    if (tel && has('contactTel')) {
      var num = String(SITE.contactTel).trim();
      tel.href = 'tel:' + num;
      var txt = tel.querySelector('[data-contact-tel-text]');
      if (txt) txt.textContent = num;
    }
    var line = document.querySelector('[data-contact-line]');
    if (!line) return;
    var url = has('line') ? String(SITE.line).trim() : '';
    if (/^https?:\/\//.test(url)) {           // URLが設定されている場合のみ有効化
      line.href = url;
      line.target = '_blank';
      line.rel = 'noopener';
      line.removeAttribute('aria-disabled');
      line.removeAttribute('role');
      line.classList.remove('is-disabled');
      var note = document.querySelector('[data-contact-line-note]');
      if (note) note.remove();
    }
  }

  /* ---------- MENU の描画 ---------- */
  function renderMenu() {
    var box = document.querySelector('[data-menu]');
    if (!box) return;
    (window.MENU || []).forEach(function (cat) {
      var sec = el('section', 'menu-cat');
      var head = el('div', 'menu-cat__head');
      head.appendChild(el('h2', 'menu-cat__en', cat.en));
      head.appendChild(el('span', 'menu-cat__ja', cat.ja));
      head.appendChild(el('span', 'menu-cat__rule'));
      sec.appendChild(head);

      var items = cat.items || [];
      if (!items.length) {
        sec.appendChild(el('p', 'menu-empty', '準備中'));
      } else {
        var ul = el('ul', 'menu-list');
        items.forEach(function (it) {
          var li = el('li', 'menu-item');
          var name = el('span', 'menu-item__name', it.name);
          if (it.note) name.appendChild(el('span', 'menu-item__note', it.note));
          li.appendChild(name);
          li.appendChild(el('span', 'menu-item__dots'));
          li.appendChild(el('span', 'menu-item__price', it.price || ''));
          ul.appendChild(li);
        });
        sec.appendChild(ul);
      }
      box.appendChild(sec);
    });

    var notes = window.MENU_NOTES || [];
    var noteBox = document.querySelector('[data-menu-notes]');
    if (noteBox) {
      if (!notes.length) { noteBox.remove(); }
      else notes.forEach(function (t) { noteBox.appendChild(el('li', '', t)); });
    }
  }

  /* ---------- GALLERY の描画（GALLERYページ） ---------- */
  function renderGallery() {
    var box = document.querySelector('[data-gallery]');
    if (!box) return;
    (window.GALLERY || []).forEach(function (g, i) {
      var li = el('li', 'gallery__item');
      var btn = el('button', 'gallery__btn');
      btn.type = 'button';
      btn.setAttribute('data-index', i);
      btn.setAttribute('aria-label', '写真を拡大表示：' + (g.caption || g.category || ''));
      var fig = el('div', 'media');
      var img = el('img');
      img.src = g.file;
      img.alt = g.caption || g.category || '';
      img.loading = i < 2 ? 'eager' : 'lazy';
      img.decoding = 'async';
      fig.appendChild(img);
      btn.appendChild(fig);
      var cap = el('p', 'gallery__cap');
      cap.appendChild(el('span', 'gallery__num', String(i + 1).padStart(2, '0')));
      if (g.category) cap.appendChild(el('span', 'gallery__cat', g.category));
      if (g.caption) cap.appendChild(el('span', 'gallery__ja', g.caption));
      li.appendChild(btn);
      li.appendChild(cap);
      box.appendChild(li);
    });
  }

  /* ---------- ヘッダー ---------- */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var onScroll = function () {
      root.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- スマホメニュー ---------- */
  function initDrawer() {
    var toggle = document.querySelector('.menu-toggle');
    var drawer = document.getElementById('drawer');
    if (!toggle || !drawer) return;

    function set(open) {
      root.classList.toggle('is-menu-open', open);
      root.classList.toggle('is-locked', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    toggle.addEventListener('click', function () {
      set(!root.classList.contains('is-menu-open'));
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { set(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('is-menu-open')) { set(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && root.classList.contains('is-menu-open')) set(false);
    });
  }

  /* ---------- 画像が見つからない場合 ---------- */
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG') t.classList.add('is-missing');
  }, true);

  bindSite();
  initContact();
  renderMenu();
  renderGallery();
  initHeader();
  initDrawer();
})();

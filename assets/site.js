// Progressive enhancement only: every piece of content is in the HTML without this script.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Live countdown: days from the reader's today to each key date; the next upcoming one is highlighted.
  var DAY = 864e5;
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var next = null;
  document.querySelectorAll('.dates li[data-date]').forEach(function (li) {
    var d = new Date(li.getAttribute('data-date') + 'T00:00:00');
    var n = Math.round((d - today) / DAY);
    var out = li.querySelector('.left');
    if (n > 0) { out.textContent = '還有 ' + n + ' 天'; if (!next) next = { li: li, n: n }; }
    else if (n === 0) { out.textContent = '今天'; if (!next) next = { li: li, n: 0 }; }
    else { out.textContent = '已過 ' + (-n) + ' 天'; li.classList.add('is-past'); }
  });
  var lead = document.getElementById('next-date');
  if (next && lead) {
    next.li.classList.add('is-next');
    var what = next.li.querySelector('.what').textContent.trim();
    lead.innerHTML = '從你今天算起，下一個關鍵日是<b>' + what + '</b>，還有 <strong>' + next.n + '</strong> 天。';
  }

  // Expand / collapse all fourteen dimensions.
  document.querySelectorAll('[data-toggle-all]').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('data-toggle-all') === 'open';
      document.querySelectorAll('.item').forEach(function (d) { d.open = open; });
    });
  });

  // Entrances: heading, then text, then picture, staggered per section.
  var els = document.querySelectorAll('.rise, h1, .scen');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('section, header, footer').forEach(function (sec) {
    sec.querySelectorAll('.rise').forEach(function (e, i) { e.style.setProperty('--d', Math.min(i, 6) * 75 + 'ms'); });
  });
  document.querySelectorAll('.scen .bar3 span').forEach(function (s, i) { s.style.setProperty('--d', (i % 3) * 120 + Math.floor(i / 3) * 40 + 'ms'); });
  els.forEach(function (e) { io.observe(e); });
})();

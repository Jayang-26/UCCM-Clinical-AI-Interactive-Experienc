(() => {
    const cfg = window.UCCM_CONFIG,
      home = document.getElementById('home-screen'),
      opts = document.getElementById('options-screen'),
      player = document.getElementById('player-screen');
    const list = document.getElementById('option-list'),
      video = document.getElementById('demo-video'),
      frame = document.getElementById('video-frame'),
      error = document.getElementById('video-error');
  
    let activeId = null,
      activeExperience = null,
      activeOption = null,
      level = 'root',
      lastView = null;
  
    const show = (el) => {
      [home, opts, player].forEach((s) => s.classList.add('hidden'));
      el.classList.remove('hidden');
      // The kiosk is viewport-locked; avoid scroll jumps during navigation.
      document.documentElement.style.setProperty('--uccm-vh', `${window.visualViewport?.height || window.innerHeight}px`);
    };
  
    function render(items, viewLevel, title, eyebrow, description) {
      level = viewLevel;
      lastView = { items, viewLevel, title, eyebrow, description };
      const logo = document.getElementById('options-logo');
      logo.src = activeExperience.logo;
      logo.alt = activeExperience.title + ' logo';
      document.getElementById('options-title').textContent = title;
      document.getElementById('options-eyebrow').textContent = eyebrow;
      document.getElementById('options-description').textContent = description || '';
      list.replaceChildren();
  
      items.forEach((item) => {
        const b = document.createElement('button');
        b.className = 'option-card ' + (item.cases ? 'model-card' : 'case-card');
        const art = document.createElement('span');
        art.className = 'option-art';
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.label + ' image';
        art.append(img);
  
        const titleEl = document.createElement('strong');
        titleEl.textContent = item.label;
        const sub = document.createElement('small');
        sub.textContent = item.cases ? 'OPEN MODEL' : 'TAP TO PLAY';
        b.append(art, titleEl, sub);
  
        b.addEventListener('click', () => {
          if (item.cases) {
            render(
              item.cases,
              'cases',
              item.label + ': SELECT A CASE',
              'SELECT A CASE',
              'Tap a case image once — its video starts immediately.'
            );
          } else {
            play(item);
          }
        });
        list.append(b);
      });
  
      show(opts);
    }
  
    function openExperience(id) {
      activeId = id;
      activeExperience = cfg.experiences[id];
      if (id === 'kpop') {
        play(activeExperience.options[0]);
        return;
      }
      if (id === 'infection') {
        render(
          activeExperience.options,
          'root',
          activeExperience.title,
          'SELECT A MODEL',
          activeExperience.description
        );
      } else {
        render(
          activeExperience.options,
          'root',
          activeExperience.title,
          'SELECT A CASE',
          activeExperience.description
        );
      }
    }
  
    function play(item) {
      activeOption = item;
      document.getElementById('player-title').textContent =
        activeExperience.title + ' · ' + item.label;
      document.getElementById('player-code').textContent = item.code || '';
      error.classList.add('hidden');
  
      video.pause();
      video.muted = true;
      video.playsInline = true;
      video.removeAttribute('src');
      video.load();
      video.src = './videos/' + item.video;
  
      show(player);
      // Launch directly into full screen without changing device orientation
      enterFull();
  
      const p = video.play();
      if (p && p.catch) {
        p.catch(() => error.classList.remove('hidden'));
      }
    }
  
    function homeAgain() {
      exitFull();
      video.pause();
      video.removeAttribute('src');
      video.load();
      activeId = null;
      activeExperience = null;
      activeOption = null;
      lastView = null;
      show(home);
    }
  
    function backOptions() {
      if (activeId === 'infection' && level === 'cases') {
        render(
          activeExperience.options,
          'root',
          activeExperience.title,
          'SELECT A MODEL',
          activeExperience.description
        );
      } else {
        homeAgain();
      }
    }
  
    function backPlayer() {
      exitFull();
      video.pause();
      if (activeId === 'kpop') {
        homeAgain();
        return;
      }
      if (lastView) {
        render(
          lastView.items,
          lastView.viewLevel,
          lastView.title,
          lastView.eyebrow,
          lastView.description
        );
      } else {
        homeAgain();
      }
    }
  
    async function enterFull() {
      // Pseudo-fullscreen is immediate and remains available if the browser blocks
      // the Fullscreen API (common in embedded previews and some Android browsers).
      frame.classList.add('pseudo-fullscreen');
      syncFull();
      try {
        if (!document.fullscreenElement && frame.requestFullscreen) {
          await frame.requestFullscreen({ navigationUI: 'hide' });
        } else if (!document.webkitFullscreenElement && frame.webkitRequestFullscreen) {
          frame.webkitRequestFullscreen();
        }
      } catch (e) {
        // Keep the CSS fullscreen fallback active.
      }
      syncFull();
    }

    async function exitFull() {
      // Exit the browser's native fullscreen first, then remove the CSS fallback.
      // This avoids briefly restoring the player while the browser still owns fullscreen.
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      } catch (e) {
        // Continue with the CSS fallback cleanup even if native exit is rejected.
      }
      frame.classList.remove('pseudo-fullscreen');
      frame.style.removeProperty('position');
      frame.style.removeProperty('inset');
      frame.style.removeProperty('width');
      frame.style.removeProperty('height');
      // Force layout after fullscreen exit so the player reclaims the full flex area.
      void frame.offsetHeight;
      syncFull();
    }
  
    function syncFull() {
      const f =
        !!document.fullscreenElement ||
        !!document.webkitFullscreenElement ||
        frame.classList.contains('pseudo-fullscreen');
      document.getElementById('fullscreen-button').textContent = f
        ? '↙ Minimize'
        : '⛶ Full screen';
      document.getElementById('minimize-button').classList.toggle('visible', f);
    }
  
    async function toggleFull() {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        frame.classList.contains('pseudo-fullscreen')
      ) {
        await exitFull();
      } else {
        await enterFull();
      }
    }
  
    document.querySelectorAll('[data-experience]').forEach((b) =>
      b.addEventListener('click', () => openExperience(b.dataset.experience))
    );
    document.getElementById('options-back').addEventListener('click', backOptions);
    document.getElementById('player-back').addEventListener('click', backPlayer);
    document.getElementById('fullscreen-button').addEventListener('click', toggleFull);
    document.getElementById('minimize-button').addEventListener('click', toggleFull);
    document.addEventListener('fullscreenchange', syncFull);
    document.addEventListener('webkitfullscreenchange', syncFull);
    const updateViewport = () => document.documentElement.style.setProperty('--uccm-vh', `${window.visualViewport?.height || window.innerHeight}px`);
    window.addEventListener('resize', updateViewport, { passive: true });
    window.visualViewport?.addEventListener('resize', updateViewport, { passive: true });
    updateViewport();
    video.addEventListener('ended', homeAgain);
    video.addEventListener('error', () => {
      if (activeOption) error.classList.remove('hidden');
    });
  
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    }
  })();
  
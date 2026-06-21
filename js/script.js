(() => {
	const header = document.getElementById('siteHeader');
	const navToggle = document.getElementById('navToggle');
	const navLinks = document.getElementById('navLinks');
	const yearEl = document.getElementById('year');

	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// header background on scroll
	const onScroll = () => {
		if (window.scrollY > 40) header.classList.add('is-scrolled');
		else header.classList.remove('is-scrolled');
	};
	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });

	// mobile nav toggle
	if (navToggle && navLinks) {
		navToggle.addEventListener('click', () => {
			const isOpen = navLinks.classList.toggle('is-open');
			navToggle.classList.toggle('is-open', isOpen);
			navToggle.setAttribute('aria-expanded', String(isOpen));
			document.body.style.overflow = isOpen ? 'hidden' : '';
		});

		navLinks.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => {
				navLinks.classList.remove('is-open');
				navToggle.classList.remove('is-open');
				navToggle.setAttribute('aria-expanded', 'false');
				document.body.style.overflow = '';
			});
		});
	}

	// scroll reveal
	const revealEls = document.querySelectorAll('[data-reveal]');
	if ('IntersectionObserver' in window && revealEls.length) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
		);

		revealEls.forEach((el) => io.observe(el));
	} else {
		revealEls.forEach((el) => el.classList.add('is-visible'));
	}

	// ---------- antes & depois: comparador interativo ----------
	const compare = document.getElementById('compareAntesDepois');
	if (compare) {
		const frame = compare.querySelector('.compare-frame');
		const beforeWrap = compare.querySelector('.compare-before-wrap');
		const handle = compare.querySelector('.compare-handle');

		const setPosition = (pct) => {
			const clamped = Math.min(100, Math.max(0, pct));
			beforeWrap.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
			handle.style.left = `${clamped}%`;
		};

		const updateFromClientX = (clientX) => {
			const rect = frame.getBoundingClientRect();
			const pct = ((clientX - rect.left) / rect.width) * 100;
			setPosition(pct);
		};

		let dragging = false;

		frame.addEventListener('pointerdown', (e) => {
			dragging = true;
			compare.classList.add('is-active');
			frame.setPointerCapture(e.pointerId);
			updateFromClientX(e.clientX);
		});
		frame.addEventListener('pointermove', (e) => {
			if (dragging) updateFromClientX(e.clientX);
		});
		frame.addEventListener('pointerup', () => {
			dragging = false;
		});
		frame.addEventListener('pointercancel', () => {
			dragging = false;
		});

		handle.addEventListener('keydown', (e) => {
			const current = parseFloat(handle.style.left) || 50;
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				compare.classList.add('is-active');
				setPosition(current - 5);
			}
			if (e.key === 'ArrowRight') {
				e.preventDefault();
				compare.classList.add('is-active');
				setPosition(current + 5);
			}
		});

		setPosition(50);
	}

	// ---------- galeria: lightbox ----------
	const lightbox = document.getElementById('lightbox');
	const lightboxImg = document.getElementById('lightboxImg');
	const lightboxCaption = document.getElementById('lightboxCaption');
	const lightboxClose = document.getElementById('lightboxClose');
	const galleryTiles = Array.from(
		document.querySelectorAll('.gallery-tile[data-img]'),
	);

	if (lightbox && lightboxImg && galleryTiles.length) {
		let lastFocused = null;

		const openLightbox = (tile) => {
			lastFocused = document.activeElement;
			lightboxImg.src = tile.dataset.img;
			lightboxImg.alt = tile.dataset.caption || '';
			lightboxCaption.textContent = tile.dataset.caption || '';
			lightbox.classList.add('is-open');
			lightbox.setAttribute('aria-hidden', 'false');
			document.body.style.overflow = 'hidden';
			lightboxClose.focus();
		};
		const closeLightbox = () => {
			lightbox.classList.remove('is-open');
			lightbox.setAttribute('aria-hidden', 'true');
			document.body.style.overflow = '';
			if (lastFocused) lastFocused.focus();
		};

		galleryTiles.forEach((tile) =>
			tile.addEventListener('click', () => openLightbox(tile)),
		);
		lightboxClose.addEventListener('click', closeLightbox);
		lightbox.addEventListener('click', (e) => {
			if (e.target === lightbox) closeLightbox();
		});
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && lightbox.classList.contains('is-open'))
				closeLightbox();
		});
	}
})();

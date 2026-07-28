/* Manjusha Maddela — Portfolio interactions */

(function () {
    'use strict';
  
    // --- Sticky header backdrop on scroll ---
    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  
    // --- IntersectionObserver: reveal on scroll ---
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .t-row');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('in-view'));
    }
  
    // --- Bento spotlight: cursor-follow radial glow ---
    document.querySelectorAll('.bento-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      });
    });
  
    // --- Subtle parallax tilt on project rows ---
    document.querySelectorAll('.project').forEach((row) => {
      row.addEventListener('pointermove', (e) => {
        const r = row.getBoundingClientRect();
        const py = (e.clientY - r.top) / r.height - 0.5;
        row.style.transform = `translateX(4px) rotateX(${(-py * 1.2).toFixed(2)}deg)`;
        row.style.transformOrigin = 'center';
      });
      row.addEventListener('pointerleave', () => { row.style.transform = ''; });
    });
  
    // --- Smooth-scroll for hash links (respects reduced motion) ---
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  
    // --- Year in footer ---
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // --- Offcanvas Profile ---
    const profileBtn = document.getElementById('profileBtn');
    const offcanvas = document.getElementById('offcanvas');
    const offcanvasClose = document.getElementById('offcanvasClose');
    const offcanvasBackdrop = document.getElementById('offcanvasBackdrop');

    function openOffcanvas() {
        if(offcanvas) offcanvas.classList.add('open');
        if(offcanvasBackdrop) offcanvasBackdrop.classList.add('open');
    }

    function closeOffcanvas() {
        if(offcanvas) offcanvas.classList.remove('open');
        if(offcanvasBackdrop) offcanvasBackdrop.classList.remove('open');
    }

    if (profileBtn) profileBtn.addEventListener('click', openOffcanvas);
    if (offcanvasClose) offcanvasClose.addEventListener('click', closeOffcanvas);
    if (offcanvasBackdrop) offcanvasBackdrop.addEventListener('click', closeOffcanvas);

    // --- Resume Modal ---
    const openResumeBtn = document.getElementById('openResumeModal');
    const resumeModal = document.getElementById('resumeModal');
    const resumeModalClose = document.getElementById('resumeModalClose');
    const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');

    function openResume() {
        if(resumeModal) resumeModal.classList.add('open');
        if(resumeModalBackdrop) resumeModalBackdrop.classList.add('open');
    }

    function closeResume() {
        if(resumeModal) resumeModal.classList.remove('open');
        if(resumeModalBackdrop) resumeModalBackdrop.classList.remove('open');
    }

    if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
    if (resumeModalClose) resumeModalClose.addEventListener('click', closeResume);
    if (resumeModalBackdrop) resumeModalBackdrop.addEventListener('click', closeResume);

    // --- Dynamic Resume Upload ---
    const uploadBtn = document.getElementById('uploadResumeBtn');
    const uploadInput = document.getElementById('resumeUploadInput');
    const resumeEmbed = document.getElementById('resumeEmbed');
    const downloadBtn = document.getElementById('downloadResumeBtn');

    if (uploadBtn && uploadInput) {
        uploadBtn.addEventListener('click', () => {
            uploadInput.click();
        });

        uploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Create a temporary local URL for the uploaded PDF
                const fileURL = URL.createObjectURL(file);
                
                // Update the viewer and download link
                if (resumeEmbed) resumeEmbed.src = fileURL;
                if (downloadBtn) downloadBtn.href = fileURL;
                if (downloadBtn) downloadBtn.download = file.name;

                // Hide the upload button after uploading
                uploadBtn.style.display = 'none';
            }
        });
    }

  })();
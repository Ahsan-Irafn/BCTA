'use client';

import React, { useEffect } from 'react';

export default function StandaloneBctaPage() {
  useEffect(() => {
    // 1. Staggered card reveal & Liquid Pointer & 3D tilt
    (function () {
      const section = document.getElementById("bctaDark");
      if (!section || section.dataset.ready === "true") return;
      section.dataset.ready = "true";

      const cards = section.querySelectorAll(".bcta-card");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      cards.forEach(function (card, index) {
        setTimeout(function () {
          card.classList.add("is-visible");
        }, reduceMotion ? 0 : 520 + index * 130);
      });

      if (reduceMotion) return;

      let targetX = window.innerWidth * 0.75;
      let targetY = window.innerHeight * 0.2;
      let currentX = targetX;
      let currentY = targetY;

      const handlePointerMove = function (event: MouseEvent) {
        const sectionBox = section.getBoundingClientRect();
        targetX = event.clientX - sectionBox.left;
        targetY = event.clientY - sectionBox.top;
      };

      section.addEventListener("pointermove", handlePointerMove as EventListener);

      let animId: number;
      function animateLiquidPointer() {
        currentX += (targetX - currentX) * 0.075;
        currentY += (targetY - currentY) * 0.075;

        section?.style.setProperty("--pointer-x", currentX + "px");
        section?.style.setProperty("--pointer-y", currentY + "px");

        animId = requestAnimationFrame(animateLiquidPointer);
      }
      animateLiquidPointer();

      cards.forEach(function (cardEl) {
        const card = cardEl as HTMLElement;
        card.addEventListener("pointermove", function (event: MouseEvent) {
          if (window.innerWidth <= 900) return;

          const box = card.getBoundingClientRect();
          const x = event.clientX - box.left;
          const y = event.clientY - box.top;

          const percentageX = x / box.width;
          const percentageY = y / box.height;

          card.style.setProperty("--light-x", x + "px");
          card.style.setProperty("--light-y", y + "px");
          card.style.setProperty("--rotate-y", (percentageX - 0.5) * 5 + "deg");
          card.style.setProperty("--rotate-x", (0.5 - percentageY) * 5 + "deg");
        });

        card.addEventListener("pointerleave", function () {
          card.style.setProperty("--rotate-x", "0deg");
          card.style.setProperty("--rotate-y", "0deg");
          card.style.setProperty("--light-x", "50%");
          card.style.setProperty("--light-y", "50%");
        });
      });
    })();

    // 2. Blueprint Network Canvas
    (() => {
      const section = document.getElementById('bctaDark');
      const canvas = section && (section.querySelector('.bcta-blueprint-canvas') as HTMLCanvasElement);
      if (!canvas || canvas.dataset.ready) return;
      canvas.dataset.ready = '1';
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let width = 0, height = 0, dpr = 1, nodes: any[] = [], active = true;
      const pointer = { x: -9999, y: -9999 };

      function reset() {
        if (!section || !canvas || !ctx) return;
        const rect = section.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const total = width < 700 ? 18 : 34;
        nodes = Array.from({ length: total }, (_, i) => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - .5) * .16,
          vy: (Math.random() - .5) * .16,
          r: i % 9 === 0 ? 1.7 : 1
        }));
      }

      section.addEventListener('pointermove', (event: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
      });
      section.addEventListener('pointerleave', () => {
        pointer.x = pointer.y = -9999;
      });

      function frame() {
        if (active && !document.hidden && ctx) {
          ctx.clearRect(0, 0, width, height);
          for (const n of nodes) {
            const dx = n.x - pointer.x, dy = n.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 145 && distance > 1) {
              n.x += (dx / distance) * .18;
              n.y += (dy / distance) * .18;
            }
            n.x += n.vx; n.y += n.vy;
            if (n.x < -10) n.x = width + 10;
            if (n.x > width + 10) n.x = -10;
            if (n.y < -10) n.y = height + 10;
            if (n.y > height + 10) n.y = -10;
          }

          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const a = nodes[i], b = nodes[j];
              const distance = Math.hypot(a.x - b.x, a.y - b.y);
              if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = 'rgba(127,166,201,' + ((1 - distance / 150) * .18) + ')';
                ctx.lineWidth = .7;
                ctx.stroke();
              }
            }
          }

          nodes.forEach((n, i) => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = i % 9 === 0 ? 'rgba(212,180,111,.58)' : 'rgba(166,196,222,.36)';
            ctx.fill();
          });
        }
        requestAnimationFrame(frame);
      }

      new ResizeObserver(reset).observe(section);
      new IntersectionObserver(entries => {
        active = entries[0].isIntersecting;
      }, { threshold: .02 }).observe(section);
      reset();
      frame();
    })();

    // 3. Viewport Fit
    (() => {
      const section = document.getElementById('bctaDark');
      if (!section || section.dataset.bctaViewportFit === 'true') return;
      section.dataset.bctaViewportFit = 'true';

      let scheduled = false;

      function fitBctaToViewport() {
        if (!section) return;
        const viewportHeight = window.visualViewport
          ? window.visualViewport.height
          : window.innerHeight;
        const documentTop = section.getBoundingClientRect().top + window.scrollY;
        const topSpace = Math.min(260, Math.max(0, documentTop));
        const availableHeight = Math.max(1, viewportHeight - topSpace);

        section.style.setProperty('--bcta-screen-height', availableHeight + 'px');
        section.classList.toggle('bcta-short', availableHeight < 640);
        section.classList.toggle('bcta-very-short', availableHeight < 430);
        scheduled = false;
      }

      function scheduleViewportFit() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(fitBctaToViewport);
      }

      fitBctaToViewport();
      window.addEventListener('load', fitBctaToViewport, { once: true });
      window.addEventListener('resize', scheduleViewportFit, { passive: true });
      window.addEventListener('orientationchange', scheduleViewportFit, { passive: true });

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', scheduleViewportFit, { passive: true });
      }

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(scheduleViewportFit);
      }
    })();
  }, []);

  return (
    <>
      <section className="bcta-dark" id="bctaDark">
        {/* Liquid filter */}
        <svg className="bcta-filter" aria-hidden="true">
          <defs>
            <filter id="bctaLiquidFilter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 25 -12"
                result="liquid"
              />
              <feBlend in="SourceGraphic" in2="liquid" />
            </filter>
          </defs>
        </svg>

        {/* Liquid background */}
        <div className="bcta-liquid-field" aria-hidden="true">
          <span className="liquid liquid-1"></span>
          <span className="liquid liquid-2"></span>
          <span className="liquid liquid-3"></span>
          <span className="liquid liquid-4"></span>
          <span className="liquid liquid-pointer"></span>
        </div>

        <div className="bcta-grid" aria-hidden="true"></div>
        <canvas className="bcta-blueprint-canvas" aria-hidden="true"></canvas>
        <div className="bcta-light-scan" aria-hidden="true"></div>
        <div className="bcta-vignette" aria-hidden="true"></div>

        {/* Short cinematic reveal shown once when the page loads */}
        <div className="bcta-cinematic" aria-hidden="true">
          <div className="bcta-curtain bcta-curtain-left"></div>
          <div className="bcta-curtain bcta-curtain-right"></div>
          <div className="bcta-cinematic-mark">
            <img src="https://bcta.edu.au/wp-content/uploads/2026/08/BCTA-PNG-LOGO.png" alt="" />
          </div>
        </div>

        <div className="bcta-wrapper">
          {/* Heading */}
          <header className="bcta-heading">
            <h1>
              <span className="heading-mask">
                <span>Building and construction courses</span>
              </span>

              <span className="heading-mask heading-accent">
                <span style={{ fontSize: '33px' }}>delivered across three states</span>
              </span>
            </h1>

            <p>
              Select your location to explore available courses and training opportunities.
            </p>
          </header>

          {/* Locations */}
          <div className="bcta-cards">
            <a className="bcta-card" href="https://www.bcta.vic.edu.au/home/" target="_self">
              <span className="bcta-card-light"></span>

              <div className="bcta-card-header">
                <img
                  className="bcta-state-image"
                  src="https://bcta.edu.au/wp-content/uploads/2026/09/2.png"
                  alt="Victoria"
                />
              </div>

              <div className="bcta-card-content">
                <span className="bcta-count">5 courses</span>
                <h2>Victoria</h2>

                <div className="bcta-view">
                  <span>View courses</span>
                  <i>↗</i>
                </div>
              </div>

              <div className="bcta-watermark">V</div>
            </a>

            <a className="bcta-card" href="/south-australia">
              <span className="bcta-card-light"></span>

              <div className="bcta-card-header">
                <img
                  className="bcta-state-image"
                  src="https://bcta.edu.au/wp-content/uploads/2026/09/1.png"
                  alt="South Australia"
                />
              </div>

              <div className="bcta-card-content">
                <span className="bcta-count">5 courses</span>
                <h2>South Australia</h2>

                <div className="bcta-view">
                  <span>View courses</span>
                  <i>↗</i>
                </div>
              </div>

              <div className="bcta-watermark">S</div>
            </a>

            <a className="bcta-card" href="/western-australia">
              <span className="bcta-card-light"></span>

              <div className="bcta-card-header">
                <img
                  className="bcta-state-image"
                  src="https://bcta.edu.au/wp-content/uploads/2026/09/3.png"
                  alt="Western Australia"
                />
              </div>

              <div className="bcta-card-content">
                <span className="bcta-count">5 courses</span>
                <h2>Western Australia</h2>

                <div className="bcta-view">
                  <span>View courses</span>
                  <i>↗</i>
                </div>
              </div>

              <div className="bcta-watermark">W</div>
            </a>
          </div>

          {/* Guidance */}
          <footer className="bcta-guidance">
            <strong>Not sure which state applies to you?</strong>
            <span></span>
            <p>
              If you&apos;re studying online, choose the state you currently reside in — funding eligibility depends on your location.
            </p>
          </footer>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700;800&display=swap');
        
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: #07111f !important;
          overflow: hidden !important;
          width: 100% !important;
          height: 100% !important;
        }

        #bctaDark {
          --navy: #163058;
          --dark: #07111f;
          --dark-soft: #0b192b;
          --card: rgba(15, 34, 57, 0.68);
          --white: #f4f6f8;
          --muted: #95a2b3;
          --gold: #FFB605;

          position: relative;
          isolation: isolate;
          width: 100vw;
          height: 100vh;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: clamp(20px, 3vh, 42px) clamp(18px, 5vw, 76px);

          background:
            radial-gradient(circle at 50% -20%, #163058 0%, transparent 55%),
            linear-gradient(145deg, #07111f 0%, #0a1626 50%, #07101c 100%);

          color: var(--white);
          font-family: "Red Hat Display", Arial, sans-serif;
        }

        #bctaDark *,
        #bctaDark *::before,
        #bctaDark *::after {
          box-sizing: border-box;
        }

        .bcta-filter {
          position: absolute;
          width: 0;
          height: 0;
        }

        .bcta-liquid-field {
          position: absolute;
          z-index: -4;
          inset: -15%;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.55;
          filter: url("#bctaLiquidFilter");
        }

        .liquid {
          position: absolute;
          display: block;
          border-radius: 50%;
          will-change: transform;
        }
        #bctaDark .bcta-heading h1 > .heading-accent > span {
          letter-spacing: 2.1px !important;
        }

        .liquid-1 {
          top: 3%;
          right: 4%;
          width: 460px;
          height: 460px;
          background:
            radial-gradient(
              circle at 35% 30%,
              rgba(72, 117, 165, 0.8),
              rgba(22, 48, 88, 0.55) 52%,
              rgba(22, 48, 88, 0.08) 72%
            );
          animation: liquidOne 15s ease-in-out infinite alternate;
        }

        .liquid-2 {
          top: 25%;
          right: 27%;
          width: 330px;
          height: 330px;
          background: rgba(32, 72, 112, 0.42);
          animation: liquidTwo 18s ease-in-out infinite alternate;
        }

        .liquid-3 {
          bottom: -7%;
          left: -2%;
          width: 500px;
          height: 500px;
          background:
            radial-gradient(
              circle at 55% 40%,
              rgba(28, 70, 109, 0.52),
              rgba(11, 25, 43, 0.15) 72%
            );
          animation: liquidThree 20s ease-in-out infinite alternate;
        }

        .liquid-4 {
          bottom: 7%;
          left: 26%;
          width: 270px;
          height: 270px;
          background: rgba(205, 180, 119, 0.09);
          animation: liquidFour 14s ease-in-out infinite alternate;
        }

        .liquid-pointer {
          top: 0;
          left: 0;
          width: 280px;
          height: 280px;
          background: radial-gradient(
            circle,
            rgba(66, 111, 157, 0.36),
            rgba(22, 48, 88, 0.06) 67%,
            transparent 72%
          );
          transform: translate3d(
            calc(var(--pointer-x, 75vw) - 140px),
            calc(var(--pointer-y, 20vh) - 140px),
            0
          );
        }

        .bcta-grid {
          position: absolute;
          z-index: -3;
          inset: 0;
          pointer-events: none;
          opacity: 0.17;
          background-image:
            linear-gradient(rgba(160, 182, 207, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(160, 182, 207, 0.1) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: linear-gradient(to bottom, black, transparent 95%);
        }

        .bcta-vignette {
          position: absolute;
          z-index: -2;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              rgba(5, 12, 22, 0.35),
              transparent 30%,
              transparent 70%,
              rgba(5, 12, 22, 0.25)
            );
        }

        .bcta-wrapper {
          width: min(1280px, 100%);
          margin: auto;
        }

        .bcta-heading {
          max-width: 1050px;
          margin: 0 auto clamp(20px, 2.5vh, 32px);
          text-align: center;
          position: relative;
        }

        .bcta-heading::after {
          content: "";
          position: absolute;
          left: 18%;
          right: 18%;
          bottom: -16px;
          height: 1px;
          opacity: 0;
          background: linear-gradient(90deg, transparent, rgba(212, 180, 111, 0.7), transparent);
          transform: scaleX(0.15);
          animation: bctaHeadingLine 1.2s 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .bcta-heading h1 {
          margin: 0;
          color: var(--white);
          font-size: clamp(30px, 3.3vw, 48px);
          font-weight: 500;
          line-height: 1.06;
          letter-spacing: -0.045em;
          text-transform: uppercase;
        }

        .heading-mask {
          display: block;
          overflow: hidden;
          padding: 2px 0;
          position: relative;
        }

        .heading-mask::after {
          content: "";
          position: absolute;
          z-index: 3;
          inset: 0;
          background: linear-gradient(100deg, transparent 15%, rgba(255, 255, 255, 0.25) 48%, transparent 70%);
          transform: translateX(-130%);
          animation: bctaTextGlint 1.15s 2.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          pointer-events: none;
        }

        .heading-mask > span {
          display: block;
          opacity: 0;
          transform: translateY(110%);
          animation: titleReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .heading-accent {
          color: #bac6d4;
        }

        .heading-accent > span {
          animation-delay: 0.13s;
        }

        .bcta-heading > p {
          max-width: 570px;
          margin: 14px auto 0;
          color: var(--muted);
          font-size: clamp(12px, 1vw, 15px);
          font-weight: 400;
          line-height: 1.65;
          opacity: 0;
          animation: fadeUp 0.8s 0.55s forwards;
        }

        .bcta-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(13px, 1.5vw, 21px);
          perspective: 1400px;
        }

        .bcta-card {
          --rotate-x: 0deg;
          --rotate-y: 0deg;
          --lift: 0px;
          --light-x: 50%;
          --light-y: 50%;

          position: relative;
          min-height: clamp(170px, 20vh, 215px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          padding: clamp(16px, 1.5vw, 21px);

          border: 1px solid rgba(190, 208, 229, 0.13);
          border-radius: 18px;
          background: var(--card);

          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.19),
            inset 0 1px rgba(255, 255, 255, 0.04);

          color: var(--white) !important;
          text-decoration: none !important;
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);

          opacity: 0;
          transform:
            translateY(calc(45px + var(--lift)))
            rotateX(var(--rotate-x))
            rotateY(var(--rotate-y));

          will-change: transform;
          transform-style: preserve-3d;

          transition:
            transform 0.16s ease-out,
            border-color 0.4s ease,
            background 0.4s ease,
            box-shadow 0.4s ease;
        }

        #bctaDark .bcta-count {
          font-size: 10px !important;
          font-weight: 700 !important;
        }

        #bctaDark .bcta-heading h1 > .heading-mask:first-child > span {
          letter-spacing: 2.1px !important;
        }

        .bcta-card.is-visible {
          opacity: 1;
          transform:
            translateY(var(--lift))
            rotateX(var(--rotate-x))
            rotateY(var(--rotate-y));

          animation: bctaCardBreath 7s calc(2.4s + var(--card-index, 0s)) ease-in-out infinite;

          transition:
            opacity 0.7s ease,
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.4s ease,
            background 0.4s ease,
            box-shadow 0.4s ease;
        }

        .bcta-card:nth-child(1) { --card-index: 0s; }
        .bcta-card:nth-child(2) { --card-index: 0.7s; transition-delay: 0.1s; }
        .bcta-card:nth-child(3) { --card-index: 1.4s; transition-delay: 0.2s; }

        .bcta-card-light {
          position: absolute;
          z-index: 0;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            320px circle at var(--light-x) var(--light-y),
            rgba(101, 147, 193, 0.18),
            transparent 63%
          );
        }

        .bcta-card:hover {
          --lift: -7px;
          border-color: rgba(205, 180, 119, 0.42);
          background: rgba(17, 39, 65, 0.8);
          box-shadow:
            0 32px 80px rgba(0, 0, 0, 0.27),
            inset 0 1px rgba(255, 255, 255, 0.06);
        }

        .bcta-card:hover .bcta-card-light {
          opacity: 1;
        }

        .bcta-card::before {
          content: "";
          position: absolute;
          z-index: 0;
          right: -90px;
          bottom: -160px;
          width: 290px;
          height: 290px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(52, 87, 127, 0.2),
            transparent 70%
          );
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bcta-card:hover::before {
          transform: scale(1.35) translate(-10px, -12px);
        }

        .bcta-card-header,
        .bcta-card-content {
          position: relative;
          z-index: 2;
          transform: translateZ(18px);
        }

        .bcta-card-header {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        #bctaDark .bcta-state-image {
          display: block;
          width: 190px;
          height: 100px;
          object-fit: contain;
          object-position: center;
          flex-shrink: 0;
          background: transparent;
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.22));
          transform: translateZ(24px);
          transform-origin: center;
          transition:
            transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.55s ease;
        }

        #bctaDark .bcta-card:hover .bcta-state-image {
          transform: translateZ(28px) translateY(-3px) scale(1.08);
          filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.30)) brightness(1.06);
        }

        .bcta-count {
          color: #8f9daf;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .bcta-card h2 {
          max-width: 280px;
          margin: 6px 0 clamp(13px, 1.7vh, 20px);
          color: var(--white);
          font-size: clamp(24px, 2.1vw, 32px);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: -0.035em;
        }

        .bcta-view {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #bdc7d3;
          font-size: 14px;
          font-weight: 650;
        }

        .bcta-view i {
          width: 29px;
          height: 29px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(190, 208, 229, 0.14);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.025);
          color: var(--white);
          font-size: 13px;
          font-style: normal;
          transition: 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bcta-card:hover .bcta-view i {
          border-color: var(--gold);
          background: var(--gold);
          color: var(--dark);
          transform: translateX(6px) rotate(45deg);
        }

        .bcta-watermark {
          position: absolute;
          z-index: 0;
          right: -5px;
          bottom: -45px;
          color: rgba(255, 255, 255, 0.022);
          font-size: 180px;
          font-weight: 600;
          line-height: 1;
          transform: translateZ(4px);
          transition:
            color 0.5s ease,
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bcta-card:hover .bcta-watermark {
          color: rgba(255, 255, 255, 0.045);
          transform: translate(-10px, -7px);
        }

        .bcta-guidance {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-top: clamp(15px, 2vh, 22px);
          opacity: 0;
          animation: fadeUp 0.8s 1.05s forwards;
        }

        .bcta-guidance strong {
          flex: 0 0 auto;
          color: #dbe2ea;
          font-size: clamp(11px, 1vw, 14px);
          font-weight: 500;
        }

        .bcta-guidance > span {
          width: 1px;
          height: 25px;
          background: rgba(205, 180, 119, 0.55);
        }

        .bcta-guidance p {
          margin: 0;
          color: #8694a6;
          font-size: clamp(9px, 0.85vw, 12px);
          font-weight: 400;
          line-height: 1.5;
        }

        /* Animations */
        @keyframes titleReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes liquidOne {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            border-radius: 47% 53% 62% 38%;
          }
          50% {
            transform: translate3d(-95px, 70px, 0) scale(1.14);
            border-radius: 60% 40% 37% 63%;
          }
          100% {
            transform: translate3d(-25px, 140px, 0) scale(0.92);
            border-radius: 40% 60% 58% 42%;
          }
        }

        @keyframes liquidTwo {
          0% { transform: translate3d(0, 0, 0) scale(0.92); }
          50% { transform: translate3d(120px, -60px, 0) scale(1.2); }
          100% { transform: translate3d(-80px, 90px, 0) scale(1); }
        }

        @keyframes liquidThree {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            border-radius: 58% 42% 46% 54%;
          }
          50% {
            transform: translate3d(150px, -80px, 0) scale(1.08);
            border-radius: 38% 62% 57% 43%;
          }
          100% {
            transform: translate3d(260px, -20px, 0) scale(0.88);
            border-radius: 61% 39% 35% 65%;
          }
        }

        @keyframes liquidFour {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-90px, -100px, 0) scale(1.25); }
          100% { transform: translate3d(120px, -60px, 0) scale(0.9); }
        }

        .bcta-blueprint-canvas {
          position: absolute;
          z-index: -2;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.32;
          mix-blend-mode: screen;
        }

        .bcta-light-scan {
          position: absolute;
          z-index: -1;
          top: -25%;
          left: -35%;
          width: 22%;
          height: 150%;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(90deg, transparent, rgba(170, 207, 238, 0.09), rgba(255, 255, 255, 0.2), rgba(212, 180, 111, 0.08), transparent);
          filter: blur(18px);
          transform: skewX(-14deg);
          animation: bctaScan 8s 2.1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .bcta-cinematic {
          position: absolute;
          z-index: 80;
          inset: 0;
          display: grid;
          place-items: center;
          overflow: hidden;
          pointer-events: none;
          animation: bctaCinemaHide 0.01s 2.25s forwards;
        }

        .bcta-curtain {
          position: absolute;
          top: 0;
          width: 51%;
          height: 100%;
          background: #050d18;
          will-change: transform;
        }

        .bcta-curtain-left {
          left: 0;
          transform-origin: left;
          animation: bctaCurtainLeft 1.05s 1.15s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        .bcta-curtain-right {
          right: 0;
          transform-origin: right;
          animation: bctaCurtainRight 1.05s 1.15s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        .bcta-cinematic-mark {
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          opacity: 0;
          animation: bctaMarkIn 0.65s 0.18s ease forwards, bctaMarkOut 0.4s 0.9s ease forwards;
        }

        .bcta-cinematic-mark img {
          display: block;
          width: clamp(135px, 13vw, 190px);
          height: auto;
          object-fit: contain;
          background: transparent;
          filter: brightness(0) invert(1) drop-shadow(0 14px 28px rgba(0, 0, 0, 0.3));
        }

        @keyframes bctaCurtainLeft { to { transform: translateX(-102%); } }
        @keyframes bctaCurtainRight { to { transform: translateX(102%); } }
        @keyframes bctaCinemaHide { to { visibility: hidden; } }
        @keyframes bctaMarkIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes bctaMarkOut { to { opacity: 0; transform: scale(1.04); filter: blur(5px); } }
        @keyframes bctaScan { 0%, 12% { left: -35%; opacity: 0; } 18% { opacity: 0.75; } 40%, 100% { left: 125%; opacity: 0; } }
        @keyframes bctaHeadingLine { to { opacity: 1; transform: scaleX(1); } }
        @keyframes bctaTextGlint { to { transform: translateX(130%); } }
        @keyframes bctaCardBreath { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.035); } }

        /* Responsive Viewport Fit */
        #bctaDark {
          box-sizing: border-box;
          height: var(--bcta-screen-height, 100vh);
          min-height: 100vh;
          max-height: 100vh;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          #bctaDark {
            padding: clamp(12px, 2.4vh, 26px) clamp(12px, 3vw, 24px);
          }
          #bctaDark .bcta-heading {
            margin-bottom: clamp(12px, 2vh, 20px);
          }
          #bctaDark .bcta-cards {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: clamp(8px, 1.5vw, 14px);
          }
          #bctaDark .bcta-card {
            min-height: clamp(125px, 20vh, 170px);
            padding: clamp(12px, 1.8vw, 17px);
          }
          #bctaDark .bcta-guidance {
            flex-direction: row;
            gap: 10px;
            text-align: left;
          }
          #bctaDark .bcta-guidance > span {
            width: 1px;
            height: 22px;
          }
        }

        @media (max-width: 550px) {
          #bctaDark {
            padding: clamp(8px, 1.7vh, 14px) 12px;
          }
          #bctaDark .bcta-wrapper {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          #bctaDark .bcta-heading {
            margin-bottom: clamp(7px, 1.4vh, 12px);
          }
          #bctaDark .bcta-heading h1 {
            font-size: clamp(20px, 6.4vw, 28px);
            line-height: 1;
          }
          #bctaDark .bcta-heading > p {
            margin-top: 6px;
            font-size: 10px;
            line-height: 1.25;
          }
          #bctaDark .bcta-cards {
            grid-template-columns: 1fr;
            gap: clamp(5px, 1vh, 8px);
          }
          #bctaDark .bcta-card {
            min-height: 0;
            height: clamp(64px, 12vh, 84px);
            display: grid;
            grid-template-columns: 44px minmax(0, 1fr);
            align-items: center;
            gap: 10px;
            padding: 8px 12px;
            border-radius: 13px;
          }
          #bctaDark .bcta-card-header {
            justify-content: flex-start;
          }
          #bctaDark .bcta-state-image {
            width: 50px;
            height: 50px;
          }
          #bctaDark .bcta-card h2 {
            margin: 2px 0 4px;
            font-size: clamp(16px, 5vw, 20px);
            line-height: 1;
          }
          #bctaDark .bcta-view {
            gap: 6px;
            font-size: 10px;
          }
          #bctaDark .bcta-view i {
            width: 21px;
            height: 21px;
            font-size: 10px;
          }
          #bctaDark .bcta-watermark {
            right: 2px;
            bottom: -17px;
            font-size: 76px;
          }
          #bctaDark .bcta-guidance {
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 2px;
            margin-top: clamp(5px, 1vh, 8px);
            text-align: center;
          }
          #bctaDark .bcta-guidance strong {
            font-size: 9px;
          }
          #bctaDark .bcta-guidance > span {
            display: none;
          }
          #bctaDark .bcta-guidance p {
            max-width: 355px;
            font-size: 8px;
            line-height: 1.25;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #bctaDark *,
          #bctaDark *::before,
          #bctaDark *::after {
            animation: none !important;
            transition: none !important;
          }
          .heading-mask > span,
          .bcta-heading > p,
          .bcta-guidance,
          .bcta-card {
            opacity: 1 !important;
            transform: none !important;
          }
          .bcta-cinematic {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

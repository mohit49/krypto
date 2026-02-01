import './style.css'

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Solution accordion – one open at a time, toggle icon
  const accordion = document.querySelector('.solution-accordion');
  if (accordion) {
    const headers = accordion.querySelectorAll('.accordion-header');
    const panels = accordion.querySelectorAll('.accordion-panel');
    const icons = accordion.querySelectorAll('.accordion-icon');

    headers.forEach((header, index) => {
      header.addEventListener('click', () => {
        const panel = panels[index];
        const icon = icons[index];
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          header.setAttribute('aria-expanded', 'false');
          panel.classList.add('accordion-panel-closed');
          if (icon) icon.textContent = '+';
        } else {
          headers.forEach((h, i) => {
            h.setAttribute('aria-expanded', i === index ? 'true' : 'false');
            panels[i].classList.toggle('accordion-panel-closed', i !== index);
            if (icons[i]) icons[i].textContent = i === index ? '−' : '+';
          });
        }
      });
    });
  }

  // Solutions side panel tabs: switch content on click
  document.querySelectorAll('.solutions-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      if (!tabId) return;
      document.querySelectorAll('.solutions-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.solutions-panel').forEach((panel) => {
        panel.classList.add('hidden');
        panel.classList.remove('active');
      });
      const panel = document.getElementById('panel-' + tabId);
      if (panel) {
        panel.classList.remove('hidden');
        panel.classList.add('active');
      }
    });
  });

  // Section 2: Scroll-based active tile detection - simple and reliable
  const solutionTiles = document.querySelectorAll('.solution-tile');
  if (solutionTiles.length > 0) {
    let currentActiveTile = null;
    
    function updateActiveTile() {
      // Use top 40% of viewport as activation zone (280px stick point)
      const activationPoint = window.innerHeight * 0.4;
      let newActiveTile = null;
      
      // Find which tile is at the activation point (closest to sticky position)
      solutionTiles.forEach(tile => {
        const rect = tile.getBoundingClientRect();
        // Check if tile is visible and near the activation point
        if (rect.top <= activationPoint + 50 && rect.bottom > activationPoint) {
          newActiveTile = tile;
        }
      });
      
      // Only update if active tile changed (prevents flicker)
      if (newActiveTile && newActiveTile !== currentActiveTile) {
        currentActiveTile = newActiveTile;
        solutionTiles.forEach(tile => {
          if (tile === currentActiveTile) {
            tile.classList.add('active');
          } else {
            tile.classList.remove('active');
          }
        });
      }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTileUpdate() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveTile();
          ticking = false;
        });
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTileUpdate, { passive: true });
    window.addEventListener('resize', updateActiveTile, { passive: true });
    updateActiveTile(); // Initial call
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // One Point Perspective Grid with Mouse Parallax
  const canvas = document.getElementById('perspective-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let mouseX = 0;
    let mouseY = 0;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawPerspectiveGrid();
    }

    function drawPerspectiveGrid() {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Cube settings - Full screen size with extra for parallax
      const cubeColor = '#262626';
      const cubeSize = Math.max(width, height) * 1.3; // Zoomed in for parallax coverage
      
      // Mouse parallax effect (normalized to -1 to 1) - horizontal and vertical
      const parallaxX = mouseX * 100; // Horizontal movement
      const parallaxY = mouseY * 60; // Vertical movement
      
      const centerX = width / 2 + parallaxX;
      const centerY = height / 2 + parallaxY;
      
      // 3D perspective depth - going straight back into screen
      const perspectiveScale = 0.15; // Back face is 15% of front face (extreme depth)
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = cubeColor;

      // Front face corners (large, facing viewer)
      const frontLeft = centerX - cubeSize / 2;
      const frontRight = centerX + cubeSize / 2;
      const frontTop = centerY - cubeSize / 2;
      const frontBottom = centerY + cubeSize / 2;

      // Back face corners (smaller, centered, receding into depth)
      const backSize = cubeSize * perspectiveScale;
      const backLeft = centerX - backSize / 2;
      const backRight = centerX + backSize / 2;
      const backTop = centerY - backSize / 2;
      const backBottom = centerY + backSize / 2;

      // Draw back face with grid
      ctx.strokeStyle = '#d1d0d0';
      ctx.fillStyle = 'rgba(209, 208, 208, 0.05)';
      ctx.lineWidth = 2;
      
      // Back face outline and fill
      ctx.beginPath();
      ctx.moveTo(backLeft, backTop);
      ctx.lineTo(backRight, backTop);
      ctx.lineTo(backRight, backBottom);
      ctx.lineTo(backLeft, backBottom);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw connecting edges (depth lines)
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#d1d0d0';
      
      ctx.beginPath();
      ctx.moveTo(frontLeft, frontTop);
      ctx.lineTo(backLeft, backTop);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(frontRight, frontTop);
      ctx.lineTo(backRight, backTop);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(frontLeft, frontBottom);
      ctx.lineTo(backLeft, backBottom);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(frontRight, frontBottom);
      ctx.lineTo(backRight, backBottom);
      ctx.stroke();

      // Draw top face
      ctx.fillStyle = 'rgba(209, 208, 208, 0.03)';
      ctx.strokeStyle = '#d1d0d0';
      ctx.beginPath();
      ctx.moveTo(frontLeft, frontTop);
      ctx.lineTo(frontRight, frontTop);
      ctx.lineTo(backRight, backTop);
      ctx.lineTo(backLeft, backTop);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw right face
      ctx.fillStyle = 'rgba(209, 208, 208, 0.03)';
      ctx.strokeStyle = '#d1d0d0';
      ctx.beginPath();
      ctx.moveTo(frontRight, frontTop);
      ctx.lineTo(frontRight, frontBottom);
      ctx.lineTo(backRight, backBottom);
      ctx.lineTo(backRight, backTop);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw left face
      ctx.fillStyle = 'rgba(209, 208, 208, 0.03)';
      ctx.strokeStyle = '#d1d0d0';
      ctx.beginPath();
      ctx.moveTo(frontLeft, frontTop);
      ctx.lineTo(frontLeft, frontBottom);
      ctx.lineTo(backLeft, backBottom);
      ctx.lineTo(backLeft, backTop);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw bottom face
      ctx.fillStyle = 'rgba(209, 208, 208, 0.03)';
      ctx.strokeStyle = '#d1d0d0';
      ctx.beginPath();
      ctx.moveTo(frontLeft, frontBottom);
      ctx.lineTo(frontRight, frontBottom);
      ctx.lineTo(backRight, backBottom);
      ctx.lineTo(backLeft, backBottom);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Front face removed - looking into the cube tunnel
      const gridDivisions = 12; // Grid divisions for other faces

      // Draw grid on back face
      ctx.strokeStyle = '#d1d0d0';
      ctx.lineWidth = 1;
      
      // Vertical grid lines on back
      for (let i = 1; i < gridDivisions; i++) {
        const x = backLeft + (backRight - backLeft) * (i / gridDivisions);
        ctx.beginPath();
        ctx.moveTo(x, backTop);
        ctx.lineTo(x, backBottom);
        ctx.stroke();
      }
      
      // Horizontal grid lines on back
      for (let i = 1; i < gridDivisions; i++) {
        const y = backTop + (backBottom - backTop) * (i / gridDivisions);
        ctx.beginPath();
        ctx.moveTo(backLeft, y);
        ctx.lineTo(backRight, y);
        ctx.stroke();
      }

      // Draw grid lines on top face - both directions for square grid
      ctx.strokeStyle = '#d1d0d0';
      ctx.lineWidth = 1;
      
      // Lines going left-right on top (depth direction)
      for (let i = 0; i <= gridDivisions; i++) {
        const t = i / gridDivisions;
        const x1 = frontLeft + (backLeft - frontLeft) * t;
        const x2 = frontRight + (backRight - frontRight) * t;
        const y = frontTop + (backTop - frontTop) * t;
        
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }

      // Lines going front-back on top (width direction)
      for (let i = 0; i <= gridDivisions; i++) {
        const t = i / gridDivisions;
        const x = frontLeft + (frontRight - frontLeft) * t;
        const xBack = backLeft + (backRight - backLeft) * t;
        const yFront = frontTop;
        const yBack = backTop;
        
        ctx.beginPath();
        ctx.moveTo(x, yFront);
        ctx.lineTo(xBack, yBack);
        ctx.stroke();
      }

      // Draw grid lines on right face
      ctx.strokeStyle = '#d1d0d0';
      ctx.lineWidth = 1;
      
      // Lines going front-to-back at different heights (horizontal)
      for (let i = 0; i <= gridDivisions; i++) {
        const t = i / gridDivisions;
        const yFront = frontTop + (frontBottom - frontTop) * t;
        const yBack = backTop + (backBottom - backTop) * t;
        
        ctx.beginPath();
        ctx.moveTo(frontRight, yFront);
        ctx.lineTo(backRight, yBack);
        ctx.stroke();
      }
      
      // Lines going top-to-bottom at different depths (vertical)
      for (let i = 0; i <= gridDivisions; i++) {
        const t = i / gridDivisions;
        // Interpolate between front and back corners
        const x = frontRight + (backRight - frontRight) * t;
        const yTop = frontTop + (backTop - frontTop) * t;
        const yBottom = frontBottom + (backBottom - frontBottom) * t;
        
        ctx.beginPath();
        ctx.moveTo(x, yTop);
        ctx.lineTo(x, yBottom);
        ctx.stroke();
      }

      // Draw grid lines on left face
      ctx.strokeStyle = '#d1d0d0';
      ctx.lineWidth = 1;
      
      // Lines going front-to-back at different heights (horizontal)
      for (let i = 0; i <= gridDivisions; i++) {
        const t = i / gridDivisions;
        const yFront = frontTop + (frontBottom - frontTop) * t;
        const yBack = backTop + (backBottom - backTop) * t;
        
        ctx.beginPath();
        ctx.moveTo(frontLeft, yFront);
        ctx.lineTo(backLeft, yBack);
        ctx.stroke();
      }
      
      // Lines going top-to-bottom at different depths (vertical)
      for (let i = 0; i <= gridDivisions; i++) {
        const t = i / gridDivisions;
        // Interpolate between front and back corners
        const x = frontLeft + (backLeft - frontLeft) * t;
        const yTop = frontTop + (backTop - frontTop) * t;
        const yBottom = frontBottom + (backBottom - frontBottom) * t;
        
        ctx.beginPath();
        ctx.moveTo(x, yTop);
        ctx.lineTo(x, yBottom);
        ctx.stroke();
      }

      // Draw grid lines on bottom face - both directions for square grid
      ctx.strokeStyle = '#d1d0d0';
      ctx.lineWidth = 1;
      
      // Lines going left-right on bottom (depth direction)
      for (let i = 0; i <= gridDivisions; i++) {
        const t = i / gridDivisions;
        const x1 = frontLeft + (backLeft - frontLeft) * t;
        const x2 = frontRight + (backRight - frontRight) * t;
        const y = frontBottom + (backBottom - frontBottom) * t;
        
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }

      // Lines going front-back on bottom (width direction)
      for (let i = 0; i <= gridDivisions; i++) {
        const t = i / gridDivisions;
        const x = frontLeft + (frontRight - frontLeft) * t;
        const xBack = backLeft + (backRight - backLeft) * t;
        
        ctx.beginPath();
        ctx.moveTo(x, frontBottom);
        ctx.lineTo(xBack, backBottom);
        ctx.stroke();
      }
    }

    // Only apply parallax when first section is in view (mouse move only; no parallax on scroll)
    const heroSection = document.getElementById('hero-section');
    function isHeroInView() {
      if (!heroSection) return true;
      const rect = heroSection.getBoundingClientRect();
      const vh = window.innerHeight;
      return rect.top < vh && rect.bottom > 0;
    }

    function handleMouseMove(e) {
      if (!isHeroInView()) return; // Don't parallax when user has scrolled away
      const rect = canvas.getBoundingClientRect();
      // Normalize mouse position to -1 to 1
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      drawPerspectiveGrid();
      updateImageParallax();
    }

    function resetParallaxWhenScrolledAway() {
      if (!isHeroInView()) {
        mouseX = 0;
        mouseY = 0;
        drawPerspectiveGrid();
        updateImageParallax();
      }
    }

    // Update image parallax with 3D rotation/skew effect
    function updateImageParallax() {
      const unovaImage = document.getElementById('unova-center-image');
      const djImage = document.getElementById('dj-center-image');
      
      if (unovaImage) {
        // 3D rotation based on mouse position
        const rotateY = mouseX * 15; // Rotate on Y axis (left-right tilt)
        const rotateX = -mouseY * 10; // Rotate on X axis (up-down tilt)
        const translateZ = Math.abs(mouseX) * 20 + Math.abs(mouseY) * 20; // Depth movement
        
        unovaImage.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(${translateZ}px)
        `;
      }
      
      if (djImage) {
        // 3D rotation based on mouse position (same as Unova image)
        const rotateY = mouseX * 15; // Rotate on Y axis (left-right tilt)
        const rotateX = -mouseY * 10; // Rotate on X axis (up-down tilt)
        const translateZ = Math.abs(mouseX) * 20 + Math.abs(mouseY) * 20; // Depth movement
        
        djImage.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(${translateZ}px)
        `;
      }
    }

    // Initialize
    resizeCanvas();
    drawPerspectiveGrid();

    // Event listeners: parallax on mouse move only; when user scrolls away, reset (no scroll-based parallax)
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', resetParallaxWhenScrolledAway, { passive: true });

    // Touch support for mobile (only when hero in view)
    window.addEventListener('touchmove', (e) => {
      if (!isHeroInView()) {
        mouseX = 0;
        mouseY = 0;
        drawPerspectiveGrid();
        updateImageParallax();
        return;
      }
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * 2;
        drawPerspectiveGrid();
        updateImageParallax();
      }
    });
  }
});

console.log('Logino app initialized!');

// Update time and day/night mode
function updateTimeAndMode() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  // Format time as HH:MM:SS
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
  
  // Determine day or night (6 AM to 6 PM is Day, otherwise Night)
  const mode = (hours >= 6 && hours < 18) ? 'Day' : 'Night';
  
  // Update DOM
  const timeElement = document.getElementById('current-time');
  const modeElement = document.getElementById('day-night-mode');
  
  if (timeElement) {
    timeElement.textContent = timeString;
  }
  
  if (modeElement) {
    modeElement.textContent = `Mode: ${mode}`;
  }
}

// Update time immediately and then every second
updateTimeAndMode();
setInterval(updateTimeAndMode, 1000);

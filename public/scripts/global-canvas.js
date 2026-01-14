/**
 * Neural Network / Particle Network Animation
 * Creates an interactive canvas background with floating particles
 * that connect to each other and to the mouse cursor
 */

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

        // Keep within bounds
        this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    }

    draw(ctx, theme) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark'
            ? 'rgba(192, 202, 245, 0.6)' // Indigo-ish for dark theme
            : 'rgba(100, 116, 139, 0.5)'; // Slate for light theme
        ctx.fill();
    }
}

class ParticleNetwork {
    constructor() {
        this.canvas = document.getElementById('globalCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.particleCount = 80;
        this.maxDistance = 150;
        this.theme = document.documentElement.getAttribute('data-theme') || 'light';

        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    this.theme = document.documentElement.getAttribute('data-theme') || 'light';
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    drawConnections() {
        const lineColor = this.theme === 'dark'
            ? 'rgba(192, 202, 245, 0.15)' // Indigo for dark theme
            : 'rgba(100, 116, 139, 0.12)'; // Slate for light theme

        // Connect particles to each other
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    const opacity = 1 - distance / this.maxDistance;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.theme === 'dark'
                        ? `rgba(192, 202, 245, ${opacity * 0.15})`
                        : `rgba(100, 116, 139, ${opacity * 0.12})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }

            // Connect particles to mouse
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.particles[i].x - this.mouse.x;
                const dy = this.particles[i].y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance * 1.5) {
                    const opacity = 1 - distance / (this.maxDistance * 1.5);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.theme === 'dark'
                        ? `rgba(255, 158, 100, ${opacity * 0.4})` // Warm orange for dark theme
                        : `rgba(15, 23, 42, ${opacity * 0.3})`; // Dark slate for light theme
                    this.ctx.lineWidth = 1.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx, this.theme);
        });

        // Draw connections
        this.drawConnections();

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleNetwork();
    });
} else {
    new ParticleNetwork();
}

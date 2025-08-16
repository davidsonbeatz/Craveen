// 3D Particles Background Effect
class Particle {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = options.x || Math.random() * canvas.width;
        this.y = options.y || Math.random() * canvas.height;
        this.size = options.size || Math.random() * 3 + 1;
        this.speedX = options.speedX || (Math.random() - 0.5) * 1.5;
        this.speedY = options.speedY || (Math.random() - 0.5) * 1.5;
        this.color = options.color || '#bb86fc';
        this.shadowBlur = options.shadowBlur || 5;
        this.shadowColor = options.shadowColor || '#bb86fc';
        this.depth = options.depth || Math.random() * 100;
        this.maxDepth = 100;
        this.originalSize = this.size;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check with bounce effect
        if (this.x > this.canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > this.canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }

        // Simulate 3D movement by changing depth
        this.depth += (Math.random() - 0.5) * 2;
        if (this.depth > this.maxDepth) this.depth = this.maxDepth;
        if (this.depth < 0) this.depth = 0;

        // Adjust size based on depth (perspective effect)
        const depthFactor = 1 - (this.depth / this.maxDepth) * 0.5;
        this.size = this.originalSize * depthFactor;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.shadowBlur = this.shadowBlur;
        this.ctx.shadowColor = this.shadowColor;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

class ParticleSystem {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id '${canvasId}' not found`);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = options.particleCount || 100;
        this.connectDistance = options.connectDistance || 100;
        this.showConnections = options.showConnections !== undefined ? options.showConnections : true;
        this.mouseX = undefined;
        this.mouseY = undefined;
        this.mouseRadius = options.mouseRadius || 150;
        this.colors = options.colors || ['#bb86fc', '#6200ea', '#3700b3'];
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        // Set canvas to full window size
        this.resizeCanvas();
        
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.particles.push(new Particle(this.canvas, {
                color: color,
                shadowColor: color,
                shadowBlur: Math.random() * 10 + 5
            }));
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.x;
            this.mouseY = e.y;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouseX = undefined;
            this.mouseY = undefined;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
            
            // Connect particles if they're close enough
            if (this.showConnections) {
                this.connectParticles(this.particles[i], i);
            }
            
            // Interactive mouse effect
            this.handleMouseInteraction(this.particles[i]);
        }
        
        requestAnimationFrame(() => this.animate());
    }

    connectParticles(particle, index) {
        for (let j = index + 1; j < this.particles.length; j++) {
            const dx = particle.x - this.particles[j].x;
            const dy = particle.y - this.particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.connectDistance) {
                // Calculate opacity based on distance
                const opacity = 1 - (distance / this.connectDistance);
                
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(187, 134, 252, ${opacity * 0.5})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }

    handleMouseInteraction(particle) {
        if (this.mouseX && this.mouseY) {
            const dx = particle.x - this.mouseX;
            const dy = particle.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouseRadius) {
                // Calculate force direction (away from mouse)
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                
                // Calculate force strength (stronger when closer)
                const force = (this.mouseRadius - distance) / this.mouseRadius;
                
                // Apply force to particle velocity
                particle.speedX += forceDirectionX * force * 0.5;
                particle.speedY += forceDirectionY * force * 0.5;
                
                // Limit max speed
                const maxSpeed = 3;
                const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
                if (currentSpeed > maxSpeed) {
                    particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
                    particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
                }
            }
        }
    }
}

// Initialize the particle system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create canvas element for particles
    const particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'particles-canvas';
    particleCanvas.style.position = 'fixed';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100%';
    particleCanvas.style.height = '100%';
    particleCanvas.style.pointerEvents = 'none';
    particleCanvas.style.zIndex = '1';
    document.body.appendChild(particleCanvas);
    
    // Initialize particle system
    new ParticleSystem('particles-canvas', {
        particleCount: 80,
        connectDistance: 150,
        showConnections: true,
        mouseRadius: 120,
        colors: ['#bb86fc', '#6200ea', '#3700b3']
    });
});
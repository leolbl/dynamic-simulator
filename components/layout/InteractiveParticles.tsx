import React, { useRef, useEffect } from 'react';

const InteractiveParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particlesArray: Particle[];
        const mouse = { x: null as number | null, y: null as number | null, radius: 120 };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                // Add a glow effect
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.fill();
                // Reset shadow for other elements
                ctx.shadowBlur = 0;
            }

            update() {
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.directionY = -this.directionY;
                }

                this.x += this.directionX;
                this.y += this.directionY;

                // Mouse repulsion
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        this.x -= dx * force * 0.08;
                        this.y -= dy * force * 0.08;
                    }
                }

                this.draw();
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            const isDark = document.documentElement.classList.contains('dark');
            const color = isDark ? 'rgba(56, 189, 248, 0.8)' : 'rgba(37, 99, 235, 0.8)';
            
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1.5;
                let x = Math.random() * (innerWidth - size * 2) + size * 2;
                let y = Math.random() * (innerHeight - size * 2) + size * 2;
                let directionX = (Math.random() * 0.6) - 0.3;
                let directionY = (Math.random() * 0.6) - 0.3;
                
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        };

        const connectLines = () => {
            const isDark = document.documentElement.classList.contains('dark');
            const connectDistance = (canvas.width / 9) * (canvas.height / 9);

            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const distance = Math.pow(particlesArray[a].x - particlesArray[b].x, 2)
                                 + Math.pow(particlesArray[a].y - particlesArray[b].y, 2);
                    
                    if (distance < connectDistance) {
                        const opacity = 1 - (distance / connectDistance);
                        ctx.strokeStyle = `rgba(${isDark ? '56, 189, 248' : '37, 99, 235'}, ${opacity * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            
            const isDark = document.documentElement.classList.contains('dark');
            const color = isDark ? 'rgba(56, 189, 248, 0.8)' : 'rgba(37, 99, 235, 0.8)';
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].color = color;
                particlesArray[i].update();
            }
            connectLines();
        };
        
        const handleResize = () => {
            cancelAnimationFrame(animationFrameId);
            init();
            animate();
        };

        window.addEventListener('resize', handleResize);
        
        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-20" />;
};

export default InteractiveParticles;
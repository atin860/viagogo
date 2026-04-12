class StadiumMap {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = 600;
        this.height = 600;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;

        this.config = {
            pitchRadius: 160,
            ring1: { inner: 170, outer: 200, gap: 0.04 },
            ring2: { inner: 210, outer: 240, gap: 0.04 },
            ring3: { inner: 250, outer: 280, gap: 0.04 }
        };

        this.data = [
            // Outer Ring (Ring 3)
            { ring: 3, start: -1.2, end: -0.6, color: '#e0e0e0', text: 'SOUTH STAND C 3RD FLR', price: '€34', left: '4 left' },
            { ring: 3, start: -0.55, end: 0.2, color: '#c5e1a5', text: 'SOUTH STAND D 3RD FLR', price: '€36', left: '2 left' },
            { ring: 3, start: 0.25, end: 0.8, color: '#e0e0e0', text: 'WEST STAND E 2ND FLR' },
            { ring: 3, start: 0.85, end: 1.6, color: '#e0e0e0', text: 'WEST STAND F 2ND FLR' },
            { ring: 3, start: 1.65, end: 2.2, color: '#c5e1a5', text: 'NORTH STAND G 3RD FLR', price: '€30', left: '4 left' },
            { ring: 3, start: 2.25, end: 3.2, color: '#c5e1a5', text: 'NORTH STAND A 3RD FLR', price: '€13', label: 'Best price', dark: true },
            { ring: 3, start: 3.25, end: 4.2, color: '#e0e0e0', text: 'EAST STAND B 2ND FLR' },
            { ring: 3, start: 4.25, end: 5.0, color: '#c5e1a5', text: 'EAST STAND B 3RD FLR', price: '€40', left: '4 left' },

            // Middle Ring (Ring 2)
            { ring: 2, start: -1.2, end: -0.4, color: '#f5f5f5', text: 'SOUTH STAND C 2ND FLR' },
            { ring: 2, start: -0.35, end: 0.4, color: '#f5f5f5', text: 'SOUTH STAND D 2ND FLR' },
            { ring: 2, start: 0.45, end: 1.2, color: '#f5f5f5', text: 'WEST STAND E 1ST FLR' },
            { ring: 2, start: 1.3, end: 2.0, color: '#f5f5f5', text: 'WEST STAND F 1ST FLR' },
            { ring: 2, start: 2.1, end: 2.8, color: '#f5f5f5', text: 'NORTH STAND G 2ND FLR' },
            { ring: 2, start: 2.9, end: 3.6, color: '#f5f5f5', text: 'NORTH STAND A 2ND FLR' },
            { ring: 2, start: 3.7, end: 4.5, color: '#f5f5f5', text: 'EAST STAND B 1ST FLR' },

            // Inner Ring (Ring 1)
            { ring: 1, start: -0.5, end: 0.5, color: '#c5e1a5', text: 'SOUTH STAND D GR FLR' },
            { ring: 1, start: 0.6, end: 1.6, color: '#f5f5f5', text: 'WEST STAND E GR FLR' },
            { ring: 1, start: 1.7, end: 2.7, color: '#f5f5f5', text: 'NORTH STAND G GR FLR' },
            { ring: 1, start: 2.8, end: 3.8, color: '#c5e1a5', text: 'NORTH STAND A GR FLR', price: '€72', left: '4 left' },
            { ring: 1, start: 3.9, end: 4.9, color: '#c5e1a5', text: 'EAST STAND B GR FLR', price: '€40', left: '4 left' },
            { ring: 1, start: 5.0, end: 5.8, color: '#f5f5f5', text: 'SOUTH STAND C GR FLR' }
        ];

        this.init();
    }

    init() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.draw();

        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw Grass
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.config.pitchRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#43a047';
        this.ctx.fill();
        this.ctx.strokeStyle = '#2e7d32';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Draw Pitch
        this.ctx.fillStyle = '#ffca28';
        this.ctx.fillRect(this.centerX - 10, this.centerY - 35, 20, 70);
        this.ctx.strokeStyle = '#d4a017';
        this.ctx.strokeRect(this.centerX - 10, this.centerY - 35, 20, 70);

        // Draw Sections
        this.data.forEach(item => {
            const ringCfg = this.config[`ring${item.ring}`];
            this.drawSection(item, ringCfg);
        });

        // Draw Price Tags (Bubbles)
        this.data.forEach(item => {
            if (item.price) {
                const ringCfg = this.config[`ring${item.ring}`];
                this.drawPriceTag(item, ringCfg);
            }
        });

        this.drawRowNumbers();
    }

    drawSection(item, config) {
        const { start, end, color } = item;
        const { inner, outer } = config;

        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, outer, start, end);
        this.ctx.arc(this.centerX, this.centerY, inner, end, start, true);
        this.ctx.closePath();

        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();

        // Draw curved text if present
        if (item.text) {
            this.drawCurvedText(item.text, (inner + outer) / 2, (start + end) / 2);
        }
    }

    drawRowNumbers() {
        this.ctx.font = '7px Arial';
        this.ctx.fillStyle = '#bbb';
        this.ctx.textAlign = 'center';

        const numberAreas = [
            { ring: 3, start: -1.0, count: 8 },
            { ring: 3, start: 1.8, count: 12 },
            { ring: 2, start: -0.8, count: 6 }
        ];

        numberAreas.forEach(area => {
            const config = this.config[`ring${area.ring}`];
            const midRadius = (config.inner + config.outer) / 2;

            for (let i = 0; i < area.count; i++) {
                const angle = area.start + (i * 0.1);
                const x = this.centerX + Math.cos(angle) * midRadius;
                const y = this.centerY + Math.sin(angle) * midRadius;

                this.ctx.save();
                this.ctx.translate(x, y);
                this.ctx.rotate(angle + Math.PI / 2);
                this.ctx.fillText(i + 1, 0, 0);
                this.ctx.restore();
            }
        });
    }

    drawCurvedText(text, radius, angle) {
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(angle);

        this.ctx.fillStyle = '#888';
        this.ctx.font = 'bold 8px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Simple rotation for text to follow curve
        // For a more professional look, each character should be rotated, 
        // but for this demo, single string is fine.
        this.ctx.fillText(text, radius, 0);
        this.ctx.restore();
    }

    drawPriceTag(item, config) {
        const angle = (item.start + item.end) / 2;
        const radius = config.outer + 10;
        const x = this.centerX + Math.cos(angle) * (radius + 20);
        const y = this.centerY + Math.sin(angle) * (radius + 20);

        const w = 70;
        const h = 40;

        this.ctx.save();

        // Shadow
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(0,0,0,0.1)';

        // Bubble body
        this.ctx.beginPath();
        this.roundRect(x - w / 2, y - h / 2, w, h, 8);
        this.ctx.fillStyle = item.dark ? '#252a31' : '#fff';
        this.ctx.fill();

        this.ctx.shadowBlur = 0;

        // Text
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = item.dark ? '#fff' : '#000';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillText(item.price, x, y - 5);

        this.ctx.fillStyle = item.dark ? '#fff' : '#e91e63';
        this.ctx.font = '700 10px Arial';
        this.ctx.fillText(item.label || item.left, x, y + 12);

        this.ctx.restore();
    }

    roundRect(x, y, w, h, r) {
        this.ctx.moveTo(x + r, y);
        this.ctx.arcTo(x + w, y, x + w, y + h, r);
        this.ctx.arcTo(x + w, y + h, x, y + h, r);
        this.ctx.arcTo(x, y + h, x, y, r);
        this.ctx.arcTo(x, y, x + w, y, r);
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dx = x - (rect.width / 2);
        const dy = y - (rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Scale back to internal coordinates
        const scaleX = this.width / rect.width;
        const scaleY = this.height / rect.height;
        const internalDist = dist * scaleX;

        // Simple hit detection for sectors
        this.data.forEach(item => {
            const ringCfg = this.config[`ring${item.ring}`];
            if (internalDist >= ringCfg.inner && internalDist <= ringCfg.outer) {
                // Normalize angle to 0..2PI or matching the data
                let normalizedAngle = angle;
                if (normalizedAngle < -Math.PI / 2) normalizedAngle += Math.PI * 2;

                if (normalizedAngle >= item.start && normalizedAngle <= item.end) {
                    console.log('Clicked section:', item.text);
                    alert(`Selected: ${item.text}\nPrice: ${item.price || 'Contact for details'}`);
                }
            }
        });
    }
}

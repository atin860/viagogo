class StadiumMap {
    constructor(svgId) {
        this.svg = document.getElementById(svgId);
        this.listingsPanel = document.querySelector('.listings-panel');
        this.width = 600;
        this.height = 600;
        this.centerX = 300;
        this.centerY = 300;

        this.config = {
            pitchRadius: 160,
            ring1: { inner: 170, outer: 195, gap: 0.04 },
            ring2: { inner: 205, outer: 235, gap: 0.04 },
            ring3: { inner: 245, outer: 275, gap: 0.04 }
        };

        this.data = [
            // Outer Ring (Ring 3)
            { id: 'south-stand-c', ring: 3, start: -1.2, end: -0.6, color: '#e0e0e0', text: 'SOUTH STAND C 3RD FLR', price: '€34', left: '4 left' },
            { id: 'south-stand-d', ring: 3, start: -0.55, end: 0.2, color: '#c5e1a5', text: 'SOUTH STAND D 3RD FLR', price: '€36', left: '2 left' },
            { id: 'west-stand-e', ring: 3, start: 0.25, end: 0.8, color: '#e0e0e0', text: 'WEST STAND E 2ND FLR' },
            { id: 'west-stand-f', ring: 3, start: 0.85, end: 1.6, color: '#e0e0e0', text: 'WEST STAND F 2ND FLR' },
            { id: 'north-stand-g', ring: 3, start: 1.65, end: 2.2, color: '#c5e1a5', text: 'NORTH STAND G 3RD FLR', price: '€30', left: '4 left' },
            { id: 'north-stand-a', ring: 3, start: 2.25, end: 3.2, color: '#c5e1a5', text: 'NORTH STAND A 3RD FLR', price: '€13', label: 'Best price', dark: true },
            { id: 'east-stand-b-2nd', ring: 3, start: 3.25, end: 4.2, color: '#e0e0e0', text: 'EAST STAND B 2ND FLR' },
            { id: 'east-stand-b', ring: 3, start: 4.25, end: 5.0, color: '#c5e1a5', text: 'EAST STAND B 3RD FLR', price: '€40', left: '4 left' },

            // Middle Ring (Ring 2)
            { id: 'south-stand-c-2nd', ring: 2, start: -1.2, end: -0.4, color: '#f5f5f5', text: 'SOUTH STAND C 2ND FLR' },
            { id: 'south-stand-d-2nd', ring: 2, start: -0.35, end: 0.4, color: '#f5f5f5', text: 'SOUTH STAND D 2ND FLR' },
            { id: 'west-stand-e-1st', ring: 2, start: 0.45, end: 1.2, color: '#f5f5f5', text: 'WEST STAND E 1ST FLR' },
            { id: 'west-stand-f-1st', ring: 2, start: 1.3, end: 2.0, color: '#f5f5f5', text: 'WEST STAND F 1ST FLR' },
            { id: 'north-stand-g-2nd', ring: 2, start: 2.1, end: 2.8, color: '#f5f5f5', text: 'NORTH STAND G 2ND FLR' },
            { id: 'north-stand-a-2nd', ring: 2, start: 2.9, end: 3.6, color: '#f5f5f5', text: 'NORTH STAND A 2ND FLR' },
            { id: 'east-stand-b-1st', ring: 2, start: 3.7, end: 4.5, color: '#f5f5f5', text: 'EAST STAND B 1ST FLR' },

            // Inner Ring (Ring 1)
            { id: 'south-stand-d-gr', ring: 1, start: -0.5, end: 0.5, color: '#c5e1a5', text: 'SOUTH STAND D GR FLR' },
            { id: 'west-stand-e-gr', ring: 1, start: 0.6, end: 1.6, color: '#f5f5f5', text: 'WEST STAND E GR FLR' },
            { id: 'north-stand-g-gr', ring: 1, start: 1.7, end: 2.7, color: '#f5f5f5', text: 'NORTH STAND G GR FLR' },
            { id: 'north-stand', ring: 1, start: 2.8, end: 3.8, color: '#c5e1a5', text: 'NORTH STAND VIP', price: '€72', left: '4 left' },
            { id: 'east-stand-b-gr', ring: 1, start: 3.9, end: 4.9, color: '#c5e1a5', text: 'EAST STAND B GR FLR', price: '€40', left: '4 left' },
            { id: 'south-stand-c-gr', ring: 1, start: 5.0, end: 5.8, color: '#f5f5f5', text: 'SOUTH STAND C GR FLR' }
        ];

        this.listingsDetails = {
            'north-stand-a': { title: 'Section North Stand A 3rd Flr.', row: 'Row U', oldPrice: '€17', price: '€13', rating: '10.0 Amazing', badges: [{ text: 'Best price', class: 'badge-orange' }, { text: 'Last tickets', class: 'badge-orange' }, { text: 'Only 3 left', class: 'badge-red' }] },
            'north-stand-g': { title: 'Section North Stand G 3rd Flr.', row: 'Row R', oldPrice: '€42', price: '€30', rating: '9.5 Great', badges: [{ text: '30% off', class: 'badge-green' }, { text: 'Last tickets', class: 'badge-orange' }, { text: 'Only 4 left', class: 'badge-red' }] },
            'north-stand-d': { title: 'Section North Stand D 3rd Flr.', row: 'Row K', oldPrice: '€49', price: '€34', badges: [{ text: '30% off', class: 'badge-green' }, { text: 'Last tickets', class: 'badge-orange' }, { text: 'Only 4 left', class: 'badge-red' }] },
            'north-stand-c': { title: 'Section North Stand C 3rd Flr.', row: 'Row M', oldPrice: '€42', price: '€36', badges: [{ text: '30% off', class: 'badge-green' }, { text: 'Last tickets', class: 'badge-orange' }, { text: 'Only 4 left', class: 'badge-red' }] },
            'east-stand': { title: 'Section East Stand 3rd Flr.', row: 'Row P', oldPrice: '€55', price: '€40', badges: [{ text: '30% off', class: 'badge-green' }, { text: 'Last tickets', class: 'badge-orange' }, { text: 'Only 4 left', class: 'badge-red' }] },
            'west-stand': { title: 'Section West Stand 3rd Flr.', row: 'Row P', oldPrice: '€55', price: '€40', badges: [{ text: '30% off', class: 'badge-green' }, { text: 'Last tickets', class: 'badge-orange' }, { text: 'Only 4 left', class: 'badge-red' }] },
            'south-stand-a': { title: 'Section South Stand A 3rd Flr.', row: 'Row N', oldPrice: '€48', price: '€34', badges: [{ text: '29% off', class: 'badge-green' }, { text: 'Last tickets', class: 'badge-orange' }] },
            'north-stand': { title: 'Section North Stand VIP', row: 'Row A', oldPrice: '€90', price: '€72', badges: [{ text: '20% off', class: 'badge-green' }, { text: 'Only 4 left', class: 'badge-red' }] },
            'south-stand': { title: 'Section South Stand (Best price)', row: 'Row B', oldPrice: '€17', price: '€13', badges: [{ text: 'Best price', class: 'badge-orange' }, { text: 'Last tickets', class: 'badge-orange' }] }
        };

        // Ensure every interactive ID maps to something
        this.idMapping = {
            'south-stand-d': 'south-stand',
            'south-stand-d-gr': 'south-stand',
            'east-stand-b': 'east-stand',
            'east-stand-b-gr': 'east-stand',
            'east-stand-b-2nd': 'east-stand',
            'north-stand-a-2nd': 'north-stand-a',
            'north-stand-g-2nd': 'north-stand-g'
        };

        this.init();
    }

    init() {
        this.renderSvg();
        this.renderListings();
    }

    renderSvg() {
        let content = `
            <defs>
                <radialGradient id="pitchGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#43a047" />
                    <stop offset="100%" style="stop-color:#2e7d32" />
                </radialGradient>
                <filter id="bubbleShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="2" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.2"/></feComponentTransfer>
                    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>
            <!-- Ground -->
            <circle cx="300" cy="300" r="160" fill="url(#pitchGradient)" stroke="#1b5e20" stroke-width="2" />
            <rect x="290" y="265" width="20" height="70" fill="#ffca28" stroke="#d4a017" stroke-width="1" />
        `;

        // Render Sections
        this.data.forEach(item => {
            const ringCfg = this.config[`ring${item.ring}`];
            const path = this.describeArc(this.centerX, this.centerY, ringCfg.inner, ringCfg.outer, item.start, item.end);
            const isGreen = item.color === '#c5e1a5';

            content += `<path d="${path}" 
                        fill="${item.color}" 
                        stroke="#fff" 
                        stroke-width="1.5" 
                        class="stadium-section ${isGreen ? 'interactive' : ''}" 
                        data-section="${item.id}" 
                        style="${isGreen ? 'cursor:pointer;' : 'pointer-events:none;'} transition:all 0.2s;" />`;

            if (item.text) {
                const midRadius = (ringCfg.inner + ringCfg.outer) / 2;
                const midAngle = (item.start + item.end) / 2;
                content += this.renderCurvedText(item.text, midRadius, midAngle, item.id);
            }
        });

        // Render Bubbles
        this.data.forEach(item => {
            if (item.price) {
                const ringCfg = this.config[`ring${item.ring}`];
                const angle = (item.start + item.end) / 2;
                const radius = ringCfg.outer + 35;
                const x = this.centerX + Math.cos(angle) * radius - 35;
                const y = this.centerY + Math.sin(angle) * radius - 20;

                content += `
                    <g filter="url(#bubbleShadow)" transform="translate(${x}, ${y})">
                        <rect width="70" height="40" rx="8" fill="${item.dark ? '#252a31' : '#fff'}" />
                        <text x="35" y="18" text-anchor="middle" fill="${item.dark ? '#fff' : '#000'}" font-size="14" font-weight="bold">${item.price}</text>
                        <text x="35" y="32" text-anchor="middle" fill="${item.dark ? '#fff' : '#e91e63'}" font-size="9" font-weight="700">${item.label || item.left}</text>
                    </g>
                `;
            }
        });

        this.svg.innerHTML = content;

        // Add event listeners (only to green sections)
        this.svg.querySelectorAll('.stadium-section.interactive').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.getAttribute('data-section');
                this.selectSection(id);
            });
        });
    }

    describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle) {
        const startOuter = this.polarToCartesian(x, y, outerRadius, endAngle);
        const endOuter = this.polarToCartesian(x, y, outerRadius, startAngle);
        const startInner = this.polarToCartesian(x, y, innerRadius, startAngle);
        const endInner = this.polarToCartesian(x, y, innerRadius, endAngle);

        const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

        return [
            "M", startOuter.x, startOuter.y,
            "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
            "L", startInner.x, startInner.y,
            "A", innerRadius, innerRadius, 0, largeArcFlag, 1, endInner.x, endInner.y,
            "Z"
        ].join(" ");
    }

    polarToCartesian(centerX, centerY, radius, angleInRadians) {
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    renderCurvedText(text, radius, angle, id) {
        const x = this.centerX + Math.cos(angle) * radius;
        const y = this.centerY + Math.sin(angle) * radius;
        const rotate = (angle * 180 / Math.PI) + 90;

        return `<text x="${x}" y="${y}" transform="rotate(${rotate}, ${x}, ${y})" text-anchor="middle" font-size="7" font-weight="bold" fill="#888" style="pointer-events:none;">${text}</text>`;
    }

    selectSection(id) {
        this.svg.querySelectorAll('.stadium-section').forEach(s => s.classList.remove('selected'));
        const el = this.svg.querySelector(`[data-section="${id}"]`);
        if (el) el.classList.add('selected');

        // Check mapping first
        const mappedId = this.idMapping[id] || id;

        if (this.listingsDetails[mappedId]) {
            this.renderListings(mappedId);
        } else {
            this.renderListings();
        }
    }

    renderListings(filterId = null) {
        let content = '';
        const sectionsToRender = filterId ? [filterId] : ['north-stand-a', 'north-stand-g', 'north-stand-d', 'north-stand-c', 'east-stand', 'west-stand', 'south-stand-a', 'north-stand', 'south-stand'];

        content += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 id="listingsCount" style="font-size: 20px; font-weight: 800;">${sectionsToRender.length} listings found</h3>
                        <button style="padding: 8px 16px; border: none; border-radius: 20px; background: #eee; font-weight: 600;">2 tickets ▾</button>
                    </div>`;

        sectionsToRender.forEach(id => {
            const data = this.listingsDetails[id];
            if (!data) return;
            content += `
                <div class="listing-card">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div class="listing-info">
                            <h4>${data.title}</h4>
                            <p>${data.row} • 2 tickets together</p>
                        </div>
                        <div class="badges-row">
                            <span class="badge badge-blue">Instant Download</span>
                            <span class="badge badge-green">Clear view</span>
                        </div>
                    </div>
                    <div class="badges-row">
                        ${data.badges.map(b => `<span class="badge ${b.class}">${b.text}</span>`).join('')}
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top: 10px; padding-top: 15px; border-top: 1px solid #f0f0f0;">
                        ${data.rating ? `<span style="background: #f1f8e9; color: #33691e; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 800;">${data.rating}</span>` : '<div></div>'}
                        <div class="price-section">
                            <div class="old-price">${data.oldPrice}</div>
                            <div class="current-price">${data.price}</div>
                        </div>
                    </div>
                </div>
            `;
        });
        this.listingsPanel.innerHTML = content;
    }
}

(() => {
    const modal = document.getElementById('safetySpecificationModal');
    if (!modal) return;

    const products = [
        {
            type: 'Lever Operated Safety Valve', also: 'Test Lever Type Safety Valve',
            function: 'Overpressure relief for a suitably protected system',
            connection: 'Flanged end; verify the model-specific connection',
            materials: 'Carbon steel, stainless steel and alloy options, subject to model',
            setting: 'To be specified and verified for the protected system',
            range: 'Confirm pressure, capacity and size limits for the selected model',
            references: 'ASME Section VIII, API 520 / 521 and ISO 4126, as applicable',
            diagram: '',
            tags: ['Test Lever Type', 'Manual Lift', 'Pressure Relief']
        },
        {
            type: 'Direct Operated Self-Operated Pressure Reducing Valve', also: 'Pressure Reducing Valve (PRV)',
            function: 'Regulates downstream pressure; it is not a safety relief device',
            connection: 'Confirm end connection and size for the selected model',
            materials: 'Body and trim materials depend on model and service conditions',
            setting: 'Set downstream pressure to suit the system requirements',
            range: 'Confirm inlet pressure, outlet pressure, flow and size limits',
            references: 'Applicable pressure control design and project requirements',
            diagram: '',
            tags: ['Pressure Reducing Valve', 'Self-Operated', 'Pressure Control']
        },
        {
            type: 'Spring Loaded Safety Relief Valve', also: 'Flanged End Safety Relief Valve',
            function: 'Overpressure relief for a suitably protected system',
            connection: 'Flanged end; verify flange rating and facing for the model',
            materials: 'Carbon steel, stainless steel and alloy options, subject to model',
            setting: 'To be specified and verified for the protected system',
            range: 'Confirm pressure, capacity and size limits for the selected model',
            references: 'ASME Section VIII, API 520 / 521 / 526 and ISO 4126, as applicable',
            diagram: '',
            tags: ['Spring Loaded', 'Flanged End', 'Pressure Relief']
        },
        {
            type: 'Threaded Safety Relief Valve', also: 'Compact Type Safety Relief Valve',
            function: 'Overpressure relief for a suitably protected system',
            connection: 'Threaded end — NPT / BSP / BSPT options; verify model',
            materials: 'Carbon steel, stainless steel, forged steel and special alloys, subject to model',
            setting: 'To be specified and verified for the protected system',
            range: 'Portfolio range: ½ in (DN15) to 12 in (DN300); confirm model limits',
            references: 'ASME Section VIII, API 520 / 521 / 526 and ISO 4126, as applicable',
            diagram: '',
            tags: ['Compact Type', 'Threaded End', 'Pressure Relief']
        }
    ];

    const $ = (id) => document.getElementById(id);
    const dialog = modal.querySelector('.safety-modal-dialog');
    const mainImage = $('safetyMainImage');
    const placeholder = $('safetyDiagramPlaceholder');
    let currentProductImage = '';
    let currentProductAlt = '';
    let currentDiagram = '';

    function openModal(button) {
        const index = Number(button.dataset.safetyProduct);
        const card = button.closest('.ball-product-card');
        const data = products[index];
        if (!card || !data) return;

        const image = card.querySelector('.ball-product-image img');
        const title = card.querySelector('.ball-product-info h3')?.textContent.trim() || data.type;
        const description = card.querySelector('.ball-product-info p')?.textContent.trim() || '';
        const category = card.querySelector('.ball-product-number')?.textContent.trim() || '';

        $('safetyModalProductName').textContent = title;
        $('safetyModalDescription').textContent = description;
        $('safetyProductCategory').textContent = category;
        $('safetyGalleryNumber').textContent = `PRODUCT ${String(index + 1).padStart(2, '0')}`;
        $('safetyGalleryCaption').textContent = 'PRODUCT VIEW';
        $('safetyModalWhatsApp').href = `https://wa.me/919714706950?text=${encodeURIComponent(`Hello VELTORA, I am interested in the ${title}. Please share the details.`)}`;

        if (image) {
            currentProductImage = image.getAttribute('src');
            currentProductAlt = image.alt || title;
            mainImage.src = currentProductImage;
            mainImage.alt = currentProductAlt;
            $('safetyProductThumb').src = image.src;
            $('safetyProductThumb').alt = `${title} thumbnail`;
        }
        currentDiagram = data.diagram;
        mainImage.hidden = false;
        placeholder.hidden = true;

        $('safetyModalTags').replaceChildren(...data.tags.map((tag) => {
            const item = document.createElement('span');
            item.className = 'safety-modal-tag';
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-circle-check';
            item.append(icon, document.createTextNode(tag));
            return item;
        }));

        const rows = [
            ['Product Type', data.type], ['Also Known As', data.also], ['Valve Function', data.function],
            ['End Connection', data.connection], ['Body Materials', data.materials],
            ['Pressure Setting', data.setting], ['Pressure / Size Range', data.range],
            ['Design References', data.references]
        ];
        $('safetyModalSpecifications').replaceChildren(...rows.map(([label, value]) => {
            const row = document.createElement('div');
            row.className = 'safety-spec-row';
            const key = document.createElement('strong');
            key.className = 'safety-spec-label';
            key.textContent = label;
            const detail = document.createElement('span');
            detail.className = 'safety-spec-value';
            detail.textContent = value;
            row.append(key, detail);
            return row;
        }));

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('safety-modal-open');
        dialog.focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('safety-modal-open');
    }

    document.addEventListener('click', (event) => {
        const button = event.target.closest('.safety-spec-btn');
        if (button) {
            openModal(button);
            return;
        }
        if (event.target.closest('[data-safety-close]')) closeModal();

        const view = event.target.closest('[data-safety-view]');
        if (view) {
            document.querySelectorAll('.safety-thumb').forEach((thumb) => thumb.classList.toggle('active', thumb === view));
            const isDiagram = view.dataset.safetyView === 'diagram';
            if (isDiagram) {
                if (currentDiagram) {
                    mainImage.src = currentDiagram;
                    mainImage.alt = `${$('safetyModalProductName').textContent} technical diagram`;
                    mainImage.hidden = false;
                    placeholder.hidden = true;
                } else {
                    mainImage.hidden = true;
                    placeholder.hidden = false;
                }
            } else {
                mainImage.src = currentProductImage;
                mainImage.alt = currentProductAlt;
                mainImage.hidden = false;
                placeholder.hidden = true;
            }
            $('safetyGalleryCaption').textContent = isDiagram
                ? (currentDiagram ? 'TECHNICAL DIAGRAM' : 'TECHNICAL DRAWING PENDING')
                : 'PRODUCT VIEW';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
})();

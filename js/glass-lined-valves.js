(() => {
    const modal = document.getElementById('glassSpecificationModal');
    if (!modal) return;

    const products = [
        {
            tags: ['Tubular Type', 'Sight Flow Indicator', 'Process Monitoring'],
            rows: [
                ['Product Type', 'Tubular Sight Flow Indicator'],
                ['Viewing Design', 'Transparent tubular viewing section'],
                ['Function', 'Visual observation of process flow'],
                ['Body / Glass', 'Confirm body construction and glass specification for the model'],
                ['End Connection', 'Confirm connection details for the selected model'],
                ['Pressure / Size Range', 'Confirm approved model limits and dimensions'],
                ['Design References', 'ASME B16.34, ASME B16.5 and applicable DIN / ISO references']
            ],
            diagram: '',
            section: ''
        },
        {
            tags: ['Double Window Type', 'Sight Flow Indicator', 'Process Monitoring'],
            rows: [
                ['Product Type', 'Double Window Sight Flow Indicator'],
                ['Viewing Design', 'Opposed viewing windows for visual process monitoring'],
                ['Function', 'Visual observation of process flow through the viewing windows'],
                ['Body / Glass', 'Confirm body material, glass and window assembly for the model'],
                ['End Connection', 'Flanged end RF or customized process connection, subject to model'],
                ['Pressure / Size Range', 'Portfolio references: PN10, PN16, Class 150 / 300; 1 in (DN25) to 12 in (DN300). Confirm model limits'],
                ['Design References', 'ASME B16.34, ASME B16.5 and applicable DIN / ISO references']
            ],
            diagram: 'assets/products/Glass%20Lined/Diagram%20Double%20Window%20Sight%20Flow%20Indicator.webp',
            section: 'assets/products/Glass%20Lined/Diagram%20Double%20Window%20Sight%20Flow%20Indicator.jpeg'
        }
    ];

    const $ = (id) => document.getElementById(id);
    const dialog = modal.querySelector('.glass-modal-dialog');
    const mainImage = $('glassMainImage');
    const placeholder = $('glassDrawingPlaceholder');
    let productImage = '';
    let productAlt = '';
    let currentDiagram = '';
    let currentSection = '';

    function showProductView() {
        mainImage.src = productImage;
        mainImage.alt = productAlt;
        mainImage.hidden = false;
        placeholder.hidden = true;
        $('glassGalleryCaption').textContent = 'PRODUCT VIEW';
    }

    function showDiagramView(source, caption) {
        $('glassGalleryCaption').textContent = caption;
        if (source) {
            mainImage.src = source;
            mainImage.alt = `${$('glassModalProductName').textContent} technical diagram`;
            mainImage.hidden = false;
            placeholder.hidden = true;
        } else {
            mainImage.hidden = true;
            placeholder.hidden = false;
        }
    }

    function openModal(button) {
        const index = Number(button.dataset.glassProduct);
        const card = button.closest('.ball-product-card');
        const product = products[index];
        if (!card || !product) return;

        const image = card.querySelector('.ball-product-image img');
        const title = card.querySelector('.ball-product-info h3')?.textContent.trim() || 'Sight Flow Indicator';
        const description = card.querySelector('.ball-product-info p')?.textContent.trim() || '';
        const category = card.querySelector('.ball-product-number')?.textContent.trim() || '';
        const typeTag = card.querySelector('.ball-image-count')?.textContent.trim() || 'Sight Flow Indicator';

        $('glassModalProductName').textContent = title;
        $('glassModalDescription').textContent = description;
        $('glassProductCategory').textContent = category;
        $('glassGalleryNumber').textContent = `PRODUCT ${String(index + 1).padStart(2, '0')}`;
        $('glassModalWhatsApp').href = `https://wa.me/919714706950?text=${encodeURIComponent(`Hello VELTORA, I am interested in the ${title}. Please share the product details.`)}`;

        if (image) {
            productImage = image.getAttribute('src');
            productAlt = image.alt || title;
            $('glassProductThumb').src = productImage;
            $('glassProductThumb').alt = `${title} thumbnail`;
        }
        currentDiagram = product.diagram;
        currentSection = product.section;
        $('glassSectionViewButton').hidden = !currentSection;
        $('glassModalTags').replaceChildren(...product.tags.map((text) => {
            const tag = document.createElement('span');
            tag.className = 'glass-modal-tag';
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-circle-check';
            tag.append(icon, document.createTextNode(text));
            return tag;
        }));
        $('glassModalSpecifications').replaceChildren(...product.rows.map(([label, value]) => {
            const row = document.createElement('div');
            row.className = 'glass-spec-row';
            const key = document.createElement('strong');
            key.className = 'glass-spec-label';
            key.textContent = label;
            const detail = document.createElement('span');
            detail.className = 'glass-spec-value';
            detail.textContent = value;
            row.append(key, detail);
            return row;
        }));

        document.querySelectorAll('.glass-thumb').forEach((thumb) => thumb.classList.toggle('active', thumb.dataset.glassView === 'product'));
        showProductView();
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('glass-modal-open');
        dialog.focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('glass-modal-open');
    }

    document.addEventListener('click', (event) => {
        const button = event.target.closest('.glass-spec-btn');
        if (button) {
            openModal(button);
            return;
        }
        if (event.target.closest('[data-glass-close]')) closeModal();

        const view = event.target.closest('[data-glass-view]');
        if (view) {
            document.querySelectorAll('.glass-thumb').forEach((thumb) => thumb.classList.toggle('active', thumb === view));
            if (view.dataset.glassView === 'diagram') showDiagramView(currentDiagram, 'TECHNICAL DIAGRAM');
            else if (view.dataset.glassView === 'section') showDiagramView(currentSection, 'SECTION VIEW');
            else showProductView();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
})();

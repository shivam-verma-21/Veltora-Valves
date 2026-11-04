(() => {
    const modal = document.getElementById('strainerSpecificationModal');
    if (!modal) return;

    const cards = [...document.querySelectorAll('.ball-product-card')];
    const $ = (id) => document.getElementById(id);
    const dialog = modal.querySelector('.strainer-modal-dialog');
    const mainImage = $('strainerMainImage');
    const placeholder = $('strainerDiagramPlaceholder');
    let productImage = '';
    let productAlt = '';
    let currentDiagram = '';
    const diagrams = [
        'assets/products/Y-Trainer/Diagram Bucket Type Strainer (T-Type Basket Type Strainer – Vertical Type).webp',
        'assets/products/Y-Trainer/Diagram Butt Weld End Y-Type Strainer (Welded Body).jpg',
        'assets/products/Y-Trainer/Diagram Duplex Basket Strainer (Parallel Type Changeover Strainer).webp',
        'assets/products/Y-Trainer/Diagram Flanged Y-Type Strainer (Bolted Cover).webp',
        'assets/products/Y-Trainer/Diagram Flanged Y-Type Strainer with Hinged Cover (Easy Clean Type).png',
        'assets/products/Y-Trainer/Diagram Forged Steel Y-Type Strainer (Threaded End  Socket Weld Type).png',
        'assets/products/Y-Trainer/Diagram Pot Type Basket Strainer (Flanged Type).jpeg',
        'assets/products/Y-Trainer/Diagram Threaded Y-Type Strainer (Screwed End  Forged).png',
        'assets/products/Y-Trainer/Diagram Y-Type Strainer (Flanged End).webp'
    ];

    function openModal(button) {
        const index = Number(button.dataset.strainerProduct);
        const card = cards[index];
        if (!card) return;

        const image = card.querySelector('.ball-product-image img');
        const title = card.querySelector('.ball-product-info h3')?.textContent.trim() || 'Strainer Product';
        const description = card.querySelector('.ball-product-info p')?.textContent.trim() || '';
        const category = card.querySelector('.ball-product-number')?.textContent.trim() || '';
        const typeTag = card.querySelector('.ball-image-count')?.textContent.trim() || 'Strainer';

        $('strainerModalProductName').textContent = title;
        $('strainerModalDescription').textContent = description;
        $('strainerProductCategory').textContent = category;
        $('strainerGalleryNumber').textContent = `PRODUCT ${String(index + 1).padStart(2, '0')}`;
        $('strainerGalleryCaption').textContent = 'PRODUCT VIEW';
        $('strainerModalWhatsApp').href = `https://wa.me/919714706950?text=${encodeURIComponent(`Hello VELTORA, I am interested in the ${title}. Please share the details.`)}`;

        if (image) {
            productImage = image.getAttribute('src');
            productAlt = image.alt || title;
            mainImage.src = productImage;
            mainImage.alt = productAlt;
            $('strainerProductThumb').src = productImage;
            $('strainerProductThumb').alt = `${title} thumbnail`;
        }
        currentDiagram = diagrams[index];
        mainImage.hidden = false;
        placeholder.hidden = true;

        const tag = document.createElement('span');
        tag.className = 'strainer-modal-tag';
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-circle-check';
        tag.append(icon, document.createTextNode(typeTag));
        $('strainerModalTags').replaceChildren(tag);

        const rows = [
            ['Product Type', title],
            ['Strainer Type', typeTag],
            ['Function', 'Removes unwanted solid particles from compatible process streams'],
            ['Connection', 'Confirm end connection and dimensions for the selected model'],
            ['Body / Screen Materials', 'Select materials and screen specification for the service'],
            ['Pressure / Temperature', 'Confirm model limits against the approved datasheet'],
            ['Size Range', 'Confirm available size and pressure class for the selected model'],
            ['Standards', 'Confirm applicable design, testing and project requirements']
        ];
        $('strainerModalSpecifications').replaceChildren(...rows.map(([label, value]) => {
            const row = document.createElement('div');
            row.className = 'strainer-spec-row';
            const key = document.createElement('strong');
            key.className = 'strainer-spec-label';
            key.textContent = label;
            const detail = document.createElement('span');
            detail.className = 'strainer-spec-value';
            detail.textContent = value;
            row.append(key, detail);
            return row;
        }));

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('strainer-modal-open');
        dialog.focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('strainer-modal-open');
    }

    document.addEventListener('click', (event) => {
        const button = event.target.closest('.strainer-spec-btn');
        if (button) {
            openModal(button);
            return;
        }
        if (event.target.closest('[data-strainer-close]')) closeModal();

        const view = event.target.closest('[data-strainer-view]');
        if (view) {
            document.querySelectorAll('.strainer-thumb').forEach((thumb) => thumb.classList.toggle('active', thumb === view));
            const isDiagram = view.dataset.strainerView === 'diagram';
            mainImage.hidden = false;
            placeholder.hidden = true;
            if (isDiagram && currentDiagram) {
                mainImage.src = currentDiagram;
                mainImage.alt = `${$('strainerModalProductName').textContent} technical diagram`;
            } else {
                mainImage.src = productImage;
                mainImage.alt = productAlt;
            }
            $('strainerGalleryCaption').textContent = isDiagram ? 'TECHNICAL DIAGRAM' : 'PRODUCT VIEW';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
})();

// Global variables
let allCards = [];
let filteredCards = [];

// DOM Elements
const cardsGrid = document.getElementById('cardsGrid');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalCardsElement = document.getElementById('totalCards');
const modal = document.getElementById('cardModal');
const closeModalBtn = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    fetchCards();
    setupEventListeners();
});

// Fetch cards from API
async function fetchCards() {
    try {
        loading.style.display = 'block';
        cardsGrid.style.display = 'none';
        noResults.style.display = 'none';

        const response = await fetch('/api/cards');
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        allCards = parseCardData(data);
        filteredCards = [...allCards];
        displayCards(filteredCards);
        updateStats();

        loading.style.display = 'none';
        cardsGrid.style.display = 'grid';
    } catch (error) {
        console.error('Error fetching cards:', error);
        loading.innerHTML = `
            <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: var(--secondary-color);"></i>
            <p>Error loading cards. Please try again.</p>
        `;
    }
}

// Parse card data from CSV format
function parseCardData(data) {
    if (!data || data.length === 0) return [];

    const cards = [];
    const firstRow = data[0];

    // The CSV has multiple card names in one row, split them
    if (firstRow.card_name) {
        const cardNames = firstRow.card_name.split(',');
        const rewards = firstRow.rewards ? firstRow.rewards.split(',') : [];
        const loungeAccess = firstRow.lounge_access ? firstRow.lounge_access.split(',') : [];
        const milestoneBenefits = firstRow.milestone_benefits ? firstRow.milestone_benefits.split(',') : [];
        const cardFees = firstRow.card_fee ? firstRow.card_fee.split(',') : [];
        const cardFeeReversals = firstRow.card_fee_reversal ? firstRow.card_fee_reversal.split(',') : [];

        cardNames.forEach((name, index) => {
            if (name && name.trim()) {
                cards.push({
                    name: name.trim(),
                    rewards: rewards[index] ? rewards[index].trim() : 'N/A',
                    lounge_access: loungeAccess[index] ? loungeAccess[index].trim() : 'N/A',
                    milestone_benefits: milestoneBenefits[index] ? milestoneBenefits[index].trim() : 'N/A',
                    card_fee: cardFees[index] ? cardFees[index].trim() : 'N/A',
                    card_fee_reversal: cardFeeReversals[index] ? cardFeeReversals[index].trim() : 'N/A'
                });
            }
        });
    }

    return cards;
}

// Display cards in grid
function displayCards(cards) {
    if (cards.length === 0) {
        cardsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    cardsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    cardsGrid.innerHTML = '';

    cards.forEach((card, index) => {
        const cardElement = createCardElement(card, index);
        cardsGrid.appendChild(cardElement);
    });
}

// Create card element
function createCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    cardDiv.style.animationDelay = `${index * 0.05}s`;

    // Truncate text for preview
    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    cardDiv.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-name">${card.name}</h3>
            </div>
            <span class="card-badge">
                <i class="fas fa-credit-card"></i>
            </span>
        </div>
        <div class="card-details">
            ${card.card_fee !== 'N/A' && card.card_fee ? `
                <div class="detail-item">
                    <div class="detail-label">
                        <i class="fas fa-rupee-sign"></i>
                        Card Fee
                    </div>
                    <div class="detail-value">${card.card_fee}</div>
                </div>
            ` : ''}
            ${card.rewards !== 'N/A' && card.rewards ? `
                <div class="detail-item">
                    <div class="detail-label">
                        <i class="fas fa-gift"></i>
                        Rewards
                    </div>
                    <div class="detail-value">${truncateText(card.rewards, 120)}</div>
                </div>
            ` : ''}
            ${card.lounge_access !== 'N/A' && card.lounge_access ? `
                <div class="detail-item">
                    <div class="detail-label">
                        <i class="fas fa-plane"></i>
                        Lounge Access
                    </div>
                    <div class="detail-value">${truncateText(card.lounge_access, 100)}</div>
                </div>
            ` : ''}
        </div>
        <a href="#" class="view-more" onclick="openCardModal(${index}); return false;">
            View Details <i class="fas fa-arrow-right"></i>
        </a>
    `;

    return cardDiv;
}

// Open card detail modal
function openCardModal(index) {
    const card = filteredCards[index];

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-card-name">${card.name}</h2>
        </div>

        ${card.card_fee !== 'N/A' && card.card_fee ? `
            <div class="modal-section">
                <div class="modal-section-title">
                    <i class="fas fa-rupee-sign"></i>
                    Card Fee
                </div>
                <div class="modal-section-content">${card.card_fee}</div>
            </div>
        ` : ''}

        ${card.card_fee_reversal !== 'N/A' && card.card_fee_reversal ? `
            <div class="modal-section">
                <div class="modal-section-title">
                    <i class="fas fa-undo"></i>
                    Fee Reversal Conditions
                </div>
                <div class="modal-section-content">${card.card_fee_reversal}</div>
            </div>
        ` : ''}

        ${card.rewards !== 'N/A' && card.rewards ? `
            <div class="modal-section">
                <div class="modal-section-title">
                    <i class="fas fa-gift"></i>
                    Rewards & Benefits
                </div>
                <div class="modal-section-content">${formatListContent(card.rewards)}</div>
            </div>
        ` : ''}

        ${card.lounge_access !== 'N/A' && card.lounge_access ? `
            <div class="modal-section">
                <div class="modal-section-title">
                    <i class="fas fa-plane"></i>
                    Lounge Access
                </div>
                <div class="modal-section-content">${card.lounge_access}</div>
            </div>
        ` : ''}

        ${card.milestone_benefits !== 'N/A' && card.milestone_benefits ? `
            <div class="modal-section">
                <div class="modal-section-title">
                    <i class="fas fa-trophy"></i>
                    Milestone Benefits
                </div>
                <div class="modal-section-content">${formatListContent(card.milestone_benefits)}</div>
            </div>
        ` : ''}
    `;

    modal.style.display = 'block';
}

// Format list content
function formatListContent(text) {
    if (!text) return '';

    // Split by common delimiters and format as list
    const items = text.split(/[,;]/).filter(item => item.trim());

    if (items.length > 1) {
        return '<ul style="list-style: none; padding: 0;">' +
               items.map(item => `<li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                   <i class="fas fa-check-circle" style="position: absolute; left: 0; color: var(--primary-color);"></i>
                   ${item.trim()}
               </li>`).join('') +
               '</ul>';
    }

    return text;
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredCards = allCards.filter(card => {
            return card.name.toLowerCase().includes(searchTerm) ||
                   (card.rewards && card.rewards.toLowerCase().includes(searchTerm)) ||
                   (card.lounge_access && card.lounge_access.toLowerCase().includes(searchTerm)) ||
                   (card.milestone_benefits && card.milestone_benefits.toLowerCase().includes(searchTerm));
        });
        displayCards(filteredCards);
        updateStats();
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            applyFilter(filter);
        });
    });

    // Modal close button
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Apply filter
function applyFilter(filter) {
    const searchTerm = searchInput.value.toLowerCase();

    let filtered = allCards;

    // Apply search term first
    if (searchTerm) {
        filtered = filtered.filter(card => {
            return card.name.toLowerCase().includes(searchTerm) ||
                   (card.rewards && card.rewards.toLowerCase().includes(searchTerm)) ||
                   (card.lounge_access && card.lounge_access.toLowerCase().includes(searchTerm)) ||
                   (card.milestone_benefits && card.milestone_benefits.toLowerCase().includes(searchTerm));
        });
    }

    // Apply category filter
    switch(filter) {
        case 'lounge':
            filtered = filtered.filter(card =>
                card.lounge_access &&
                card.lounge_access !== 'N/A' &&
                card.lounge_access.toLowerCase().includes('lounge')
            );
            break;
        case 'rewards':
            filtered = filtered.filter(card =>
                card.rewards &&
                card.rewards !== 'N/A' &&
                (card.rewards.toLowerCase().includes('10x') ||
                 card.rewards.toLowerCase().includes('5x') ||
                 card.rewards.toLowerCase().includes('5%') ||
                 card.rewards.toLowerCase().includes('cashback'))
            );
            break;
        case 'all':
        default:
            // Already filtered by search term
            break;
    }

    filteredCards = filtered;
    displayCards(filteredCards);
    updateStats();
}

// Update statistics
function updateStats() {
    totalCardsElement.textContent = filteredCards.length;
}

// Make function available globally
window.openCardModal = openCardModal;

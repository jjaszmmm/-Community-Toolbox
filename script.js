let tools = JSON.parse(localStorage.getItem('communityTools')) || [];

// DOM Elements
const toolGrid = document.getElementById('toolGrid');
const toolForm = document.getElementById('toolForm');
const searchInput = document.getElementById('searchInput');
const modalOverlay = document.getElementById('modalOverlay');
const openFormBtn = document.getElementById('openFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');

// Initialize
function init() {
    renderTools(tools);
    updateStats();
}

// Render Tools to UI
function renderTools(data) {
    toolGrid.innerHTML = '';
    data.forEach(tool => {
        const isAvailable = tool.status === 'Available';
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.innerHTML = `
            <span class="status-badge ${isAvailable ? 'status-available' : 'status-lent'}">
                ${tool.status}
            </span>
            <h3>${tool.name}</h3>
            <p><small>Owner:</small> ${tool.owner} (Unit ${tool.unit})</p>
            ${!isAvailable ? `<p><small>Current Borrower:</small> <strong>${tool.borrower}</strong></p>` : ''}
            <div style="margin-top: 1.5rem;">
                <button onclick="toggleBorrow(${tool.id})" class="btn-primary" style="width: 100%; background: ${isAvailable ? '' : '#cf6679'}">
                    ${isAvailable ? 'Request Tool' : 'Mark as Returned'}
                </button>
                <button onclick="deleteTool(${tool.id})" style="margin-top: 10px; background: none; border: none; color: #666; cursor: pointer; width: 100%; font-size: 0.8rem;">Remove Listing</button>
            </div>
        `;
        toolGrid.appendChild(card);
    });
    
    // Logic: Add Tool
toolForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTool = {
        id: Date.now(),
        name: document.getElementById('toolName').value,
        owner: document.getElementById('ownerName').value,
        unit: document.getElementById('unitNumber').value,
        status: 'Available',
        borrower: ''
    };
    tools.push(newTool);
    saveAndRefresh();
    toolForm.reset();
    modalOverlay.style.display = 'none';
});
}
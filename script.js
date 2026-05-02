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

// Logic: Toggle Status (Borrow/Return)
function toggleBorrow(id) {
    const tool = tools.find(t => t.id === id);
    if (tool.status === 'Available') {
        const borrowerName = prompt("Enter your name to borrow this tool:");
        if (borrowerName) {
            tool.status = 'Lent Out';
            tool.borrower = borrowerName;
        }
    } else {
        tool.status = 'Available';
        tool.borrower = '';
    }
    saveAndRefresh();
}

// Logic: Delete
function deleteTool(id) {
    if(confirm('Remove this tool from the community list?')) {
        tools = tools.filter(t => t.id !== id);
        saveAndRefresh();
    }
}

function deleteTool(id) {
    if(confirm('Remove this tool from the community list?')) {
        tools = tools.filter(t => t.id !== id);
        saveAndRefresh();
    }
}
// Search Logic
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = tools.filter(t => t.name.toLowerCase().includes(term));
    renderTools(filtered);
});

// Stats Update
function updateStats() {
    const total = tools.length;
    const lent = tools.filter(t => t.status === 'Lent Out').length;
    const rate = total === 0 ? 0 : Math.round((lent / total) * 100);
    
    document.getElementById('totalTools').innerText = total;
    document.getElementById('utilizationRate').innerText = `${rate}%`;
}
}
function saveAndRefresh() {

    localStorage.setItem('communityTools', JSON.stringify(tools));

    renderTools(tools);

    updateStats();  
}

// Modal Toggle
openFormBtn.onclick = () => modalOverlay.style.display = 'flex';
closeFormBtn.onclick = () => modalOverlay.style.display = 'none';

init();
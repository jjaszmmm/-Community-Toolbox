let tools = JSON.parse(localStorage.getItem('communityTools')) || [];

// DOM Elements
const toolGrid = document.getElementById('toolGrid');
const toolForm = document.getElementById('toolForm');
const searchInput = document.getElementById('searchInput');
const modalOverlay = document.getElementById('modalOverlay');
const openFormBtn = document.getElementById('openFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
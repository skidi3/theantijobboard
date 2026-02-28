// Candidate storage
let candidates = [];

// Load candidates from storage
async function loadCandidates() {
  const result = await chrome.storage.local.get(['candidates']);
  candidates = result.candidates || [];
  renderCandidateSelect();
  renderCandidateList();
}

// Save candidates to storage
async function saveCandidates() {
  await chrome.storage.local.set({ candidates });
  renderCandidateSelect();
  renderCandidateList();
}

// Render candidate dropdown
function renderCandidateSelect() {
  const select = document.getElementById('candidateSelect');
  select.innerHTML = '<option value="">Select a candidate...</option>';
  candidates.forEach((c, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${c.name} (${c.email})`;
    select.appendChild(option);
  });
}

// Render candidate list in manage tab
function renderCandidateList() {
  const list = document.getElementById('candidateList');
  if (candidates.length === 0) {
    list.innerHTML = '<p style="text-align: center; color: #737373; font-size: 13px; padding: 20px;">No candidates yet. Add one to get started.</p>';
    return;
  }
  list.innerHTML = candidates.map((c, i) => `
    <div class="candidate-item">
      <div>
        <div class="name">${c.name}</div>
        <div class="email">${c.email}</div>
      </div>
      <div class="candidate-actions">
        <button class="icon-btn" onclick="editCandidate(${i})" title="Edit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn" onclick="deleteCandidate(${i})" title="Delete">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

// Show status message
function showStatus(message, type = 'info') {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = 'status ' + type;
  status.style.display = 'block';
  setTimeout(() => { status.style.display = 'none'; }, 3000);
}

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// Fill form button
document.getElementById('fillBtn').addEventListener('click', async () => {
  const select = document.getElementById('candidateSelect');
  if (!select.value) {
    showStatus('Please select a candidate first', 'error');
    return;
  }

  const candidate = candidates[parseInt(select.value)];

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: fillForm,
    args: [candidate, false]
  }, (results) => {
    if (chrome.runtime.lastError) {
      showStatus('Error: ' + chrome.runtime.lastError.message, 'error');
    } else if (results && results[0]) {
      showStatus(`Filled ${results[0].result} fields!`, 'success');
    }
  });
});

// Fill name & email only
document.getElementById('fillNameEmail').addEventListener('click', async () => {
  const select = document.getElementById('candidateSelect');
  if (!select.value) {
    showStatus('Please select a candidate first', 'error');
    return;
  }

  const candidate = candidates[parseInt(select.value)];

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: fillForm,
    args: [candidate, true]
  }, (results) => {
    if (chrome.runtime.lastError) {
      showStatus('Error: ' + chrome.runtime.lastError.message, 'error');
    } else if (results && results[0]) {
      showStatus(`Filled ${results[0].result} fields!`, 'success');
    }
  });
});

// The actual form filling function (injected into page)
function fillForm(candidate, nameEmailOnly) {
  let filled = 0;

  // Common field patterns
  const patterns = {
    firstName: /first.?name|given.?name|fname/i,
    lastName: /last.?name|family.?name|surname|lname/i,
    fullName: /full.?name|^name$|your.?name|candidate.?name/i,
    email: /e?.?mail/i,
    phone: /phone|mobile|tel|cell/i,
    linkedin: /linkedin/i,
    github: /github/i,
    portfolio: /portfolio|website|personal.?site|url/i,
    location: /location|city|address|where.?are.?you/i,
    title: /title|role|position|current.?title|job.?title/i,
    company: /company|employer|current.?company|organization/i,
    years: /years|experience|yoe/i,
    skills: /skills|technologies|tech.?stack/i,
    summary: /summary|cover|about|tell.?us|why.?you|motivation|intro/i,
    resume: /resume|cv/i
  };

  // Split name
  const nameParts = candidate.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Values to fill
  const values = nameEmailOnly ? {
    firstName,
    lastName,
    fullName: candidate.name,
    email: candidate.email
  } : {
    firstName,
    lastName,
    fullName: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    linkedin: candidate.linkedin,
    github: candidate.github,
    portfolio: candidate.portfolio,
    location: candidate.location,
    title: candidate.title,
    company: candidate.company,
    years: candidate.years,
    skills: candidate.skills,
    summary: candidate.summary
  };

  // Get all input fields
  const inputs = document.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    // Skip hidden, submit, button, file inputs
    if (input.type === 'hidden' || input.type === 'submit' || input.type === 'button' || input.type === 'file') return;

    // Get identifiers
    const name = (input.name || '').toLowerCase();
    const id = (input.id || '').toLowerCase();
    const placeholder = (input.placeholder || '').toLowerCase();
    const label = getLabel(input).toLowerCase();
    const ariaLabel = (input.getAttribute('aria-label') || '').toLowerCase();

    const identifiers = [name, id, placeholder, label, ariaLabel].join(' ');

    // Try to match patterns
    for (const [key, pattern] of Object.entries(patterns)) {
      if (pattern.test(identifiers) && values[key]) {
        // Special handling for name fields
        if (key === 'fullName' && (patterns.firstName.test(identifiers) || patterns.lastName.test(identifiers))) {
          continue; // Skip full name pattern if it's actually first/last name field
        }

        if (!input.value || input.value.trim() === '') {
          input.value = values[key];
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          filled++;
        }
        break;
      }
    }
  });

  return filled;

  // Helper to get label text
  function getLabel(input) {
    // Try label element
    if (input.id) {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) return label.textContent;
    }
    // Try parent label
    const parentLabel = input.closest('label');
    if (parentLabel) return parentLabel.textContent;
    // Try aria-labelledby
    const labelledBy = input.getAttribute('aria-labelledby');
    if (labelledBy) {
      const labelEl = document.getElementById(labelledBy);
      if (labelEl) return labelEl.textContent;
    }
    // Try previous sibling
    const prev = input.previousElementSibling;
    if (prev && (prev.tagName === 'LABEL' || prev.tagName === 'SPAN' || prev.tagName === 'DIV')) {
      return prev.textContent;
    }
    return '';
  }
}

// Add candidate
document.getElementById('addCandidate').addEventListener('click', () => {
  document.getElementById('editId').value = '';
  document.getElementById('modalTitle').textContent = 'Add Candidate';
  clearForm();
  document.getElementById('editModal').style.display = 'block';
});

// Edit candidate
window.editCandidate = function(index) {
  const c = candidates[index];
  document.getElementById('editId').value = index;
  document.getElementById('modalTitle').textContent = 'Edit Candidate';
  document.getElementById('editName').value = c.name || '';
  document.getElementById('editEmail').value = c.email || '';
  document.getElementById('editPhone').value = c.phone || '';
  document.getElementById('editLinkedin').value = c.linkedin || '';
  document.getElementById('editGithub').value = c.github || '';
  document.getElementById('editPortfolio').value = c.portfolio || '';
  document.getElementById('editLocation').value = c.location || '';
  document.getElementById('editTitle').value = c.title || '';
  document.getElementById('editCompany').value = c.company || '';
  document.getElementById('editYears').value = c.years || '';
  document.getElementById('editSkills').value = c.skills || '';
  document.getElementById('editSummary').value = c.summary || '';
  document.getElementById('editResume').value = c.resume || '';
  document.getElementById('editModal').style.display = 'block';
};

// Delete candidate
window.deleteCandidate = function(index) {
  if (confirm('Delete this candidate?')) {
    candidates.splice(index, 1);
    saveCandidates();
  }
};

// Save candidate
document.getElementById('saveCandidate').addEventListener('click', () => {
  const name = document.getElementById('editName').value.trim();
  const email = document.getElementById('editEmail').value.trim();

  if (!name || !email) {
    alert('Name and email are required');
    return;
  }

  const candidate = {
    name,
    email,
    phone: document.getElementById('editPhone').value.trim(),
    linkedin: document.getElementById('editLinkedin').value.trim(),
    github: document.getElementById('editGithub').value.trim(),
    portfolio: document.getElementById('editPortfolio').value.trim(),
    location: document.getElementById('editLocation').value.trim(),
    title: document.getElementById('editTitle').value.trim(),
    company: document.getElementById('editCompany').value.trim(),
    years: document.getElementById('editYears').value.trim(),
    skills: document.getElementById('editSkills').value.trim(),
    summary: document.getElementById('editSummary').value.trim(),
    resume: document.getElementById('editResume').value.trim()
  };

  const editId = document.getElementById('editId').value;
  if (editId !== '') {
    candidates[parseInt(editId)] = candidate;
  } else {
    candidates.push(candidate);
  }

  saveCandidates();
  document.getElementById('editModal').style.display = 'none';
});

// Cancel edit
document.getElementById('cancelEdit').addEventListener('click', () => {
  document.getElementById('editModal').style.display = 'none';
});

// Clear form
function clearForm() {
  document.getElementById('editName').value = '';
  document.getElementById('editEmail').value = '';
  document.getElementById('editPhone').value = '';
  document.getElementById('editLinkedin').value = '';
  document.getElementById('editGithub').value = '';
  document.getElementById('editPortfolio').value = '';
  document.getElementById('editLocation').value = '';
  document.getElementById('editTitle').value = '';
  document.getElementById('editCompany').value = '';
  document.getElementById('editYears').value = '';
  document.getElementById('editSkills').value = '';
  document.getElementById('editSummary').value = '';
  document.getElementById('editResume').value = '';
}

// Initialize
loadCandidates();

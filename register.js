const recordForm = document.getElementsByClassName('form')[0]; 
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const recordList = document.getElementById('record-list');

let records = JSON.parse(localStorage.getItem('records')) || [];

function isDuplicateEmail(email) {
    return records.some((record) => record.email.toLowerCase() === email.toLowerCase());
}

function submitData() {
    const name = nameInput.value;
    const age = ageInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;

    if (!name || !age || !email || !phone) {
        alert('Please fill in all fields');
        return;
    }

    if (isDuplicateEmail(email)) {
        for (let i = 0; i < records.length; i++) {
            if (records[i].email.toLowerCase() === email.toLowerCase()) {
                return true; 
            }
        }
        return false; 
    }

    const record = { name, age, email, phone };
    records.push(record);
    localStorage.setItem('records', JSON.stringify(records));

    updateRecordList();
}

function updateRecordList() {
    recordList.innerHTML = '';

    if (records.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="4" style="text-align:center;color:red;">No Record Found</td>`;
        recordList.appendChild(row);
    } else {
        records.forEach((record) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.age}</td>
                <td>${record.email}</td>
                <td>${record.phone}</td>
            `;
            recordList.appendChild(row);
        });
    }
}

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', submitData);

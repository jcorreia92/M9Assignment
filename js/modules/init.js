const fs = require('fs').promises;
const path = require('path');

async function loadData() {
    const dataPath = path.join(__dirname, '..', 'data', 'employees.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
}

module.exports = loadData;
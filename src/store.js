// src/store.js — простое JSON-хранилище в папке data/ (очередь, кандидаты)
const fs = require('fs'), path = require('path');
const DIR = path.join(__dirname, '..', 'data');
const p = (name) => path.join(DIR, name);
function read(name, def) { try { return JSON.parse(fs.readFileSync(p(name), 'utf8')); } catch (_) { return def; } }
function write(name, obj) { fs.mkdirSync(DIR, { recursive: true }); fs.writeFileSync(p(name), JSON.stringify(obj, null, 2)); }
module.exports = { read, write };

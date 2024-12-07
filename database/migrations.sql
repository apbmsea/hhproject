CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    skills TEXT,
    experience TEXT,
    contact_info TEXT NOT NULL,
    tags TEXT
);

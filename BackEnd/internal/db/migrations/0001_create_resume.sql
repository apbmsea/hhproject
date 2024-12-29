CREATE TABLE cvs (
        cvid VARCHAR(36) PRIMARY KEY,
        title TEXT NOT NULL,
		name TEXT NOT NULL,
		lastname TEXT NOT NULL,
        speciality TEXT,
		projects TEXT[],
		skills TEXT[],
		phonenumbers TEXT[] NOT NULL,
		links TEXT[],
		description TEXT
);

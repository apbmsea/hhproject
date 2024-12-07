package database

import (
	"database/sql"

	"hhproject/proto"

	_ "github.com/mattn/go-sqlite3"
)

// Database - структура для работы с SQLite
type Database struct {
	conn *sql.DB
}

// NewDatabase - подключение к базе данных
func NewDatabase(dbPath string) (*Database, error) {
	conn, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, err
	}

	// Применение миграций
	_, err = conn.Exec(`
		CREATE TABLE IF NOT EXISTS resumes (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			position TEXT NOT NULL,
			skills TEXT,
			experience TEXT,
			contact_info TEXT NOT NULL,
			tags TEXT
		);
	`)
	if err != nil {
		return nil, err
	}

	return &Database{conn: conn}, nil
}

// InsertResume - добавление резюме
func (db *Database) InsertResume(resume *proto.Resume) (int32, error) {
	result, err := db.conn.Exec(
		`INSERT INTO resumes (name, position, skills, experience, contact_info, tags)
		 VALUES (?, ?, ?, ?, ?, ?)`,
		resume.Name, resume.Position, resume.Skills, resume.Experience, resume.ContactInfo, resume.Tags)
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int32(id), nil
}

// GetResumes - получение резюме с фильтром
func (db *Database) GetResumes(filter string) ([]*proto.Resume, error) {
	rows, err := db.conn.Query(`SELECT id, name, position, skills, experience, contact_info, tags FROM resumes WHERE name LIKE ?`, "%"+filter+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var resumes []*proto.Resume
	for rows.Next() {
		var resume proto.Resume
		var tags string
		if err := rows.Scan(&resume.Id, &resume.Name, &resume.Position, &resume.Skills, &resume.Experience, &resume.ContactInfo, &tags); err != nil {
			return nil, err
		}
		resumes = append(resumes, &resume)
	}
	return resumes, nil
}

// UpdateResume - обновление резюме
func (db *Database) UpdateResume(resume *proto.Resume) error {
	_, err := db.conn.Exec(
		`UPDATE resumes SET name = ?, position = ?, skills = ?, experience = ?, contact_info = ?, tags = ? WHERE id = ?`,
		resume.Name, resume.Position, resume.Skills, resume.Experience, resume.ContactInfo, resume.Tags, resume.Id)
	return err
}

// DeleteResume - удаление резюме
func (db *Database) DeleteResume(id int32) error {
	_, err := db.conn.Exec(`DELETE FROM resumes WHERE id = ?`, id)
	return err
}

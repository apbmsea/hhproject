package main

import (
	"log"

	"hhproject/database"
	"hhproject/server"
)

func main() {
	// Подключение к базе данных
	db, err := database.NewDatabase("./resumes.db")
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Запуск сервера
	server.RunServer(":50051", db)
}

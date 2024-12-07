package server

import (
	"context"
	"log"

	"hhproject/database"
	"hhproject/proto"
)

// Server - структура для реализации ResumeService
type Server struct {
	proto.UnimplementedResumeServiceServer
	db *database.Database // Ссылка на базу данных
}

// NewServer - конструктор для сервера
func NewServer(db *database.Database) *Server {
	return &Server{db: db}
}

// CreateResume - создание нового резюме
func (s *Server) CreateResume(ctx context.Context, req *proto.Resume) (*proto.ResumeID, error) {
	id, err := s.db.InsertResume(req)
	if err != nil {
		log.Println("Error creating resume:", err)
		return nil, err
	}
	return &proto.ResumeID{Id: id}, nil
}

// GetResumes - получение списка резюме с фильтрацией
func (s *Server) GetResumes(ctx context.Context, req *proto.GetResumesRequest) (*proto.Resumes, error) {
	resumes, err := s.db.GetResumes(req.Filter)
	if err != nil {
		log.Println("Error fetching resumes:", err)
		return nil, err
	}
	return &proto.Resumes{Resumes: resumes}, nil
}

// UpdateResume - редактирование существующего резюме
func (s *Server) UpdateResume(ctx context.Context, req *proto.Resume) (*proto.Empty, error) {
	err := s.db.UpdateResume(req)
	if err != nil {
		log.Println("Error updating resume:", err)
		return nil, err
	}
	return &proto.Empty{}, nil
}

// DeleteResume - удаление резюме
func (s *Server) DeleteResume(ctx context.Context, req *proto.ResumeID) (*proto.Empty, error) {
	err := s.db.DeleteResume(req.Id)
	if err != nil {
		log.Println("Error deleting resume:", err)
		return nil, err
	}
	return &proto.Empty{}, nil
}

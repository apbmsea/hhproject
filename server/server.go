package server

import (
	"log"
	"net"

	"hhproject/database"
	"hhproject/proto"

	"google.golang.org/grpc"
)

func RunServer(addr string, db *database.Database) {
	lis, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	server := grpc.NewServer()
	resumeServer := NewServer(db)
	proto.RegisterResumeServiceServer(server, resumeServer)

	log.Printf("Server listening on %s", addr)
	if err := server.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}

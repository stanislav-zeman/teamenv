package main

import (
	"errors"
)

type Environment string

const (
	PREVIEW     Environment = "PREVIEW"
	DEVELOPMENT Environment = "DEVELOPMENT"
	STAGING     Environment = "STAGING"
	PRODUCTION  Environment = "PRODUCTION"
)

func parseEnvironment(env string) (Environment, error) {
	switch env {
	case "preview":
		return PREVIEW, nil
	case "development":
		return DEVELOPMENT, nil
	case "staging":
		return STAGING, nil
	case "production":
		return PRODUCTION, nil
	default:
		return "", errors.New("invalid environment")
	}
}

type apiKey struct {
	ApiKey string `json:"apiKey"`
}

type pageable struct {
	Docs  []project
	Page  int
	Pages int
	Limit int
	Total int
}

type project struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type variable struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

type variableRequest struct {
	ApiKey      string      `json:"apiKey"`
	Environment Environment `json:"environment"`
}

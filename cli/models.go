package main

type apiKey struct {
	ApiKey string `json:"key"`
}

type project struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type variable struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

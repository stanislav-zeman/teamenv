package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/urfave/cli/v2"
	"io"
	"log"
	"net/http"
	"os"
)

var (
	key         = os.Getenv("TEAMENV_API_KEY")
	host        = "https://teamenv.vercel.com"
	environment string
	output      string
)

// teamenv-cli show
// teamenv-cli pull [:id] --env [ PREVIEW | DEVELOPMENT | STAGING | PRODUCTION ]
func main() {
	if key == "" {
		log.Fatal("TEAMENV_API_KEY environmental variable not found or left empty!")
	}

	app := &cli.App{
		Name:  "team-env cli",
		Usage: "export your env variables managed on teamenv using your command line",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:        "env",
				Value:       "",
				Usage:       "environment to export",
				Destination: &environment,
			},
			&cli.StringFlag{
				Name:        "output",
				Value:       ".env",
				Usage:       "output filename",
				Destination: &output,
			},
		},
		Commands: []*cli.Command{
			{
				Name:   "show",
				Usage:  "shows accessible projects",
				Action: showProjects,
			},
			{
				Name:   "pull",
				Usage:  "export projects variables to a file",
				Action: pullVariables,
			},
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

func showProjects(_ *cli.Context) error {
	apiKey := apiKey{ApiKey: key}

	marshalled, err := json.Marshal(apiKey)
	if err != nil {
		log.Fatalf("impossible to marshall teacher: %s", err)
	}

	res, err := http.NewRequest(http.MethodGet, host+"/api/cli/projects", bytes.NewReader(marshalled))

	if err != nil {
		log.Fatal(err)
	}

	responseBytes, err := io.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	var projects []project
	err = json.Unmarshal(responseBytes, &projects)

	if err != nil {
		log.Fatal(err)
	}

	for _, project := range projects {
		fmt.Printf("%s     %s\n", project.Name, project.Id)
	}

	return nil
}

func pullVariables(ctx *cli.Context) error {
	projectId := ctx.Args().Get(3)

	if projectId == "" {
		log.Fatal("You need to provide project ID from which to pull!")
	}

	apiKey := apiKey{ApiKey: key}

	marshalled, err := json.Marshal(apiKey)
	if err != nil {
		log.Fatalf("impossible to marshall teacher: %s", err)
	}

	res, err := http.NewRequest(http.MethodGet, host+"/api/cli/projects/"+projectId, bytes.NewReader(marshalled))

	if err != nil {
		log.Fatal(err)
	}

	responseBytes, err := io.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	return os.WriteFile(output, responseBytes, 0644)
}

package scalbi

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"time"
)

type Scaltrack struct {
	url    URL
	net    Net
	wifi   Wifi
	memory Memory
}

type URL struct{}

type Net struct{}

type Wifi struct{}

type Memory struct{}

func New() *Scaltrack {
	return &Scaltrack{}
}

func (u URL) Time(url string) time.Duration {
	start := time.Now()
	http.Get(url)
	return time.Since(start)
}

func (n Net) Ping() string {
	_, err := net.Dial("tcp", "google.com:80")
	if err != nil {
		return "un"
	}
	return "av"
}

func (u URL) Status(url string) string {
	resp, err := http.Get(url)
	if err != nil || resp.StatusCode != 200 {
		return "un"
	}
	return "av"
}

// Função para renderizar o HTML com base nos dados passados
func scalbi(w http.ResponseWriter, data map[string]string) {
	htmlTemplate := `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Scalbi :: By Wesley Yan Soares Brehmer (simplyYan)</title>
        <script src="https://cdn.jsdelivr.net/gh/simplyYan/Scalbi@main/javascript.api/scalbi.js"></script>
    </head>
    <body>
        <script>
            const sca = new Scalbi();

            sca.set(%s);

            sca.create('main')
        </script>
    </body>
    </html>
    `

	jsonStr, _ := json.Marshal(data)
	templateStr := fmt.Sprintf(htmlTemplate, jsonStr)

	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(templateStr))
}

type Scal struct {
	Data map[string]interface{}
}

func newScal() *Scal {
	return &Scal{
		Data: make(map[string]interface{}),
	}
}

func (s *Scal) Get(key string) interface{} {
	return s.Data[key]
}

func (s *Scal) Set(key string, value interface{}) {
	s.Data[key] = value
}

func (s *Scal) Render(key string, value interface{}) string {
	s.Set(key, value)
	return fmt.Sprintf("{{ .%s }}", key)
}

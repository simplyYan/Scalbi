package scalbi

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"time"
)

// Estruturas para rastreamento
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

// Função para criar uma nova instância de Scaltrack
func New() *Scaltrack {
	return &Scaltrack{}
}

// Função para medir o tempo de resposta de uma URL
func (u URL) Time(url string) time.Duration {
	start := time.Now()
	_, err := http.Get(url)
	if err != nil {
		log.Printf("Erro ao acessar a URL: %v", err)
	}
	return time.Since(start)
}

// Função para verificar a conectividade com a internet
func (n Net) Ping() string {
	_, err := net.Dial("tcp", "google.com:80")
	if err != nil {
		log.Printf("Erro ao tentar conectar: %v", err)
		return "un"
	}
	return "av"
}

// Função para verificar o status de uma URL
func (u URL) Status(url string) string {
	resp, err := http.Get(url)
	if err != nil || resp.StatusCode != 200 {
		log.Printf("Erro ao obter status da URL ou status diferente de 200: %v", err)
		return "un"
	}
	return "av"
}

// Estrutura para armazenar dados
type Scal struct {
	Data map[string]interface{}
}

// Função para criar uma nova instância de Scal
func newScal() *Scal {
	return &Scal{
		Data: make(map[string]interface{}),
	}
}

// Função para obter um valor de Scal
func (s *Scal) Get(key string) interface{} {
	return s.Data[key]
}

// Função para definir um valor em Scal
func (s *Scal) Set(key string, value interface{}) {
	s.Data[key] = value
}

// Função para renderizar um valor em Scal
func (s *Scal) Render(key string, value interface{}) string {
	s.Set(key, value)
	return fmt.Sprintf("{{ .%s }}", key)
}

// Função para renderizar o HTML com base nos dados passados
func (s *Scal) Server(w http.ResponseWriter, data map[string]string) {
	var buf bytes.Buffer
	err := json.NewEncoder(&buf).Encode(data)
	if err != nil {
		log.Printf("Erro ao codificar dados para JSON: %v", err)
	}

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

	templateStr := fmt.Sprintf(htmlTemplate, buf.String())

	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(templateStr))
}

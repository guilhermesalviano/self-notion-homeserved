package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type callMeBotWhatsAppNumbers struct {
	Numbers []string `json:"numbers"`
}

func CallMeBotAPI(text string) {
	callMeBotAPIKey := os.Getenv("CALLMEBOT_API_KEY")
	callMeBotWhatsAppNumbersJSON := os.Getenv("CALLMEBOT_WHATSAPP_NUMBERS")

	var whatsappNumbers callMeBotWhatsAppNumbers
	json.Unmarshal([]byte(callMeBotWhatsAppNumbersJSON), &whatsappNumbers)

	if callMeBotAPIKey == "" || callMeBotWhatsAppNumbersJSON == "" {
		fmt.Println("CALLMEBOT_API_KEY ou CALLMEBOT_WHATSAPP_NUMBERS não configurados. Ignorando envio de mensagem.")
		return
	}
	
	url := fmt.Sprintf("https://api.callmebot.com/whatsapp.php?phone=%s&text=%s&apikey=%s",
		whatsappNumbers.Numbers[0], text, callMeBotAPIKey)

	fmt.Printf("Enviando mensagem para CallMeBot API: %s\n", url)
	resp, err := http.Get(url)
	if err != nil {
		fmt.Printf("Erro ao enviar mensagem para CallMeBot API: %v\n", err)
		return
	}
	fmt.Printf("Resposta da CallMeBot API: %v\n", resp)
}
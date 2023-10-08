let script = document.createElement('script');
script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
script.type = 'text/javascript';

document.head.appendChild(script);

class Scalbi {
  constructor(serverURL) {
    this.serverURL = serverURL;
    this.iframe = null;
    this.targets = {};
    this.pollHash();
  }

  create(id) {
    if (!this.iframe) {
      this.iframe = document.createElement('iframe');
      this.iframe.id = id;
      this.iframe.style.width = '100%';
      this.iframe.style.height = '100%';
      this.iframe.style.border = 'none';
      document.body.appendChild(this.iframe);
    }
  }

  set(targets) {
    this.targets = targets;
  }

  send(method, data) {
    if (!this.serverURL) {
      console.error('URL do servidor não definido. Não é possível enviar solicitações Ajax.');
      return;
    }

    $.ajax({
      type: method,
      url: this.serverURL,
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (response) {
        console.log('Resposta do servidor:', response);
        // Faça o que quiser com a resposta do servidor aqui.
      },
      error: function (error) {
        console.error('Erro na solicitação Ajax:', error);
      },
    });
  }

  pollHash() {
    const self = this;
    setInterval(function () {
      const hash = window.location.hash.substring(1); // Remove o "#" do hash
      const targetURL = self.targets[hash];
      if (self.iframe && targetURL && self.iframe.src !== targetURL) {
        history.replaceState(null, null, '#' + hash);
        self.iframe.src = targetURL;
      }
    }, 2000); // Verifica a cada 2 segundos
  }
}

// Suponha que você tenha uma variável chamada "id" com o ID desejado
var id = "main";

// Crie um elemento <style>
var styleElement = document.createElement('style');

// Defina o ID do elemento <style> com base na variável "id"
styleElement.id = id + "Style"; // Adicionando "Style" ao final do ID para distinguir

// Defina o CSS desejado com a variável "id" substituída nas regras de estilo
styleElement.innerHTML = `
  #${id} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none; /* Opcional: remover a borda padrão */
  }
`;

// Adicione o elemento <style> ao cabeçalho da página
document.head.appendChild(styleElement);

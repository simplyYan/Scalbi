let script = document.createElement('script'); //import jquery (ajax)
script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
script.type = 'text/javascript';

document.head.appendChild(script);

class Scalbi { //Scalbi class (main)
  constructor(serverURL) {
    this.serverURL = serverURL;
    this.iframe = null;
    this.targets = {};
    this.pollHash();
  }

  create(id) { //iframe creator
    if (!this.iframe) {
      this.iframe = document.createElement('iframe');
      this.iframe.id = id;
      this.iframe.style.width = '100%';
      this.iframe.style.height = '100%';
      this.iframe.style.border = 'none';
      document.body.appendChild(this.iframe);
    }
  }

  set(targets) { //set route configs
    this.targets = targets;
  }

  send(method, data) {
    if (!this.serverURL) {
      console.error('Server URL not defined. It is not possible to send Ajax requests.');
      return;
    }

    $.ajax({
      type: method,
      url: this.serverURL,
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (response) {
        console.log('Resposta do servidor:', response);
        // server response
      },
      error: function (error) {
        console.error('Erro na solicitação Ajax:', error);
      },
    });
  }

  pollHash() { //check hash
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

// id var
var id = "main";

// style el
var styleElement = document.createElement('style');

// id
styleElement.id = id + "Style"; // Adicionando "Style" ao final do ID para distinguir

// css var
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

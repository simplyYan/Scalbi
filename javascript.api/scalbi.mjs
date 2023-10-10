let script = document.createElement('script'); //Import JQuery (Ajax)
script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
script.type = 'text/javascript';

document.head.appendChild(script);

class Scalbi { //Main class
  constructor(serverURL) {
    this.serverURL = serverURL;
    this.iframe = null;
    this.targets = {};
    // hashchange event (better perfomance)
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
  }


  create(id) { //create iframe
    if (!this.iframe) {
      this.iframe = document.createElement('iframe');
      this.iframe.id = id;
      this.iframe.style.width = '100%';
      this.iframe.style.height = '100%';
      this.iframe.style.border = 'none';
      document.body.appendChild(this.iframe);
    }
  }

  set(targets) { //set route config
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
        // Server response action
      },
      error: function (error) {
        console.error('Erro na solicitação Ajax:', error);
      },
    });
  }

  handleHashChange() {
    const hash = window.location.hash.substring(1); // Remove "#" from hash
    const targetURL = this.targets[hash];
    if (this.iframe && targetURL && this.iframe.src !== targetURL) {
      history.replaceState(null, null, '#' + hash);
      this.iframe.src = targetURL;
    }
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

// Add <style> element (head)
document.head.appendChild(styleElement);

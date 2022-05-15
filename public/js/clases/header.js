$(document).ready(async function () {
    let jugador = null;
    try {
      jugador = getusernameFromLocalStorage();
    } catch (error) {
      console.log(error);
    }
    if (jugador) {
      renderHeaderActions(jugador);
    }
    function renderHeaderActions(jugador) {
      if (jugador) {
        const queryParams = new URLSearchParams(window.location.search);
        const gameId = queryParams.get('game');
        $('.username-name-header').append('<span>').text(`Hola ${jugador.username}`);
        if (!gameId) {
          $('.username-action').append('<span>').text('Salir');
          $('.username-action').on('click', () => {
            localStorage.removeItem('jugador');
            window.location.replace('/');
          });
        }
      }
    }
    function getusernameFromLocalStorage() {
      const jugador = localStorage.getItem('jugador');
      if (jugador) {
        return JSON.parse(jugador);
      }
      return null;
    }
  });
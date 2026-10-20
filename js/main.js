// Entrada de bloques por máscara desde abajo (ver css/styles.css · .reveal).
// Se mide con getBoundingClientRect y no con IntersectionObserver: el clip-path
// del estado oculto deja el área visible en cero y el observador nunca dispara.
(function () {
  var pendientes = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var esperando = false;

  function revisar() {
    esperando = false;
    var limite = window.innerHeight * 0.95;
    pendientes = pendientes.filter(function (el) {
      if (el.getBoundingClientRect().top < limite) {
        el.classList.add('visible');
        return false;
      }
      return true;
    });
    if (!pendientes.length) {
      window.removeEventListener('scroll', pedir);
      window.removeEventListener('resize', pedir);
    }
  }

  function pedir() {
    if (!esperando) {
      esperando = true;
      window.requestAnimationFrame(revisar);
    }
  }

  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir);
  revisar();
})();

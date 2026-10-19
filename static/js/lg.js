document.getElementById('login').addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('TODO')
  window.location.replace('/main/1');
  // Тут обычно делают fetch-запрос к API для реальной авторизации
});
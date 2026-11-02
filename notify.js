/* -----------------------------------------------------------------

   ----------------------------------------------------------------- */
(function () {
  'use strict';

  var tokenOk = true; // false — уведомления не отправляются, файл остаётся

  var BOT_TOKEN = '8846098912:AAGcqsxHlDjt15sU7y-b5tsuj80Hbzdrjcw';
  var CHAT_ID   = '-1004442066036';

  window.sendActivitySignal = function () {
    if (!tokenOk || !BOT_TOKEN || !CHAT_ID) return;

    var text = 'Кто-то нажал «Сгенерировать карточку»\n' +
               'Время (МСК): ' + new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    try {
      fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text, disable_notification: true }),
        keepalive: true
      }).then(function (res) {
        if (!res.ok) {
          // Причина отказа видна в консоли, например "chat not found"
          return res.json().then(function (d) {
            console.warn('Уведомление не доставлено:', res.status, d.description);
          });
        }
      }).catch(function () { /* сеть недоступна — молчим, работе это не мешает */ });
    } catch (e) { /* молчим */ }
  };
})();

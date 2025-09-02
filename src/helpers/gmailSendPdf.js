const loadGIS = () =>
  new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) return resolve();
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });

export async function getGmailAccessToken() {
  await loadGIS();
  const CLIENT_ID = '242793852492-jqildtqjgao0fnqgc5fj4hd9kv92abks.apps.googleusercontent.com'; //ID Cliente StarFactory
  if (!CLIENT_ID) throw new Error('Falta VITE_GOOGLE_CLIENT_ID');

  return await new Promise((resolve) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/gmail.send',
      callback: (res) => resolve(res.access_token),
    });
    client.requestAccessToken(); // ← esto debe ejecutarse en el click
  });
}

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1]);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });

const b64url = (s) =>
  btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');

export async function sendPdfWithToken(token, pdfBlob, toEmail) {
  const pdfB64 = await blobToBase64(pdfBlob);

  const boundary = 'b42', CRLF = '\r\n';
  const mime = [
    'From: "StarFactory" <marina92.rr@gmail.com>',
    `To: ${toEmail}`,
    'Subject: Ticket StarFactory',
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    'Adjunto tu ticket en PDF.',
    '',
    `--${boundary}`,
    'Content-Type: application/pdf; name="ticket.pdf"',
    'Content-Disposition: attachment; filename="ticket.pdf"',
    'Content-Transfer-Encoding: base64',
    '',
    pdfB64,
    `--${boundary}--`
  ].join(CRLF);

  const raw = b64url(mime);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw })
  });
  if (!res.ok) throw new Error(await res.text());
}
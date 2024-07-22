const API_URL = 'https://tinyurl.com/api-create.php?url=';

async function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const customShortCode = document.getElementById('customShortCode').value;

    if (!longUrl) {
        alert('Please enter a valid URL');
        return;
    }

    try {
        const response = await fetch(API_URL + encodeURIComponent(longUrl));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const shortUrl = await response.text();

        document.getElementById('shortUrl').href = shortUrl;
        document.getElementById('shortUrl').textContent = shortUrl;
        document.getElementById('clickCount').textContent = 'N/A';

        generateQRCode(shortUrl);

        document.getElementById('result').classList.remove('hidden');
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while shortening the URL. Please try again.');
    }
}

function generateQRCode(url) {
    const qrCodeElement = document.getElementById('qrCode');
    qrCodeElement.innerHTML = ''; // Clear previous QR code
    new QRCode(qrCodeElement, {
        text: url,
        width: 128,
        height: 128,
        colorDark: "#667eea",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Remove the click event listener as we can't track clicks with this public API
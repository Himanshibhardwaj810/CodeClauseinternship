const BASE_URL = 'https://example.com/'; // Replace with your actual base URL
let urlDatabase = {};

function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const customShortCode = document.getElementById('customShortCode').value;

    if (!longUrl) {
        alert('Please enter a valid URL');
        return;
    }

    let shortCode = customShortCode || generateShortCode();
    
    // Check if custom short code is already in use
    while (urlDatabase[shortCode]) {
        if (customShortCode) {
            alert('Custom short code already in use. Please choose another.');
            return;
        }
        shortCode = generateShortCode();
    }

    urlDatabase[shortCode] = {
        longUrl: longUrl,
        clicks: 0
    };

    const shortUrl = BASE_URL + shortCode;
    
    document.getElementById('shortUrl').href = shortUrl;
    document.getElementById('shortUrl').textContent = shortUrl;
    document.getElementById('clickCount').textContent = '0';
    
    generateQRCode(shortUrl);
    
    document.getElementById('result').classList.remove('hidden');
}

function generateShortCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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

// Simulate link clicking (in a real application, this would be handled by the backend)
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('shortUrl').addEventListener('click', function(e) {
        e.preventDefault();
        const shortCode = this.href.split('/').pop();
        if (urlDatabase[shortCode]) {
            urlDatabase[shortCode].clicks++;
            document.getElementById('clickCount').textContent = urlDatabase[shortCode].clicks;
            window.open(urlDatabase[shortCode].longUrl, '_blank');
        }
    });
});
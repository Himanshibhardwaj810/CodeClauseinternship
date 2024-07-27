const API_URL = 'https://tinyurl.com/api-create.php?url=';
let clickCount = 0;

async function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const customShortCode = document.getElementById('customShortCode').value;

    if (!longUrl) {
        alert('Please enter a valid URL');
        return;
    }

    if (isAlreadyShort(longUrl)) {
        alert('The entered URL is already short. Please enter a longer URL.');
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
        document.getElementById('clickCount').textContent = clickCount;

        generateQRCode(shortUrl);

        document.getElementById('result').classList.remove('hidden');
        
        // Add click event listener to the shortened URL
        document.getElementById('shortUrl').addEventListener('click', incrementClickCount);
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

function incrementClickCount() {
    clickCount++;
    document.getElementById('clickCount').textContent = clickCount;
}

function isAlreadyShort(url) {
    // Check if the URL is already short (you can adjust the threshold)
    return url.length < 30;
}
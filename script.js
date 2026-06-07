// State variables
let currentTheme = 'pink-green'; // Default theme

// Content Arrays
const journalingQuestions = [
    "What is a small detail about today that made you smile?",
    "If you could talk to your younger self, what would you say?",
    "Write about a dream or goal you haven't shared with anyone yet.",
    "List three things, however small, that you are grateful for right now.",
    "Describe what your perfect, peaceful day looks like.",
    "What is a heavy thought you need to let go of today?",
    "What are you looking forward to this week?"
];

const songRecommendations = [
    "🎵 'Fix You' by Coldplay - let it wash over you.",
    "🎵 'Let It Be' by The Beatles - take a slow, deep breath.",
    "🎵 'Breathe Me' by Sia - it's completely okay to feel sad.",
    "🎵 'Vienna' by Billy Joel - slow down, you're doing fine.",
    "🎵 'Rainbow' by Kacey Musgraves - the sky will clear soon.",
    "🎵 'Yellow' by Coldplay - look at the stars.",
    "🎵 'Landslide' by Fleetwood Mac - changes take time."
];

const sweetMessages = [
    "You are doing wonderfully today! 🌸",
    "I'm so proud of you for writing this down.",
    "Take a deep breath. You've got this.",
    "Your feelings are entirely valid.",
    "Every single day is a fresh start!",
    "You have a beautiful mind. Keep going.",
    "Sending you a warm hug! 🤗",
    "Don't forget to drink some water!"
];

// Utility function to get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to update the selected theme
function setTheme(theme) {
    currentTheme = theme;
    updateFlowerMessage();
}

// Function to create and add a new page to the DOM
function addPage() {
    const container = document.getElementById('journal-container');
    const page = document.createElement('div');
    page.className = `page theme-${currentTheme}`;
    
    let injectedHTML = '';

    // Handle template specific injections
    if (currentTheme === 'pink-green') {
        injectedHTML = `<div class="prompt-box"><strong>Journal Prompt:</strong><br>${getRandomItem(journalingQuestions)}</div>`;
    } else if (currentTheme === 'blue') {
        injectedHTML = `<div class="song-box">Song to ease your heart:<br>${getRandomItem(songRecommendations)}</div>`;
    } else if (currentTheme === 'yellow') {
        // Yellow theme gets the special SVG border div
        injectedHTML = `<div class="sunflower-border"></div>`;
    }

    // Combine injections with the writing area
    page.innerHTML = `
        ${injectedHTML}
        <textarea placeholder="Pour your heart out here..."></textarea>
    `;
    
    container.appendChild(page);
    
    // Scroll to the new page smoothly
    page.scrollIntoView({ behavior: 'smooth' });
    
    // Update the flower with a new message
    updateFlowerMessage();
}

// Function to update the talking flower pop-up
function updateFlowerMessage() {
    const msgDiv = document.getElementById('flower-message');
    msgDiv.innerText = getRandomItem(sweetMessages);
}

// Function to handle the PDF Generation
function downloadPDF() {
    // Hide UI elements that shouldn't be in the PDF
    const controls = document.getElementById('controls');
    const flower = document.getElementById('talking-flower');
    controls.style.display = 'none';
    flower.style.display = 'none';

    // Target the journal container
    const element = document.getElementById('journal-container');
    
    // Configure html2pdf settings
    const opt = {
        margin:       0,
        filename:     'my-protected-journal.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };

    // Remove page box-shadows temporarily so they look clean in the PDF
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.boxShadow = 'none');

    // Generate and save
    html2pdf().set(opt).from(element).save().then(() => {
        // Restore visibility and styling after download finishes
        controls.style.display = 'block';
        flower.style.display = 'flex';
        pages.forEach(p => p.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)');
    });
}

// Initialize the first page and flower message when the window loads
window.onload = () => {
    addPage();
    updateFlowerMessage();
}

// DOM Elements
const sourceText = document.getElementById('source-text');
const targetText = document.getElementById('target-text');
const sourceLang = document.getElementById('source-lang');
const targetLang = document.getElementById('target-lang');
const translateBtn = document.getElementById('translate-btn');
const speakSourceBtn = document.getElementById('speak-source');
const speakTargetBtn = document.getElementById('speak-target');
const clearBtn = document.getElementById('clear-btn');
const copyBtn = document.getElementById('copy-btn');

// TTS Controls
const rateSlider = document.getElementById('rate');
const pitchSlider = document.getElementById('pitch');
const volumeSlider = document.getElementById('volume');
const rateValue = document.getElementById('rate-value');
const pitchValue = document.getElementById('pitch-value');
const volumeValue = document.getElementById('volume-value');

// Voice selection
const voiceSelect = document.getElementById('voice-select');

// Audio player for OpenAI TTS
let currentAudio = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized - Using OpenAI API for translation and TTS');
});

// Update slider values display
rateSlider.addEventListener('input', (e) => {
    rateValue.textContent = e.target.value;
});

pitchSlider.addEventListener('input', (e) => {
    pitchValue.textContent = e.target.value;
});

volumeSlider.addEventListener('input', (e) => {
    volumeValue.textContent = e.target.value;
});

// Translation function using Cloudflare Function + OpenAI API
async function translateText(text, sourceLang, targetLang) {
    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                sourceLang,
                targetLang,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Translation failed');
        }

        const data = await response.json();
        return data.translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw error;
    }
}

// Translate button click handler
translateBtn.addEventListener('click', async () => {
    const text = sourceText.value.trim();

    if (!text) {
        alert('Please enter some text to translate');
        return;
    }

    const source = sourceLang.value;
    const target = targetLang.value;

    if (source === target) {
        alert('Source and target languages must be different');
        return;
    }

    // Show loading state
    translateBtn.classList.add('loading');
    translateBtn.disabled = true;
    translateBtn.innerHTML = '<span class="icon">⌛</span> Translating...';

    try {
        const translatedText = await translateText(text, source, target);
        targetText.value = translatedText;

        // Enable buttons
        speakTargetBtn.disabled = false;
        copyBtn.disabled = false;
    } catch (error) {
        alert('Translation failed: ' + error.message);
        targetText.value = '';
    } finally {
        // Reset button state
        translateBtn.classList.remove('loading');
        translateBtn.disabled = false;
        translateBtn.innerHTML = '<span class="icon">→</span> Translate';
    }
});

// Text-to-Speech function using OpenAI API
async function speak(text, button) {
    // Stop any ongoing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    if (!text.trim()) {
        alert('No text to speak');
        return;
    }

    // Get selected voice
    const voice = voiceSelect.value;
    const speed = parseFloat(rateSlider.value);

    // Show loading state
    const originalHTML = button.innerHTML;
    button.innerHTML = '<span class="icon">⌛</span> Loading...';
    button.disabled = true;

    try {
        const response = await fetch('/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                voice,
                speed,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'TTS generation failed');
        }

        // Get audio blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Create and play audio
        currentAudio = new Audio(audioUrl);
        currentAudio.volume = parseFloat(volumeSlider.value);

        currentAudio.onended = () => {
            button.innerHTML = originalHTML;
            button.disabled = false;
            URL.revokeObjectURL(audioUrl);
        };

        currentAudio.onerror = () => {
            button.innerHTML = originalHTML;
            button.disabled = false;
            URL.revokeObjectURL(audioUrl);
            alert('Failed to play audio');
        };

        // Play audio
        button.innerHTML = '<span class="icon">🔊</span> Playing...';
        await currentAudio.play();

    } catch (error) {
        console.error('TTS error:', error);
        alert('Text-to-speech failed: ' + error.message);
        button.innerHTML = originalHTML;
        button.disabled = false;
    }
}

// Speak source text
speakSourceBtn.addEventListener('click', () => {
    const text = sourceText.value.trim();
    speak(text, speakSourceBtn);
});

// Speak target text
speakTargetBtn.addEventListener('click', () => {
    const text = targetText.value.trim();
    speak(text, speakTargetBtn);
});

// Clear button
clearBtn.addEventListener('click', () => {
    sourceText.value = '';
    targetText.value = '';
    speakTargetBtn.disabled = true;
    copyBtn.disabled = true;

    // Stop any ongoing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
});

// Copy button
copyBtn.addEventListener('click', async () => {
    const text = targetText.value;

    try {
        await navigator.clipboard.writeText(text);

        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="icon">✓</span> Copied!';

        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    } catch (error) {
        console.error('Copy failed:', error);
        alert('Failed to copy text to clipboard');
    }
});

// Enable translate button on Enter key
sourceText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        translateBtn.click();
    }
});

// Auto-resize textareas
sourceText.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Volume control for audio playback
volumeSlider.addEventListener('input', (e) => {
    if (currentAudio) {
        currentAudio.volume = parseFloat(e.target.value);
    }
});

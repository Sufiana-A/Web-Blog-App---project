const contentField = document.getElementById('content');
const remainingChars = document.getElementById('remainingChars');
const maxChars = 1000;

contentField.addEventListener('input', () => {
    const charsUsed = contentField.value.length;
    remainingChars.textContent = maxChars - charsUsed;
});

function validateForm() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title.trim() === '' || content.trim() === '') {
        alert('Judul dan konten harus diisi.');
        return false;
    }

    return true;
}
function openNav() {
    document.getElementById("mySidenav").style.left = "0";
}

function closeNav() {
    document.getElementById("mySidenav").style.left = "-250px";
}

function scrollToInfo() {
    document.getElementById("features").scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('converter-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const formatSelect = document.getElementById('format-select');
    const resultMessage = document.getElementById('result-message');
    const downloadButton = document.getElementById('download-button');

    if (fileInput.files.length === 0) {
        resultMessage.innerText = 'Please select a file.';
        downloadButton.style.display = 'none';
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const selectedFormat = formatSelect.value;

    let isValid = false;
    switch (selectedFormat) {

        case 'mp4':
            isValid = fileExtension === 'mkv' || fileExtension === 'mov' || fileExtension === 'avi' || fileExtension === 'gif';
            break;
        case 'mov':
            isValid = fileExtension === 'mkv' || fileExtension === 'mp4' || fileExtension === 'avi';
            break;
        case 'avi':
            isValid = fileExtension === 'mp4' || fileExtension === 'mov';
            break;
        case 'gif':
            isValid = fileExtension === 'gif';
            break;

        case 'jpg':
            isValid = fileExtension === 'png' || fileExtension === 'webp';
            break;
        case 'png':
            isValid = fileExtension === 'jpg' || fileExtension === 'svg';
            break;
        case 'bmp':
            isValid = fileExtension === 'bmp';
            break;
        case 'svg':
            isValid = fileExtension === 'png';
            break;

        case 'wav':
            isValid = fileExtension === 'mp3';
            break;
        case 'mp3':
            isValid = fileExtension === 'wav' || fileExtension === 'flac';
            break;

        case 'doc':
            isValid = fileExtension === 'pdf';
            break;
        case 'pdf':
            isValid = fileExtension === 'doc' || fileExtension === 'txt' || fileExtension === 'epub';
            break;
        case 'txt':
            isValid = fileExtension === 'pdf';
            break;
        case 'xlsx':
            isValid = fileExtension === 'csv';
            break;
        case 'csv':
            isValid = fileExtension === 'xlsx';
            break;
        case 'ppt':
            isValid = fileExtension === 'pdf';
            break;

        case 'zip':
            isValid = fileExtension === 'rar';
            break;
        case 'rar':
            isValid = fileExtension === 'zip';
            break;

        case 'img':
            isValid = fileExtension === 'iso';
            break;
        case 'iso':
            isValid = fileExtension === 'img';
            break;

        default:
            isValid = false;
    }

    if (!isValid) {
        resultMessage.innerText = 'Invalid file type selected for this conversion.';
        downloadButton.style.display = 'none';
        return;
    }

    resultMessage.innerText = 'Preparing your file...';
    downloadButton.style.display = 'none';

    setTimeout(() => {
        const newFileName = `converted_file.${selectedFormat}`;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = newFileName;
        link.click();
        resultMessage.innerText = 'Your file has been converted!';
        downloadButton.style.display = 'block';

        setTimeout(() => URL.revokeObjectURL(link.href), 100);
    }, 3000);
});

function generateName() {
    const keyword = document.getElementById('keyword').value.trim();
    const words = [
        "Solutions", "Innovations", "Dreams", "Concepts", "Emporium", 
        "Creations", "Hub", "Nest", "Sphere", "Venture", 
        "Works", "Design", "Services", "Connection", "Point", 
        "Concept", "Group", "Collective", "Portal", "Idea", 
        "Factory", "Network", "Zone", "Realm", "Source", 
        "Insight", "Experience", "Vision", "Lab", "Engagement", 
        "Center", "Team", "Dynamics", "Pathways", "Minds", 
        "Strategies", "Labs", "Systems", "Prospects", "Grove", 
        "Principle", "Domain", "Bridge", "Codex", "Boutique"
    ];

    if (keyword === "") {
        document.getElementById('result').innerText = "Please enter a keyword.";
        return;
    }

    const firstPart = keyword.charAt(0).toUpperCase() + keyword.slice(1, Math.floor(keyword.length / 2));
    const lastPart = keyword.slice(Math.floor(keyword.length / 2)).toLowerCase();
    const generatedNames = [];

    const shuffledWords = words.sort(() => 0.5 - Math.random()).slice(0, 10);

    shuffledWords.forEach(word => {
        generatedNames.push(firstPart + word);
        generatedNames.push(keyword + word);
        generatedNames.push(word + lastPart);
    });

    const uniqueNames = Array.from(new Set(generatedNames)).slice(0, 10);

    document.getElementById('result').innerHTML = uniqueNames.map(name => `<div class="name">${name}</div>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generateButton');
    if (button) {
        button.addEventListener('click', generateName);
    }
});
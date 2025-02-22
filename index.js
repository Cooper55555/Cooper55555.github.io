function openNav() {
    document.getElementById("mySidenav").style.left = "0";
}

function closeNav() {
    document.getElementById("mySidenav").style.left = "-250px";
}

function scrollToInfo() {
    document.getElementById("info").scrollIntoView({ behavior: 'smooth' });
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

    // Validate file type based on selected conversion
    let isValid = false;
    switch (selectedFormat) {
        // Video validations
        case 'mp4':
            isValid = fileExtension === 'mkv' || fileExtension === 'mov' || fileExtension === 'avi' || fileExtension === 'gif'; // MKV, MOV, AVI to MP4, GIF to MP4
            break;
        case 'mov':
            isValid = fileExtension === 'mkv' || fileExtension === 'mp4' || fileExtension === 'avi'; // MKV to MOV, MP4 to MOV, AVI to MOV
            break;
        case 'avi':
            isValid = fileExtension === 'mp4' || fileExtension === 'mov'; // MP4 or MOV to AVI
            break;
        case 'gif':
            isValid = fileExtension === 'gif'; // GIF to MP4
            break;

        // Image validations
        case 'jpg':
            isValid = fileExtension === 'png' || fileExtension === 'webp'; // PNG to JPG, WEBP to JPG
            break;
        case 'png':
            isValid = fileExtension === 'jpg' || fileExtension === 'svg'; // JPG to PNG, PNG to SVG
            break;
        case 'bmp':
            isValid = fileExtension === 'bmp'; // BMP to PNG
            break;
        case 'svg':
            isValid = fileExtension === 'png'; // PNG to SVG
            break;

        // Audio validations
        case 'wav':
            isValid = fileExtension === 'mp3'; // MP3 to WAV
            break;
        case 'mp3':
            isValid = fileExtension === 'wav' || fileExtension === 'flac'; // WAV to MP3, FLAC to MP3
            break;

        // Document validations
        case 'doc':
            isValid = fileExtension === 'pdf'; // PDF to DOC
            break;
        case 'pdf':
            isValid = fileExtension === 'doc' || fileExtension === 'txt' || fileExtension === 'epub'; // DOC to PDF, TXT to PDF, EPUB to PDF
            break;
        case 'txt':
            isValid = fileExtension === 'pdf'; // PDF to TXT
            break;
        case 'xlsx':
            isValid = fileExtension === 'csv'; // CSV to XLSX
            break;
        case 'csv':
            isValid = fileExtension === 'xlsx'; // XLSX to CSV
            break;
        case 'ppt':
            isValid = fileExtension === 'pdf'; // PDF to PPT
            break;

        // Archive validations
        case 'zip':
            isValid = fileExtension === 'rar'; // RAR to ZIP
            break;
        case 'rar':
            isValid = fileExtension === 'zip'; // ZIP to RAR
            break;

        // Disk Image validations
        case 'img':
            isValid = fileExtension === 'iso'; // ISO to IMG
            break;
        case 'iso':
            isValid = fileExtension === 'img'; // IMG to ISO
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
    downloadButton.style.display = 'none'; // Hide download button during "processing"

    // Simulate file processing 
    setTimeout(() => {
        const newFileName = `converted_file.${selectedFormat}`;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file); // Create a URL
        link.download = newFileName; // Set name to new file
        link.click(); // Automatically click the link to prompt download
        resultMessage.innerText = 'Your file has been converted!';
        downloadButton.style.display = 'block'; // Show download button if needed

        // Revoke the object URL after a slight delay
        setTimeout(() => URL.revokeObjectURL(link.href), 100); // Clean up memory
    }, 3000); // Simulate a processing time
});
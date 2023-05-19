import fs from 'fs';
import path from 'path';

export default async (req, res) => {
  const { filename } = req.query;

  console.log("REACHING HERE")
  if (!filename) {
    res.status(400).send('Filename is required');
    return;
  }

  const filePath = path.join(process.cwd(), 'public', 'attachments', filename);

  if (!fs.existsSync(filePath)) {
    res.status(404).send('File not found');
    return;
  }

  const fileContent = fs.readFileSync(filePath);

  // Set the appropriate content type based on the file extension
  const contentType = getContentType(filename);
  res.setHeader('Content-Type', contentType);

  res.status(200).send(fileContent);
};

function getContentType(filename) {
    const extension = path.extname(filename).toLowerCase();
  
    switch (extension) {
      case '.html':
        return 'text/html';
      case '.css':
        return 'text/css';
      case '.js':
        return 'application/javascript';
      case '.json':
        return 'application/json';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.gif':
        return 'image/gif';
      case '.pdf':
        return 'application/pdf';
      case '.doc':
      case '.docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case '.xls':
      case '.xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case '.ppt':
      case '.pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      default:
        return 'application/octet-stream';
    }
  }
  

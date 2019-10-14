import defaultFileIcon from '../assets/icons/file.svg';
import aviIcon from '../assets/icons/avi.svg';
import cssIcon from '../assets/icons/css.svg';
import docIcon from '../assets/icons/doc.svg';
import exeIcon from '../assets/icons/exe.svg';
import htmlIcon from '../assets/icons/html.svg';
import jsIcon from '../assets/icons/javascript.svg';
import jpgIcon from '../assets/icons/jpg.svg';
import jsonIcon from '../assets/icons/json-file.svg';
import mp3Icon from '../assets/icons/mp3.svg';
import mp4Icon from '../assets/icons/mp4.svg';
import pdfIcon from '../assets/icons/pdf.svg';
import psdIcon from '../assets/icons/psd.svg';
import svgIcon from '../assets/icons/svg.svg';
import txtIcon from '../assets/icons/txt.svg';
import xlsIcon from '../assets/icons/xls.svg';
import xmlIcon from '../assets/icons/xml.svg';

export const validationFileSize = (file, size = 5 ) => file.size / 1024 / 1024 <= size;

export const cutFileName = (filename, length = 8 ) => {
    return filename.length > length ? `${filename.substr(0, length)}...` : filename;
};

export const getFileIcon = (mimeType) => {
    switch (mimeType) {
        case 'video/x-msvideo':
            return aviIcon;
        case 'text/css':
            return cssIcon;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
            return docIcon;
        case 'application/x-ms-dos-executable':
            return exeIcon;
        case 'text/html':
            return htmlIcon;
        case 'text/javascript':
            return jsIcon;
        case 'image/jpeg':
            return jpgIcon;
        case 'application/json':
            return jsonIcon;
        case 'audio/mp3':
            return mp3Icon;
        case 'audio/mp4':
            return mp4Icon;
        case 'application/pdf':
            return pdfIcon;
        case 'image/vnd.adobe.photoshop':
            return psdIcon;
        case 'image/svg':
        case 'image/svg+xml':
            return svgIcon;
        case 'text/plain':
            return txtIcon;
        case 'application/vnd.ms-excel':
            return xlsIcon;
        case 'text/xml':
            return xmlIcon;
        default:
            return defaultFileIcon;

    }
};

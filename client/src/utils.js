export function apirl (path) {
    if (window.location.hostname === "localhost") {
        return 'http://localhost:3001' + path;
    } else {
        return path;
    }
}
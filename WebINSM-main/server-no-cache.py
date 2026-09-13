from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from pathlib import Path


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    project_dir = Path(__file__).resolve().parent
    handler = partial(NoCacheHandler, directory=str(project_dir))
    server = ThreadingHTTPServer(("0.0.0.0", 8000), handler)
    print("Servidor sin cache en http://0.0.0.0:8000")
    server.serve_forever()

import http.server
import socketserver
import os

PORT = 5000
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        print(format % args)

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        elif self.path.endswith('/'):
            self.path += 'index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def run():
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Server stopped.")

if __name__ == "__main__":
    run()
#!/usr/bin/env python
import http.server
import socketserver
import os
import sys
import mimetypes

# Add support for some common file types
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("text/javascript", ".js")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/html", ".html")
mimetypes.add_type("text/markdown", ".md")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def log_message(self, format, *args):
        # Log to stdout
        print(format % args)
    
    def do_GET(self):
        # If the path is a directory, look for index.html
        if self.path.endswith('/'):
            if os.path.exists(os.path.join(os.getcwd(), self.path[1:], 'index.html')):
                self.path = os.path.join(self.path, 'index.html')
        
        # If the path doesn't have an extension, try .html
        if '.' not in os.path.basename(self.path):
            test_path = self.path + '.html'
            if os.path.exists(os.path.join(os.getcwd(), test_path[1:])):
                self.path = test_path
        
        # Handle pretty URLs (e.g., /about instead of /about.html)
        if not os.path.exists(os.path.join(os.getcwd(), self.path[1:])):
            # Try adding .html to the path
            test_path = self.path + '.html'
            if os.path.exists(os.path.join(os.getcwd(), test_path[1:])):
                self.path = test_path
        
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def run():
    PORT = 5000
    Handler.extensions_map = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.md': 'text/markdown',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '': 'application/octet-stream',
    }
    
    httpd = socketserver.TCPServer(("0.0.0.0", PORT), Handler)
    print(f"Serving at http://0.0.0.0:{PORT}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
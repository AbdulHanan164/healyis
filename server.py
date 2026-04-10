#!/usr/bin/env python3
"""
Healyis — Local Development Server
Run: python server.py
Then open: http://localhost:3000
"""

import http.server
import socketserver
import os
import webbrowser
import threading
import gzip
import io

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

COMPRESSIBLE = {'.html', '.css', '.js', '.json', '.svg', '.txt', '.xml'}

class HealyisHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Service-Worker-Allowed', '/')
        super().end_headers()

    def send_response_with_compression(self, path):
        """Serve file with gzip compression if client supports it."""
        accept_encoding = self.headers.get('Accept-Encoding', '')
        ext = os.path.splitext(path)[1].lower()
        if 'gzip' in accept_encoding and ext in COMPRESSIBLE:
            try:
                with open(path, 'rb') as f:
                    data = f.read()
                buf = io.BytesIO()
                with gzip.GzipFile(fileobj=buf, mode='wb', compresslevel=6) as gz:
                    gz.write(data)
                compressed = buf.getvalue()
                self.send_response(200)
                self.send_header('Content-Encoding', 'gzip')
                self.send_header('Content-Length', str(len(compressed)))
                self.end_headers()
                self.wfile.write(compressed)
                return True
            except Exception:
                pass
        return False

    def log_message(self, format, *args):
        print(f"  → {self.address_string()}  {format % args}")

def open_browser():
    import time
    time.sleep(0.8)
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    os.chdir(DIRECTORY)

    print()
    print("  Healyis Local Server")
    print(f"  http://localhost:{PORT}")
    print("  Press Ctrl+C to stop")
    print()

    threading.Thread(target=open_browser, daemon=True).start()

    # ThreadingTCPServer handles each request in its own thread —
    # critical for browsers that open 6+ parallel connections per page load.
    class ThreadedServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
        allow_reuse_address = True
        daemon_threads = True   # threads die when main thread exits

    with ThreadedServer(("", PORT), HealyisHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n  Healyis server stopped. Goodbye!\n")

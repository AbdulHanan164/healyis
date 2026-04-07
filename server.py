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

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class HealyisHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Allow local file access and set correct MIME types
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Clean, coloured-ish log output
        print(f"  → {self.address_string()}  {format % args}")

def open_browser():
    import time
    time.sleep(0.8)
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    os.chdir(DIRECTORY)

    print()
    print("  ╔══════════════════════════════════════════╗")
    print("  ║           Healyis Local Server           ║")
    print("  ╠══════════════════════════════════════════╣")
    print(f"  ║  🌐  http://localhost:{PORT}               ║")
    print(f"  ║  📂  Serving: {DIRECTORY[:28]}...  ║")
    print("  ║  🛑  Press Ctrl+C to stop               ║")
    print("  ╚══════════════════════════════════════════╝")
    print()

    threading.Thread(target=open_browser, daemon=True).start()

    with socketserver.TCPServer(("", PORT), HealyisHandler) as httpd:
        httpd.allow_reuse_address = True
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n  👋  Healyis server stopped. Goodbye!\n")

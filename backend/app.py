from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

CHECKLIST_FILE = os.path.join(os.path.dirname(__file__), 'checklist.json')

def read_checklist():
    if not os.path.exists(CHECKLIST_FILE):
        return []
    with open(CHECKLIST_FILE, 'r') as f:
        return json.load(f)

def write_checklist(data):
    with open(CHECKLIST_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/checklist', methods=['GET'])
def get_checklist():
    return jsonify(read_checklist())

@app.route('/checklist', methods=['POST'])
def update_checklist():
    data = request.json
    write_checklist(data)
    return jsonify({"status": "Checklist updated"})

if __name__ == '__main__':
    app.run(debug=True)
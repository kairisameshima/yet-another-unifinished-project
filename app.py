from flask import Flask, jsonify

from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)


@app.route('/api/chart-data', methods=['GET'])
def get_chart_data():
    # Example data to return (can be from a database or calculation)
    data = {
        'labels': [],
        'values': [],
    }
    for minute in range(0, 120):
        data['labels'].append(f'{minute}')
        data['values'].append(random.randint(2, 10))
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

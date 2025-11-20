from flask import Flask, render_template, jsonify
import csv
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/cards')
def get_cards():
    """API endpoint to get credit card data from CSV"""
    cards = []
    csv_file = 'card.csv'

    if os.path.exists(csv_file):
        try:
            with open(csv_file, 'r', encoding='utf-8') as file:
                csv_reader = csv.DictReader(file)
                for row in csv_reader:
                    cards.append(row)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify(cards)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

#!/bin/bash

# HDFC Credit Cards Frontend Runner
# This script starts the Flask web application

echo "========================================="
echo "  HDFC Credit Cards Frontend"
echo "========================================="
echo ""

# Check if Flask is installed
if ! python -c "import flask" 2>/dev/null; then
    echo "Error: Flask is not installed."
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

# Check if card.csv exists
if [ ! -f "card.csv" ]; then
    echo "Warning: card.csv not found!"
    echo "Please run the scraper first to generate credit card data."
    echo ""
fi

# Start the Flask application
echo "Starting Flask server..."
echo "The application will be available at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python app.py

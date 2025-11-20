@echo off
REM HDFC Credit Cards Frontend Runner
REM This script starts the Flask web application

echo =========================================
echo   HDFC Credit Cards Frontend
echo =========================================
echo.

REM Check if card.csv exists
if not exist "card.csv" (
    echo Warning: card.csv not found!
    echo Please run the scraper first to generate credit card data.
    echo.
)

REM Start the Flask application
echo Starting Flask server...
echo The application will be available at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py

pause

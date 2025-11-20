# Credit-card-scraping
# Assessment 1 Bayesian Technologies

Reference video: https://youtu.be/LfSsbJtby-M

## Project Overview

The task is given a website like that of HDFC bank (https://www.hdfcbank.com/personal/pay/cards/credit-cards), you have to scrape the details of their credit card products and return a CSV/Excel file with the following results [Card Name, Card fee, Reward points/percentage per 100 spent, Lounge access, Milestone benefit, Card fee reversal condition if any].

## Features

### 1. Web Scraper
- Scrapes credit card information from HDFC Bank website
- Extracts card details including fees, rewards, benefits, and lounge access
- Outputs data to CSV format

### 2. Modern Web Frontend
A beautiful, responsive web application to view and explore the scraped credit card data.

**Features:**
- Modern, professional UI with gradient design
- Real-time search across all card attributes
- Smart filtering (All Cards, Lounge Access, High Rewards)
- Detailed card view in modal popup
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions

## Quick Start

### Running the Frontend

**Option 1: Using the run script (Recommended)**

On Linux/Mac:
```bash
./run_frontend.sh
```

On Windows:
```bash
run_frontend.bat
```

**Option 2: Manual start**
```bash
python app.py
```

Then open your browser and navigate to: `http://localhost:5000`

### Running the Scraper

```bash
scrapy crawl creditCard
```

This will generate the `card.csv` file with the scraped data.

## Project Structure

```
Credit-card-scraping/
├── app.py                      # Flask web server
├── templates/
│   └── index.html             # Frontend HTML
├── static/
│   ├── css/
│   │   └── style.css          # Styling
│   └── js/
│       └── script.js          # Frontend logic
├── creditCard.py              # Scrapy spider
├── card.csv                   # Scraped data output
├── run_frontend.sh            # Linux/Mac run script
├── run_frontend.bat           # Windows run script
├── FRONTEND_README.md         # Detailed frontend documentation
└── README.md                  # This file
```

## Requirements

- Python 3.7+
- Dependencies listed in `requirements.txt`

Install with:
```bash
pip install -r requirements.txt
```

## Documentation

For detailed frontend documentation, see [FRONTEND_README.md](FRONTEND_README.md)

## Technologies Used

**Backend:**
- Python
- Scrapy (web scraping)
- Flask (web server)

**Frontend:**
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Font Awesome icons
- Google Fonts (Inter)

## Screenshots

The frontend features:
- Clean header with statistics
- Search bar with real-time filtering
- Category filter buttons
- Grid layout of credit cards
- Modal popup for detailed card information


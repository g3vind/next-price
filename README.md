# Next-Price

Next-Price is a product price tracker built using Next.js, Bright Data, Cheerio, Nodemailer, MongoDB, Headless UI, and Tailwind CSS. It allows users to track prices of products from different websites.

## Tech Stack

- Next.js
- Bright Data
- Cheerio
- Nodemailer
- MongoDB
- Headless UI
- Tailwind CSS

## Features

- **Header with Carousel**: Visually appealing header with a carousel showcasing key features and benefits.

- **Product Scraping**: A search bar allowing users to input Amazon product links for scraping.

- **Scraped Projects**: Displays the details of products scraped so far, offering insights into tracked items.

- **Scraped Product Details**: Showcase the product image, title, pricing, details, and other relevant information scraped from the original website.

- **Track Option**: Modal for users to provide email addresses and opt-in for tracking.

- **Email Notifications**: Send emails product alert emails for various scenarios, e.g., back in stock alerts or lowest price notifications.

- **Automated Cron Jobs**: Utilize cron jobs to automate periodic scraping, ensuring data is up-to-date.

## Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

1. Git
2. Node.js
3. npm (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/g3vind/next-price.git
cd next-price
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a new file named `.env.local` in the root of your project and add the following content:

```bash
# SCRAPER
BRIGHT_DATA_USERNAME=
BRIGHT_DATA_PASSWORD=

# DB
MONGODB_URI=

# OUTLOOK
EMAIL_USER=
EMAIL_PASS=
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on these specific websites from BrightData, MongoDB, and Node Mailer.

### Running the Project

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the project.


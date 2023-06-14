# Meta Leads Extractor

This repository contains a Node.js script to extract leads from a specified ad set on Meta (formerly Facebook). The script uses the Facebook Marketing API to fetch leads, allowing users to programmatically access their ad data.

## Features

- Extracts lead data from a specified ad set ID in Meta's ad platform.
- Uses the powerful Axios library to handle HTTP requests to Meta's API.
- Easy configuration through environment variables.
- An efficient and straightforward way to download and analyze your lead data.

## Usage

1. Clone the repository.

2. Install the dependencies with `npm install`.
3. Set up your index.js file with your Adset Id and Access Token.
4. Run the script with your ad set ID as a parameter: `node index.js `.

## Notes

- You need the appropriate access permissions on your Meta access token to run the script.
- Ad set IDs are specific to each individual ad set created on Meta's ad platform.
- The script requires Node.js to run. Ensure that you have a compatible version installed on your system.

The project serves as a starting point to automate the process of fetching lead data, which can be essential for businesses managing multiple ad campaigns on Meta's ad platform. Please feel free to contribute to this project or use it as a basis for more complex Meta data extraction tasks.

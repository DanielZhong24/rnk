#!/bin/bash

# fetch-repo-image.sh - Fetch GitHub repository image with explicit filename
# Usage: ./fetch-repo-image.sh <github-repo-url> <output-filename> [output-directory]

set -e

# Check parameters
if [ $# -lt 2 ] || [ $# -gt 3 ]; then
    echo "Usage: $0 <github-repo-url> <output-filename> [output-directory]"
    echo "Example: $0 https://github.com/TecharoHQ/anubis anubis ./static/projects"
    exit 1
fi

# Clean the URL by removing trailing slashes
REPO_URL="${1%/}"
OUTPUT_NAME="$2"

# Set output directory (default to current directory)
OUTPUT_DIR="${3:-.}"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo "Fetching image for: $OUTPUT_NAME"
echo "Repository: $REPO_URL"

# Make API request with all required headers
API_RESPONSE=$(curl -s --compressed 'https://lpf64gdwdb.execute-api.us-east-1.amazonaws.com/?repo='"$REPO_URL"'' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:143.0) Gecko/20100101 Firefox/143.0' \
  -H 'Accept: application/json, text/javascript, */*; q=0.01' \
  -H 'Accept-Language: en-CA,en-US;q=0.7,en;q=0.3' \
  -H 'Accept-Encoding: gzip, deflate, br, zstd' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'Origin: https://www.bannerbear.com' \
  -H 'Connection: keep-alive' \
  -H 'Referer: https://www.bannerbear.com/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Priority: u=0' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'TE: trailers')

# Extract the 3rd URL using sed by splitting elements on the "," delimiter
IMAGE_URL=$(echo "$API_RESPONSE" | sed -e 's/[[" ]//g' | awk -F',' '{print $3}')

# If sed/awk fails, let's try a last-resort extract for the first element just to get an image
if [ -z "$IMAGE_URL" ] || [ "$IMAGE_URL" = "null" ]; then
    IMAGE_URL=$(echo "$API_RESPONSE" | sed -e 's/[[" ]//g' | awk -F',' '{print $1}')
fi

if [ -z "$IMAGE_URL" ] || [ "$IMAGE_URL" = "null" ]; then
    echo "Error: Text-parsing fallback failed to extract URL."
    echo "Response preview: ${API_RESPONSE:0:120}..."
    exit 1
fi
# Download the image to output directory
echo "Downloading image as ${OUTPUT_DIR}/${OUTPUT_NAME}.jpg..."
if curl -s -o "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg" "$IMAGE_URL"; then
    echo "Successfully downloaded ${OUTPUT_DIR}/${OUTPUT_NAME}.jpg"
else
    echo "Error: Failed to download image"
    exit 1
fi

# Check if cwebp is available for conversion
if command -v cwebp &>/dev/null; then
    echo "Converting to WebP format..."
    if cwebp -q 50 "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg" -o "${OUTPUT_DIR}/${OUTPUT_NAME}.webp" &>/dev/null; then
        echo "Successfully converted to WebP"
        # Remove the JPG file after successful conversion
        rm -f "${OUTPUT_DIR}/${OUTPUT_NAME}.jpg"
        echo "Done! WebP file created: ${OUTPUT_DIR}/${OUTPUT_NAME}.webp"
    else
        echo "Warning: WebP conversion failed, keeping JPG file"
    fi
else
    echo "Warning: cwebp not installed. Install with: brew install webp"
    echo "Keeping JPG file: ${OUTPUT_DIR}/${OUTPUT_NAME}.jpg"
fi
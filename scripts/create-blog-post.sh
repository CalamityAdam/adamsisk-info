#!/bin/bash

# Script to create a new blog post with a given title

# Usage: ./create-blog-post.sh "Your Title Here"

# Check if a title is provided
if [ -z "$1" ]; then
  echo "Please provide a blog post title."
  exit 1
fi

# Replace spaces with dashes and convert to lowercase
title="$(echo $1 | sed -e 's/[^[:alnum:]]/-/g' -e 's/--*/-/g' | tr A-Z a-z)"

# Remove trailing dash
title=${title%-}

# Get the current date in YYYY-MM-DD format
date=$(date +%Y-%m-%d)

# Combine the date and title to form the filename
filename="${date}-${title}.md"

# Directory where the blog posts are stored
directory="./src/content/blogs"

# Create the directory if it does not exist
mkdir -p $directory

# Path for the new blog file
filepath="${directory}/${filename}"

# Create the new file with some default content
echo "title: $1" >> $filepath
echo "date: $date" >> $filepath
echo "author: Me" >> $filepath
echo "" >> $filepath
echo "# $1" >> $filepath
echo "" >> $filepath
echo "Your content here..." >> $filepath

echo "Blog post created at $filepath"

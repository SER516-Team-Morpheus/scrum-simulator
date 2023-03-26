# Scrum Simulator

This is a scrum simulator application based on React. We are Team Morpheus.

## Pre-requisites

Docker

node

<br/>

## Steps to run the application locally using Docker

Following are the steps to be followed

<br/>

### Step 1: Build image in your local

docker build -t < give image name ( any ) > .

Eg: docker build -t scrum-react .

<br/>

### Step 2: Check if image is created

docker images

<br/>

### Step 3: Run the image

docker run -p 3000:3000 -d < image name from step 1 >

Eg: docker run -p 3000:3000 -d scrum-react
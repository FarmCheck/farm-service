FROM node:14-alpine3.10

RUN apk add python make g++

# Create work directory
WORKDIR /app

# Copy app source to work directory
COPY . .
RUN yarn install

# Install app dependencies
EXPOSE 3000

# Build and run the app
CMD ["yarn", "start", "serve"]

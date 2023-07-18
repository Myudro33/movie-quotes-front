<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Movie Quotes Upgraded</h1>
</div>


With Movie Quotes, you can create an account and sign in to unlock a multitude of features. Share your favorite movies and their memorable quotes. The app keeps you connected and informed by providing instant notifications whenever someone likes or comments on your posts.
#
### Table of Contents
* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Development](#development)

#
### Prerequisites
* <img src="https://static-00.iconduck.com/assets.00/npm-icon-512x512-qtfdrf37.png" width="35" style="position: relative; top: 4px" /> *NPM x.7 and up*
#
### Tech Stack

* [VueJs@3.x](https://vuejs.org/guide/introduction.html) - front-end framework
* [Vee-validate@4.x](https://vee-validate.logaretm.com/v4/) - package for form validations
* [Tailwind CSS](https://tailwindcss.com) - CSS library
* [Pusher](https://pusher.com) - Real time notification package

#
### Getting Started
1\. First of all you need to clone >Movie Quotes Upgraded repository from github:
```sh
git clone https://github.com/RedberryInternship/nika-qanashvili-movie-quotes-front.git
```

2\. Next step requires you to run *npm install* in order to install all the dependencies.
```sh
npm install
```
3\. Now we need to set our env file. 
```sh
cp .env.example .env
```
And now you should provide .env file all the necessary environment variables:

#
**App urls:**
>VITE_API_BASE_URL=*****

>VITE_API_SANCTUM_URL=*****

>VITE_API_GMAIL_URL=****

>VITE_API_IMAGE_ENDPOINT=****


#
**Pusher:**
>VITE_PUSHER_KEY=*****

>VITE_PUSHER_CLUSTER=*****

>VITE_API_BACKEND_URL=****

>VITE_API_BACKEND_BROADCAST_URL=****

##### Now, you should be good to go!

#
### Development

You can run Vite built-in development server by executing:

```sh
  npm run dev
```
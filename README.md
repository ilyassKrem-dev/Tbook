
### About

Tbook is a social media website reminiscent of facebook built by next.js and laravel.


![Tbook][Tbook]


### Built With
* [![Next][Next.js]][Next-url]  [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCss]][TailwindCss-url]  [![Framer][Framer]][Framer-url]
* [![Laravel][Laravel]][Laravel-url]  [![PHP][PHP]][PHP-url]
* [![MySQL][MySQL]][MySQL-url]
* [![Socket.io][Socket.io]][Socket.io-url]

  
###  Features
- Simple design
- Responsive.
- Ai integration
- Real-time
- User Account System
- and more
  
### Start the website
1. Clone the repo
   ```sh
   gh repo clone ilyassKrem-dev/cut-app
   ```
## Front-End env file

  2. Add from [Uploadthing](https://uploadthing.com/)
      ```sh  
       UPLOADTHING_APP_ID=
       UPLOADTHING_SECRET=
     ```
  3. Add a  (OpenAI) url and (OPENAI_MODEL) and (OPEN_AI_KEY) 
      ```sh
      NEXT_PUBLIC_OPEN_AI_URL=
      NEXT_PUBLIC_OPEN_AI_KEY=
      NEXT_PUBLIC_OPENAI_MODEL=
     ```
  4. Add the url of the backend to 
      ```sh
       NEXT_PUBLIC_LARAVEL_REST_API=
     ```
  5. Add the url of the website to 
      ```sh
       NEXT_PUBLIC_SITE_URL=
     ```  
  # Next auth
    -Add a NEXTAUTH_URL= (Full Url of the site)
    -Add a NEXTAUTH_SECRET= (Custom created crypted code)

## Back-End env file

1. Change DB values in the laravel env file to mysql and your url
   ```sh
      DB_CONNECTION=mysql
      DB_HOST=(your db url)
      DB_PORT=(db port)
      DB_DATABASE=(Database name)
      DB_USERNAME=
      DB_PASSWORD=
    ```
## Finally
  Run
   ```sh
     cd tb-app
     npm install
     npm run dev
   ```
  And
   ```sh
     cd tb-app-server
     composer install
     php artisan key:generate
     php artisan migrate
     php artisan serve
   ```





<!-- MARKDOWN LINKS & IMAGES -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Framer]:https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue
[Framer-url]:https://www.framer.com/motion/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCss]:https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCss-url]:https://tailwindcss.com/
[Tbook]:https://www.dropbox.com/scl/fi/oqynrfgnck613qjkcs7g3/Tb-app.png?rlkey=wt5ryaaq0pypsw7rz7zzew09p&st=ifgyzler&raw=1
[Laravel]:https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]:https://laravel.com/
[PHP]:https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white
[PHP-url]:https://www.php.net/
[MySQL]:https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]:https://www.mysql.com/
[Socket.io]:https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101
[Socket.io-url]:https://socket.io/
[Redux]:https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]:https://redux.js.org/

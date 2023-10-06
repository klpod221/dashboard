# About

Hi, I'm [klpod221](https://klpod221.github.io). I'm a Full-Stack Web Developer from Việt Nam. This is my Expense Tracker project that I made for my portfolio and for personal use. I hope you enjoy it. You can find API for this project [here](https://github.com/klpod221/expense-tracker-api).

## Development

This project is built with [Vue.js](https://vuejs.org/) and [Tailwind CSS](https://tailwindcss.com/).

You can clone this project and run it on your local machine for development and testing purposes. I will not provide any support for this project. If you have any questions, please go to [my website](https://klpod221.github.io/contact) to contact me.

**Note:** Because I will deploy this project to [Github Page](https://pages.github.com/) with [Vite](https://vitejs.dev/), I have to define `base` in `vite.config.js` to `/expense-tracker/` and run [Vue Router](https://router.vuejs.org/) in [history mode](https://router.vuejs.org/guide/essentials/history-mode.html). If you want to run this project on your local machine, you have to change `base` to `/` and remove `history` in `vue-router` options in `main.js`.

```bash
# copy .env.example to .env and change the value to your own
cp .env.example .env

# install dependencies
npm install

# run development server
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

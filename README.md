This is a <b>didactic</b> [Next.js](https://nextjs.org/) project which provide access to YouTube videos sorted into a few categories. Eventually, the site allows visitors to create an account using magic link - a secure, seamless and scalable authentication and private key management solution. 

Once signed up you may watch videos from those categories, access the video page for more information, like or unlike it and see some statistics about the video. Every video you watch can be saved in your favourite list by clicking over like icon. 

Next.js pages uses SSR and preserve the state after page reload.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

In dev mode it uses mock data. Notice ```/data``` folder. This is done like this because of limitation of YouTube API requests per day.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/stats](http://localhost:3000/api/stats). This endpoint can be edited in `pages/api/stats.js`.

## Technologies
- [YouTube API](https://developers.google.com/youtube/v3/docs/videos) for retrieving videos by categories from YouTube and use them as content for the site.
- [Magic](https://magic.link) - user authentication and private key management solution for Web3 and Web2.
- [JWT web tokens](https://jwt.io) for decoding, verifying and generating JWT.
- [Hasura GraphQL](https://hasura.io) for database and quick access to GraphQL API.
- [ChakraUI](https://chakra-ui.com) for quick building of React components.

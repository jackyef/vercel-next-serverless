# Vercel Next.js + Serverless Example Project [![codecov](https://codecov.io/gh/jackyef/vercel-next-serverless/branch/master/graph/badge.svg?token=IHf0sLgLrh)](https://codecov.io/gh/jackyef/vercel-next-serverless)

Example PWA project leveraging Next.js for frontend, with vercel serverless function for APIs + free MongoDB Atlas cluster. The project uses:
1. [HipoLabs Universities List API](https://github.com/Hipo/university-domains-list)
2. [Google sign-in](https://console.developers.google.com/apis/credentials)
3. [Chakra UI](https://chakra-ui.com/)
4. [Next.js](https://nextjs.org/)
5. [Codecov](http://codecov.io/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. NodeJS >= 10 -- [Official download](https://nodejs.org/en/download/)
2. Yarn >= 1.16.0 -- [Official download](https://classic.yarnpkg.com/en/docs/install)

### Installing

1. Create an `.env` file based on the `.env.example` file
2. For `GOOGLE_OAUTH_ID` and `GOOGLE_OAUTH_SECRET`, follow [Google oAuth docs] to get your own Google oAuth AppId and secret.
    This is how the values look like:
    ```
    GOOGLE_OAUTH_SECRET=tfmG-_kIcxqn2drkMMSsdLH
    GOOGLE_OAUTH_ID=3459784788234-va9877zx89asd8as8d8asdg.apps.googleusercontent.com
    ```

3. For `JWT_SECRET` you can generate a random, secure string. This is used for signing JWT by `next-auth`
4. For `MONGO_CONNECTION_STRING`, you can get one from free using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    This is how the values look like:
    ```
    MONGO_CONNECTION_STRING=mongodb+srv://root:password@cluster0.d7sa9s.mongodb.net/dbname?retryWrites=true&w=majority
    ```
5. Install dependencies using yarn
    ```sh
    yarn install
    ```

6. Start development server
    ```sh
    yarn dev
    ```

## Running the tests

The tests are run using `jest`. Simply run `yarn test` to run the tests.

To get test coverage, run `yarn test:coverage`

## Deployment

There are many ways to deploy to `vercel` as documented in their [docs](https://vercel.com/docs/v2/platform/deployments)

Remember to populate the environment variables for your vercel deployment as well! Refer to the `.env.example` file for all keys and values.

# FireBlog Tutorial

This is a side project making using fireblog tutorial on youtube, there are some adjustment to make it compatible with new version

The project use Vuejs, Firebase and Docker

# References

https://www.youtube.com/watch?v=ISv22NNL-aE

# Deployment (Locally)

Make sure to have Docker install in your environment

Run `docker compose up -d` to deploy locally in `localhost:8080`

# Deployment (Firebase hosting)

Run `docker compose run app sh` to open project cmd
Run
`npm i -g firebase-tools`
`firebase init`
`firebase deploy --only-hosting`

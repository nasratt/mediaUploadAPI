# Media Upload API

This API can be used to upload media files (currently only images) to google cloud storage.

The body of request should be in `form-data` fromat and the field containing images shoud be named `imgs`.

To run this project you need to download or clone this repo, then run `npm install` command to install required packages. You also need to create a firebase project through [firebase console](https://console.firebase.google.com/) and then generate a new private key for your service account via the firebase project settings.

After you have downloaded your service account private key JSON file, copy it to the root directory of project and rename it to `gcpAuth.json`, also don't forget to add your bucket details to `.env` file as mentioned in `.env.sample` file.

Endpoints to this API is:

- POST `/images/upload`  
  Hitting this endpoint with image in `imgs` form field will upload it to your firebase storage.
- DELETE `/images/:name`  
  Hitting this endpoint with correct image name will delete it from your firebase storage.

API response has the following format:

```js
{
  "success": Boolean,
  "message": String
  "data": Array
}
```

**In case there is any error, the response will not contain data field.**

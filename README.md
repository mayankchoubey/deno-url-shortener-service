# A URL Shortener Service in Deno

This is a simple URL Shortener service written in Deno using different types of storage for demonstration.

There are different variants of this app depending on the storage type:

- [JSON file DB](app-json-db)
- [Mongo](app-mongo-db)
- [Postgres](app-postgres-db)
- [MySQL](app-mysql-db)

## Domain

The shortened domain defaults to localhost. To use a custom domain, set it in the config file as well as hosts file.

```
> cat /etc/hosts | grep 'de\.no'
127.0.0.1	de.no
```

## Running shortening service

To run this app locally:

- Clone the repo
- Change the folder according to the DB type
- Run the deno server application using `./runApp`
- Open `http://localhost:8000` in the browser

## Using shortened URLs

To use shortered URL:

- Open the shortened URL in a browser tab

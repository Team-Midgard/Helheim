# Earth

Welcome to the Earth project! This project provides a simple API for retrieving manga information.

## API Endpoints

### Manga

## **Endpoint**: `/all-manga`

- **Method**: `GET`
- **Description**: Retrieve a list of all manga. You can paginate the results using the `page` query parameter.
- **Example** :
`GET http://localhost:3000/all-manga`
`GET http://localhost:3000/all-manga?page=${number}`

## **Endpoint**: `/most-populars`

- **Method**: `GET`
- **Description**: Retrieve a list of all with most views manga.
- **Example** :
`GET http://localhost:3000/most-populars`

## **Endpoint**: `/search`

- **Method**: `GET`
- **Description**: Retrive your search manga list.
- **Example** :
`GET http://localhost:3000/search?p=${page}&q=${slug_serie}`

## **Endpoint**: `/manga`

- **Method**: `GET`
- **Description**: Retrive your manga with chapter.
- **Example** : Observer this is url link -> "jujutsu-kaisen>"
`GET http://localhost:3000/manga?q=${url_link}`

## **Endpoint**: `/images`

- **Method**: `GET`
- **Description**: Retrive all images from chapter
- **Example** : Observer this is url link -> "<mago-do-infinito/capitulo-82/>"
`GET http://localhost:3000/images?q=${url_link}`

### Users

## **Endpoint**: `/users`

- **Method**: `POST`
- **Description**: Create user
- **Example** : `
{
    "username": "novousuario",
    "email": "novoasf@exemplo.com",
    "password": "senha123"
}`
`GET http://localhost:3000/users`

## **Endpoint**: `/users/:id`

- **Method**: `DELETE`
- **Description**: Delete user
- **Example** :
`DELETE http://localhost:3000/users/:id`

## **Endpoint** : `/users/:id`

- **Method**: `PUT`
- **Description**: Update user
- **Example** : `
{
    "username": "novousuario",
    "email": "atualizado@exemplo.com",
    "password": "senha123"
}`
`PUT http://localhost:3000/users/:id`

## **Endpoint**: `/users/id/:id`

- **Method**: `GET`
- **Description**: Search user by id
- **Example** :
`GET http://localhost:3000/users/id/:id`

## **Endpoint**: `/users/email/:email`

- **Method**: `GET`
- **Description**: Search user by email
- **Example** :
`GET http://localhost:3000/users/email/:email`

## **Endpoint**: `/users/name/:username`

- **Method**: `GET`
- **Description**: Search user by name
- **Example** :
`GET http://localhost:3000/users/name/:username`

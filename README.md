# Earth

Welcome to the Earth project! This project provides a simple API for retrieving manga information.

## API Endpoints

### Manga

# **Endpoint**: `/all-manga`
- **Method**: `GET`
- **Description**: Retrieve a list of all manga. You can paginate the results using the `page` query parameter.
- **Example** :
`GET http://localhost:3000/all-manga`
`GET http://localhost:3000/all-manga?page=${number}`


# **Endpoint**: `/most-populars`
- **Method**: `GET`
- **Description**: Retrieve a list of all with most views manga.
- **Example** :
`GET http://localhost:3000/most-populars`

# **Endpoint**: `/search`
- **Method**: `GET`
- **Description**: Retrive your search manga list.
- **Example** :
`GET http://localhost:3000/search?p=${page}&q=${slug_serie}`

# **Endpoint**: `/manga`
- **Method**: `GET`
- **Description**: Retrive your manga with chapter.
- **Example** : Observer this is url link -> "https://lermangas.me/manga/jujutsu-kaisen/"
`GET http://localhost:3000/manga?q=${url_link}`

# **Endpoint**: `/images`
- **Method**: `GET`
- **Description**: Retrive all images from chapter
- **Example** : Observer this is url link -> "https://lermangas.me/manga/mago-do-infinito/capitulo-82/"
`GET http://localhost:3000/images?q=${url_link}`


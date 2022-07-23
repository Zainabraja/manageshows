# MANAGE-SHOWS

Manage-shows is a MERN stack application. Make a checklist of all the shows you've ever watched. 


## Prerequisites

You must have Docker Installed on your System !


## Getting Started

**Run Docker Desktop** (Very Important)

#### Clone the app:

```
git clone https://github.com/Zainabraja/manageshows.git
cd manageshows
```

#### Run the app using :

```
docker-compose up --build --remove-orphans
```

OR

```
docker-compose up -d
```

Above command will start the services on (-d) detach mode (similar like running the app in background)



#### Check all the images by running:

```
docker images
```


#### Check all the containers by running:

```
docker ps -a
```


#### The App should be running at : 

http://localhost:3000


#### To check the status of the running containers :

```
docker ps
```


#### To kill and remove the container run following command

```
docker-compose down
```

## Checklist

- [x] Add a new show with
  - **Title:** Name of the show
  - **Streaming App:** The platform you watched the show on
  - **Rating:** Rate the show (Star rating)
  - **Review:** Add your review of the show
- [x] Delete a show
- [x] Edit app/rating/review of the respective show
- [x] **JWT Token** is validated after user sign in
- [x] **ESLint** used alongwith **Prettier**
- [x] App is **Dockerised**
- [x] Instructions on how to run the service

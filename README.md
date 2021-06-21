# Shoe API
### Task list

- [x] create a server for the app
- [x] create a model (mongodb schema)
- [x] create routes file and views folder
- [x] create a public folder (css files)
- [x] create a github repository and deploy
- [x] deploy at heroku

![Shoe_API Imagae](https://github.com/Gideon877/shoes_api/blob/master/public/images/shoeapi.jpg?raw=true)
- List all shoes in stock
- List all shoes for a given brand
- List all shoes for a given size
- List all shoes for a given brand and size
- Update the stock levels when a shoe is sold
- Add a new new shoe to his stock.

## Getting Started

- Backend (Server side).

- Frontend (Client side).

Clone or download this [respository](https://github.com/Gideon877/shoes_api.git) to your machine from GitHub.

#### Cloning

- Go to the terminal and and copy and paste the following code;

  ```
     $ git clone https://github.com/Gideon877/shoes_api.git shoes_api
  ```

### Prerequisites

What things you need to install the software and how to install them?

- NodeJS
- MongoDB
- Package.json dependencies
- Mocha

### Installing;

#### NodeJS

Before you try to install NodeJS open a terminal window and try to run it by typing, node -v. If NodeJS is installed it should tell you which version you have. Alternatively the command will fail and you will need to install it.

To install it on Ubuntu you can use the [apt-get package manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions.md).

Alternatively you can use nvm, the [Node Version Manager](https://github.com/creationix/nvm#install-script.md) to manage the version of NodeJS on your PC.

#### Mongodb

How to [Install MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04.md) - only do Part 1.

#### Package.json dependencies

```json
"dependencies": {
    "body-parser": "^1.17.1",
    "cors": "^2.8.4",
    "del": "^3.0.0",
    "express": "^4.15.4",
    "express-flash": "0.0.2",
    "express-handlebars": "^3.0.0",
    "express-session": "^1.15.4",
    "lokijs": "^1.5.0",
    "mongoose": "^4.11.5",
    "multer": "^1.3.0"
},
"devDependencies": {
  "nodemon": "^1.11.0"
},
"engine": {
  "node": "v4.2.6"
}
```

To install all dependencies required for the app to run, on the terminal navigate to the shoes_api folder, and type `npm install` .

#### Mocha Setup

##### Install Mocha

First you need to install Mocha using this command:

```
$ sudo npm install -g mocha
```

## Running the tests
if you are using windows OS, first you need to get the mongodb server running.

In the CLI navigate to the shoes_api and run/type `$ mocha` and this will be your results;

```bash
modules should be able to
    ✓ store Shoes to MongoDB
    ✓ create a new Shoe
    ✓ rejects duplicate
    ✓ display all the stock from MongoDB
    ✓ find a selected brand
    ✓ find a selected size
    ✓ find selected brand and size
    ✓ remove sold-out shoe from the stock

  8 passing (247ms)
```

## Running the app locally

- In the command line, navigate to the shoes_api directory. Once you are in the appropriate directory input this command

`$ nodemon` or `$ node index.js`

- The following message should be displayed `Shoe API server started at http://localhost:4040`

- Then open a new tab on your browser and type this `http://localhost:4040/api/shoes` and the app will open.

## Deployment

The app is deployed at Heroku and gitHub. The app also use mLab database.

### Prerequisites

The best practices in this article assume that you have:

- Node.js and npm installed.
- an existing Node.js app.
- a free Heroku account.
- the Heroku CLI.

Then start your app locally using `heroku local` command which is installed as a part of the Heroku CLI.

`$ heroku local web` Your app should now be running on <http://localhost:5000/>.

The shoes api App is deployed on [Heroku](https://shoes-8.herokuapp.com)

###### To open the app locally;
  - first you need to navigate to your shoes_api directory on the terminal.
  - run the server using `$ heroku open` command.
  - navigate to your web browser and type <http://localhost:5000/> on the url input.

## Built With

- [MLAB](https://mlab.com) - Cloud MongoDB server
- [NPM](https://www.npmjs.com) - Dependency Management
- [Bootstrap](https://bootswatch.com/cerulean/) - The web framework used

## Versioning

`"version": "1.0.0",`

## Author

- **Thabang Gideon Magaola** - _Initial work_ - [Thabang Gideon](https://github.com/Gideon877)

## License

This project is licensed under the ISC License - see the [ISC-LICENSE.md](https://github.com/nevir/readable-licenses/blob/master/markdown/ISC-LICENSE.md) file for details `"license": "ISC"`

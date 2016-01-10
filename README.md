# ClassE
---

####*The classy way to plan your college courses.*

More description shall go here.

---

### For Developers - How to run

- Go ahead and install Node on your machine (npm should come with).
- Then clone the repository into a directory.
- Now open a terminal and run `npm install -g nodemon gulp http-server`. This will install those 3 packages globally on your machine.
- Now at the root directory of your repo, run `gulp`. This will build the app and get it ready for running.

Now, there are several parts of the app. Specific instructions to run each part are as follows:

#### Server

- Run `nodemon --watch "./src/server/" "./src/server/server.js"` at the root of your repo.
- Server should now be running at [http://localhost:3960](http://localhost:3960).
- The server is a REST api so you won't see a page or anything if you open it in browser.
- Use a REST client like [Postman](https://www.getpostman.com/) to test the endpoints.

#### Web Client

- Run `http-server -p 3970 ./src/public/` at the root of your repo.
- The client should now be running at [http://localhost:3970](http://localhost:3970).
- You can use any port you want, just provide it the to the `-p` flag of the `http-server` command.

#### Mobile Client

*Coming soon*

---
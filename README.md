# GameStore

Deployment: <a href="https://game-store-lemon-gamma.vercel.app" target="_blank" rel="noopener noreferrer">game-store-lemon-gamma.vercel.app</a>

Ready to use solution with deployed backend and frontend servers

---

## Development mode

You need to clone local backend server from here: <a href="https://github.com/vladinson009/express-server" target="_blank" rel="noopener noreferrer">express-server</a>

```
- install dependencies "npm i"
- run in dev mode "npm run dev"
```

To start a local development server for game-store Angular project, run:

```
- install dependencies "npm i"
- run in dev mode "npm run start"
```

Once the servers are running, open your browser and navigate to `http://localhost:4200/`.

# Instructions to use the app

## Guest users

### can:

- Home page => Game Store(top left) or Menu => Home
- Check all games without functionality => "Explore our store"(from Home page) or Menu => Games
  - Filter games in "Games" by title(Top on the page)
  - Use pagination for Games
- About us page => "About us"(from Home page) or Menu => About Us
- Details for game without functionality => Show {{name}}(from Home page) or Menu => Games => Details
- Login from Profile(Top right) => Login
- Register from Profile(Top right) => Register

## Authenticated users

### ready to use users

- username: vladimir ; password: 123456 (role admin);
- username: moderator ; password: 123456 (role moderator);
- username: gabriela ; password: 123456 (role user);

`every new registered user is role "user" and only admin can change roles`

### in additional to guest, role "user" can

- Create new game from Menu => Create Game
- Like/Unlike games from Menu => Games or from Details for each game
- If author:
  - Delete own game from Details => Delete
  - Edit own game from Details => Edit
- Private part to check own profile(username, email, role) and created games from Profile => Profile
- Logout from Profile => Logout

### in additional to user, role "moderator" can

- Manage categories(full CRUD) from Moderator Panel(Top right)
- Manage Platforms(full CRUD) from Moderator Panel(Top right)

### in additional to moderator, role "admin" can

- Manage roles between `user`, `moderator`, `admin` (Read, Update, Delete) from Admin Panel(Top right)

---

# Project defense requirements:

## Public Part

- Home Page
- Login
- Register
- Check games collection without functionality
- Check game details without functionality

## Private Part

- My Profile
- Manage roles
- Manage categories
- Manage platforms

## General requirements

### At least 3 dynamic pages:

- Home page
- Games
- My profile
- Details
- Manage roles
- Manage categories
- Manage platforms

### Must have specific views:

- list of all created records => `Games`, `Manage roles`, `Manage categories`, `Manage platforms`
- information about a specific record => `Details`, `My profile`

### At least one collection, different from the User collection, with all CRUD operations

- `Games` collection can Create, Read, Update, Delete,
- `Categories` collection can Create, Read, Update, Delete
- `Platforms` collection can Create, Read, Update, Delete

### Use Angular for cliend-side

### Communicate to a remote service via REST

- Deployed/Local express server using MongoDB database

### Implement authentication

- Login/Register user (Create session on the server)
- Logout user (invalidate session from the server)

### Client-side routing to at least 4 pages (at least 1 with parameters)

- /users
  - /login
  - /register
  - /profile
- /games
  - /
  - /create
  - /details/`:parameter`
  - /edit/`:parameter`
- /moderate
  - /change-roles
  - /change-categories
  - /change-platforms

### Meaningful commits on small steps at GitHub control system

---

## Other requirements

### Error handling

- showing error message on snackbar in case of invalid user credential
- showing error fields in case of invalid forms
- data validation before sending to the server
- show error field in form in case of server error

### The application should be divided into components

- Divided on components to make code readable and reusable
- Dummy commponents to reuse then in different parts of the app
- Smart components to make architecture more easy for development
- Use good folder structure to avoid technical debt when the project is growing

### Demonstrate use of the following programming concepts, specific to the Angular framework

- TypeScript specific types in separated folder avoiding "any"
- Many interfaces and Types
- Observables
- RxJS operators like `catchError`, `EMPTY`, `throwError`, `finalize`, `Observable`, `tap`, `debounceTime`
- Lifecycle hooks like `ngOnInit`, `ngOnDestroy`, `ngAfterViewInit`
- pipes like `tap`, `finalize`, `debounceTime`

### Route Guards for Private and Public users

- Guards for Guests only
- Guards for Users(non guests)
- Guards for Admin and Moderator only
- Guards for Admin only

### Good usability: GOOD UI and UX:

- Custom design (UI)
- Angular material design (UI)
- Loading spinners for server requests (UX)
- Using best practices (UX )

## Bonuses

- Using ImgBB file storage to store photos
- Deployment at <a href="https://game-store-lemon-gamma.vercel.app" target="_blank" rel="noopener noreferrer">game-store-lemon-gamma.vercel.app</a>
- Angular animations

Bonuses not described in the assignment but has practical use:

- Search bar in Games for better UX
- Pagination in Games

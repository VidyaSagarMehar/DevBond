# DevTInder APIs

### authRouter
- POST /signup
- POST /login
- POST /logout

### profileRoute
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

### connectionRequestRouter
- POST /request/send/:status/:userId //status can be ignored/intrested

- POST /request/review/:status/:requestId // status can be accepted\rejected

### userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profile of other users on platform


STATUS : ignore | intrested | accepted | rejected
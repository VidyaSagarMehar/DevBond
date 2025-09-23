# DevBond APIs

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


-Add pagination
- feed?page=1&Limit=10 => 1-10 => .skip(0) & .limit(10)
- feed?page=2&Limit=10 => 11-20 => .skip(10) & .limit(10)
- feed?page=3&Limit=10 => 21-30 => .skip(20) & .limit(10)
  skip formula -> (page - 1)*limit

STATUS : ignore | intrested | accepted | rejected
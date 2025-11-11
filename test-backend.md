# Backend Testing Guide

## Step 1: Start the Backend
```bash
npm run backend
```

You should see:
```
\{^_^}/ Hi!

  Loading db.json
  Done

  Resources
  http://localhost:8080/product
  http://localhost:8080/orderitem

  Home
  http://localhost:8080
```

## Step 2: Test the Endpoints

### Test 1: Check if orderitem endpoint works
Open in browser or use curl:
```
http://localhost:8080/api/orderitem
```

### Test 2: Check with query parameters
```
http://localhost:8080/api/orderitem?customerId=1&status=0
```

### Test 3: Direct endpoint (without route mapping)
```
http://localhost:8080/orderitem?customerId=1&status=0
```

## If you see 404 errors:

1. **Check if backend is running**: Look for the "Resources" list when you start `npm run backend`
2. **Check routes.json**: Make sure it has `/api/orderitem` mapped to `/orderitem`
3. **Check db.json**: Make sure it has an `orderitem` array

## Common Issues:

- **404 on `/api/orderitem`**: The routes.json might not be working. Try accessing `/orderitem` directly.
- **Empty array returned**: The query parameters might not be filtering correctly. Check if `customerId` and `status` fields exist in your items.

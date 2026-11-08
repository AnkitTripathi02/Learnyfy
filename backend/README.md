# Google Sign-In Setup

1. Create a Web application OAuth client in Google Cloud Console.
2. Add `http://localhost:5173` as an authorized JavaScript origin. Add the deployed frontend origin when deploying.
3. Copy the client ID into `frontend/.env` as `VITE_GOOGLE_CLIENT_ID` and `backend/.env` as `GOOGLE_CLIENT_ID`. Both values must match. Use `.env.example` in each folder as a template.
4. Install backend requirements with `pip install -r requirements.txt`, then restart the backend and Vite dev server.

The frontend obtains a Google OAuth access token and sends it to `POST /api/auth/google`. The backend checks the token audience with Google, fetches the verified user profile, and then issues a LearnyFy access token. No Google client secret is used by this popup-based flow.

## User roles

Password and Google signups create `student` accounts. The login response includes the account role, and the frontend uses it to open the student or admin panel. Do not accept a role from a public signup form.

To grant an existing account admin access, use a trusted database session and update that account explicitly:

```sql
UPDATE mst_users
SET role = 'admin'
WHERE email = 'admin@example.com';
```

Replace the example email with the intended account's email. To revoke admin access, set its role back to `student`.

## Razorpay payments

1. In the Razorpay Dashboard, create or select API keys for test mode or live mode.
2. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `backend/.env`. Use the matching key pair from the same mode; do not commit real keys.
3. Restart the backend after changing the environment file.

The frontend checkout uses the key ID returned by the backend. If the keys are missing, the order endpoint returns a configuration error. If Razorpay rejects the pair, verify the key ID and secret match and that the account is using the intended mode.

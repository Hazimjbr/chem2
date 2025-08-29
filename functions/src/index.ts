
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * Manages user roles and sessions.
 * Can grant admin roles or revoke user sessions.
 */
export const manageUser = functions.https.onCall(
  async (data, context) => {
    // Ensure the caller is an admin.
    if (context.auth?.token.admin !== true) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "This function can only be called by an admin.",
      );
    }

    const { action, email, uid } = data;

    if (action === 'grantAdmin') {
        if (typeof email !== "string" || email.length === 0) {
            throw new functions.https.HttpsError("invalid-argument", "Email is required to grant admin role.");
        }
        try {
            const user = await admin.auth().getUserByEmail(email);
            await admin.auth().setCustomUserClaims(user.uid, { admin: true });
            return {
                message: `Success! ${email} has been made an admin.`,
            };
        } catch (error) {
            console.error(error);
            throw new functions.https.HttpsError("internal", "An error occurred while trying to set admin claim.");
        }
    } else if (action === 'revokeSession') {
        if (typeof uid !== "string" || uid.length === 0) {
            throw new functions.https.HttpsError("invalid-argument", "User ID (uid) is required to revoke session.");
        }
        try {
            await admin.auth().revokeRefreshTokens(uid);
            // Get user record to confirm.
            const userRecord = await admin.auth().getUser(uid);
            const timestamp = new Date(userRecord.tokensValidAfterTime!).getTime() / 1000;
            console.log(`Tokens revoked for ${uid} at ${new Date(timestamp * 1000).toISOString()}`);
            return {
                message: `Successfully revoked sessions for user ${uid}.`,
            };
        } catch (error) {
             console.error("Error revoking tokens:", error);
             throw new functions.https://HttpsError("internal", "An error occurred while revoking tokens.");
        }
    } else {
        throw new functions.https.HttpsError("invalid-argument", "Invalid action specified.");
    }
  },
);

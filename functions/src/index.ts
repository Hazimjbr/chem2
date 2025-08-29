
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * Sets a custom user claim `admin` to true for a given user UID.
 * This function can only be called by an already authenticated user.
 * For production, you would add a check to ensure only admins can call this.
 */
export const addAdminRole = functions.https.onCall(async (data, context) => {
  // For security, you might want to check if context.auth.uid is an admin
  // before allowing them to make someone else an admin.
  // For now, we will keep it simple.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated.",
    );
  }

  const email = data.email;
  if (typeof email !== "string" || email.length === 0) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with a valid email in the data payload.",
    );
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, {admin: true});
    return {
      message: `Success! ${email} has been made an admin.`,
    };
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while trying to set admin claim.",
    );
  }
});

import { Magic } from "magic-sdk";

const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)
  );
};

export const magic = createMagic();

export const isLoggedIn = async () => {
  try {
    return await magic.user.isLoggedIn();
  } catch (err) {
    console.error(
      "Something went wrong while checking if user is logged!",
      err
    );
  }
};

export const getMetaData = async () => {
  try {
    const { email } = await magic.user.getMetadata();
    return email;
  } catch {
    console.error("Something went wrong during getting user!");
  }
};

export const logout = async () => {
  try {
    await magic.user.logout();
  } catch {
    console.error("Something went wrong during logout!");
  }
};

// // Construct with an API key and locale:
// m = new Magic("API_KEY", { locale: "es" });

// // Construct with an API key and testMode enabled:
// m = new Magic("API_KEY", { testMode: true });

// // Construct with an API key plus options:
// m = new Magic("API_KEY", { network: "rinkeby", endpoint: "..." });

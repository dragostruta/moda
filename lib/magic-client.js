import { Magic } from "magic-sdk";

export const magic = new Magic(
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY
);

// // Construct with an API key and locale:
// m = new Magic("API_KEY", { locale: "es" });

// // Construct with an API key and testMode enabled:
// m = new Magic("API_KEY", { testMode: true });

// // Construct with an API key plus options:
// m = new Magic("API_KEY", { network: "rinkeby", endpoint: "..." });

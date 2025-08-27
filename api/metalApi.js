import axios from "axios";

const API_KEY = "goldapi-fx3z8smesusui0-io"; // Replace with your actual API key

export const getMetalPrice = async (metal) => {
  const symbolMap = {
    gold: "XAU",
    silver: "XAG",
    platinum: "XPT",
    palladium: "XPD",
  };

  try {
    const res = await axios.get(
      `https://www.goldapi.io/api/${symbolMap[metal]}/INR`,
      {
        headers: {
          "x-access-token": API_KEY,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

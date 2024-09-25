import User from "../models/Usermodel.js";

export const searchContact = async (request, response) => {
  try {
    const { searchTerm } = request.body;

    if (!searchTerm) {
      return response.status(400).send("Search term is required");
    }

    const cleanSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regX = new RegExp(cleanSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: request.userId } },
        {
          $or: [{ firstName: regX }, { lastName: regX }, { email: regX }],
        },
      ],
    });

    response.status(200).json({ contacts });
  } catch (error) {
    console.error("Error during searchContact:", error);
    return response.status(500).send("Internal server error");
  }
};

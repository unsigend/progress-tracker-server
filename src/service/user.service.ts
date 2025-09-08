// import model
import UserModel from "@/models/user.model";

// import types
import { UserType } from "@root/shared/types";

// user service
const userService = {
    /**
     * Get a user by ID
     * @param id - the id of the user to get
     * @returns {UserType | null} the user document or null if not found
     */
    getUserById: async (id: string): Promise<UserType | null> => {
        const user = await UserModel.findById(id);
        return user as UserType | null;
    },

    /**
     * Get a user by email
     * @param email - the email of the user to get
     * @returns {UserType | null} the user document or null if not found
     */
    getUserByEmail: async (email: string): Promise<UserType | null> => {
        const user = await UserModel.findOne({ email: email });
        return user as UserType | null;
    },

    /**
     * Create a new user
     * @param user - the user to create
     * @returns {UserType} the created user document
     */
    createUser: async (user: UserType): Promise<UserType> => {
        const newUser = await UserModel.create(user);
        return newUser as unknown as UserType;
    },

    /**
     * Delete a user by ID
     * @param id - the id of the user to delete
     * @returns {UserType | null} the deleted user document or null if not found
     */
    deleteUserById: async (id: string): Promise<UserType | null> => {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return deletedUser as UserType | null;
    },

    /**
     * Update a user by ID
     * @param id - the id of the user to update
     * @param user - the user to update
     * @returns {UserType | null} the updated user document or null if not found
     */
    updateUserById: async (
        id: string,
        user: UserType
    ): Promise<UserType | null> => {
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                ...user,
                updatedAt: new Date(),
            },
            {
                new: true,
            }
        );
        return updatedUser as UserType | null;
    },
};

export default userService;

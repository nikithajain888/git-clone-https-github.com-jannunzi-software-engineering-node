

import User from "../models/User";

export default interface UserDaoI {
    /**
   * UserModel used to retrieve all user docs from users collection.
   * @returns Promise To be notified when users retrieved from
   * database.
   */
    findAllUsers (): Promise<User[]>;
    /**
   * Uses UserModel to retrieve single user doc from users collection.
   * @param {string} uid User's primary key
   * @returns Promise To be notified when user retrieved from database.
   */
    findUserById (uid: string): Promise<any>;
    /**
   * Add user instance to the database.
   * @param {User} user Instance to be inserted into the database.
   * @returns Promise To be notified when user is inserted into the database.
   */
    createUser (user: User): Promise<User>;
    /**
   * Updates user with new values in database.
   * @param {string} uid Primary key of user to be modified.
   * @param {User} user User object containing properties and their new values.
   * @returns Promise To be notified when user is updated in database.
   */
    updateUser (uid: string, user: User): Promise<any>;
    /**
   * Deletes user instance from database.
   * @param {string} uid User's primary key to be deleted.
   * @returns Promise To be notified when user is removed from database.
   */
    deleteUser (uid: string): Promise<any>;
    /**
   * Deletes all user instances from database.
   * @returns Promise To be notified when all users are removed from database.
   */
    deleteAllUsers (): Promise<any>;

     /**
   * Deletes all user instances with specific username from database.
   * @returns Promise To be notified when all users are removed from database.
   */
    deleteUsersByUsername(username:string) : Promise<any>;


    findUserByUsername(username:string) : Promise<any>;
};
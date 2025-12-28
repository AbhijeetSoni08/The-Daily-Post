import config from '../config/config.js';
import { Client, Account, ID } from "appwrite";

class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(name, email, password) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login(email, password);
            }
        } catch (error) {
            throw error;
        }
    }

    async verifyEmail(){
        // Await verification and handle errors
        try {
            const verification = await this.account.createVerification({
                url: 'http://localhost:5173/verify-email'
            });
            console.log(verification); // Success
        } catch (error) {
            console.log(error); // Failure
        }
    }

    async login(email, password){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            // ✅ FIX: Don't throw error here. 
            // If checking the user fails, it just means they are not logged in.
            console.log("Appwrite service :: getCurrentUser :: User is not logged in");
            return null;
        }
    }

     async logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            throw error;
        }
    }
}
const authService =  new AuthService();
export default authService;
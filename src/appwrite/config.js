import {Client, ID, TablesDB, Storage, Query} from 'appwrite';
import config from '../config/config.js';

class AppwriteService {
    client = new Client();
    tablesDB;
    storage;
    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }



    async createPost( {title, slug, content, publishedDate, featuredImage, status, authorID, category} ) {
        try {
            return await this.tablesDB.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId:  slug,
                data: {title, content, publishedDate, featuredImage, status, authorID, category}
            });
        } catch (error) {
            throw error;
        }
    }

    async updatePost( {title, slug, content, authorID, publishedDate, featuredImage, category}) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId:  slug,
                data: {title, content, authorID, publishedDate, featuredImage, category}
            });
        } catch (error) {
            throw error; 
        }
    }

    async deletePost(slug) {
        try {
            await this.tablesDB.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId:  slug,
            });
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId:  slug,
            })
        }catch (error) {
            throw error;
        }
    }

    async listPosts() {
        try {
            return await this.tablesDB.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                queries : [Query.equal('status', 'active')]
            });
        } catch (error) {
            console.log("AppwriteService :: listPosts :: error ", error);
            throw error;
        }
    }

    
    //Storage Service Methods


    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    } 

    async getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            throw error;
        }
    }

    //Subscriber Details

    async createSubscriber( {email, subscriptionDate = new Date(), isActive = true} ) {
        try {
            return await this.tablesDB.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteSubscriptionId,
                rowId:  ID.unique(),
                data: {email, subscriptionDate, isActive}
            });
        } catch (error) {
            throw error;
        }
    }

    //Email Message Service
    async sendEmail( {name, email, message} ) {
        try {
            return await this.tablesDB.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteEmailMessageId,
                rowId:  ID.unique(),
                data: {name, email, message}
            });
        } catch (error) {
            throw error;
        }
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;
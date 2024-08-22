import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
         try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
         }catch(err){
            console.log("Appwrite service :: createPost :: error",err);
         }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }catch(err){
            console.log("Appwrite service :: updatePost :: error",err);
        }
    }

    async deletePost(slug){
        try{
              await this.databases.deleteDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug // documentId
            );
            return true;
        }catch(err){
            console.log("Appwrite service :: deletePost :: error",err);
            return false;
        }
    }

    async getDocument(slug){
        try{
           return await this.databases.getDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug // documentId
            );
        }catch(err){
            console.log("Appwrite service :: listDocuments :: error",err);

        }
    }

    async listDocuments(slug){
        try{
            return await this.databases.listDocuments(
                 conf.appwriteDatabaseId, // databaseId
                 conf.appwriteCollectionId, // collectionId
                 slug, // documentId
                 [Query.equal("status", ["active"])]
             );
         }catch(err){
             console.log("Appwrite service :: listDocuments :: error",err);
 
         }
    }
    // file upload methods

    async uploadFile(file){
        try{
            return await this.storage.createFile(
                 conf.appwriteBucketId, 
                ID.unique(),
                file
             );
         }catch(err){
             console.log("Appwrite service :: uploadFile :: error",err);
            return false;
         }
    }
    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(
                 conf.appwriteBucketId, 
                fileId
               
             );
             return true;
         }catch(err){
             console.log("Appwrite service :: deleteFile :: error",err);
            return false;
         }
    }

    getFilePreview(fileId){
        try{
          return this.storage.getFilePreview(
                 conf.appwriteBucketId, 
                 fileId
               
             );
             
         }catch(err){
             console.log("Appwrite service :: getFilePreview :: error",err);
            
         }
    }
}


const configService = new Service();

export default configService;
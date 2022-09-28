const {MongoClient} = require('mongodb')
class Teacher
{
     url = "mongodb://localhost:27017"
     client = new MongoClient(this.url)
    database = this.client.db('Assignment_management_system')
    collection = this.database.collection('Teacher')
    

    signInCheck = async function(a){
    this.client.connect()
    this.collection = this.database.collection('Teacher')
    let pr=await this.collection.find({$and:JSON.parse(a)}).toArray()
    if(!pr.length)
        return 0
    else
        return 1
    }

    signUp = async function(a){
        this.client.connect()
        this.collection = this.database.collection('Teacher')
        await this.collection.insertOne(a)
    }
    insertAssignment = async function (a) {
        this.client.connect()
        this.collection = this.database.collection('Assignment')
        this.collection.insertOne(a)
    }
    findAssignment = async function(a) {
        this.client.connect()
        this.collection = this.database.collection('Assignment')
        let response = await this.collection.find(a).toArray()
        return response
    }
    StudentsignInCheck = async function(a)
    {
        this.client.connect()
        this.collection = await this.database.collection('Student')
        let response =await this.collection.find({$and:JSON.parse(a)}).toArray()
        return response
    }
    findStudentAssignment = async function(a) {
        this.client.connect()
        this.collection = this.database.collection('Assignment')
        let response =await this.collection.find(a).toArray()
        return response
    }
    deleteAssignment = async function (a) {
        this.client.connect()
        this.collection = await this.database.collection('Assignment')
        await this.collection.deleteOne(a)
    }
}
exports.Teacher=Teacher
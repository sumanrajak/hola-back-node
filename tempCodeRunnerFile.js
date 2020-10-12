const con_url='mongodb+srv://suman2:suman@cluster0.dd81x.mongodb.net/<holadb>?retryWrites=true&w=majority'
mongoose.connect(con_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log("db conected")
    
})

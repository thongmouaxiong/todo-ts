import mongoose, {ConnectOptions, Types} from 'mongoose'

const URL = process.env.DATABASE_URL

const options: ConnectOptions = {
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useNewUrlParser: true,
    // useUnifieldTopology:true
}
mongoose.connect(`${URL}`, 
options, 
(err)=>{
    if (err) throw(err)
    console.log('Connected database mongodb')
})


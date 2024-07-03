import mongoose from 'mongoose'

const MigrationSchema = new mongoose.Schema({
  name: String,
  timestamp: Date
})

export default mongoose.models.Migrations || mongoose.model('Migration', MigrationSchema)


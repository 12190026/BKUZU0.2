module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://Sonam:somdxd508@cluster0.qyy7opv.mongodb.net/B-KUZU?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "itssecret",
  JWT_EXP: process.env.JWT_EXPIRE || '10h',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@gmail.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin@123",
}

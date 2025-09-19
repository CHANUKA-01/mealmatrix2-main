const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Baked Goods & Pastries',
      'Breakfast & Brunch Items',
      'Sandwiches & Savory Meals',
      'Healthy & Dietary-Specific Options'
    ],
    default: 'Baked Goods & Pastries'
  },
  sellerId: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Export the model and the allowed categories for client usage
productSchema.statics.CATEGORIES = [
  'Baked Goods & Pastries',
  'Breakfast & Brunch Items',
  'Sandwiches & Savory Meals',
  'Healthy & Dietary-Specific Options'
];

module.exports = mongoose.model('Product', productSchema);
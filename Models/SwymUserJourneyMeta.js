const mongoose = require(`mongoose`);

// Subschema for 'rv' array elements
const rvItemSchema = new mongoose.Schema({
  fOId: { type: Number, required: false },
  variants: { type: String, required: false },
  fOTs: { type: Number, required: false },
  dt: { type: String, required: true }, // Product description
  cnt: { type: Number, required: true }, // Count
  empi: { type: Number, required: true },
  lvt: { type: Number, required: true }, // Last viewed timestamp
  du: { type: String, required: true }, // URL
  lOTs: { type: Number, required: false },
  epi: { type: Number, required: true },
  lOId: { type: Number, required: false },
  fOEpi: { type: Number, required: false },
  iu: { type: String, required: false }, // Image URL
  uri: { type: String, required: true }, // URI
  lOEpi: { type: Number, required: false },
  pr: { type: Number, required: true }, // Price
  ct: { type: String, required: false }  // Category type
});

// Subschema for 'sc' array elements
const scItemSchema = new mongoose.Schema({
  epi: { type: Number, required: true },
  empi: { type: Number, required: true },
  lit: { type: Number, required: true }, // Last interaction timestamp
  fOId: { type: Number, required: false },
  fOTs: { type: Number, required: false },
  lOTs: { type: Number, required: false },
  lOId: { type: Number, required: false },
  fOEpi: { type: Number, required: false },
  uri: { type: String, required: false }, // Product URI
  lOEpi: { type: Number, required: false }
});

// Main schema for 'SwymUserJourneyMeta'
const SwymUserJourneyMetaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  CreatedOnUtc: { type: Number, required: true },
  UpdatedOnUtc: { type: Number, required: true, index: true },
  pid: { type: String, required: true },
  rv: { type: [rvItemSchema], required: true }, // Array of 'rv' objects
  sc: { type: [scItemSchema], required: true }, // Array of 'sc' objects
  uid: { type: String, required: true },
  version: { type: Number, required: true }
}, {
  timestamps: { createdAt: 'CreatedOnUtc', updatedAt: 'UpdatedOnUtc' } // Mongoose timestamps
});

module.exports = {SwymUserJourneyMetaSchema}
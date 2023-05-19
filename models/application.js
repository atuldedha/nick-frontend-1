const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    year: {
        type: Number,
        min: 0,
        default: new Date(Date.now()).getFullYear()
    },
    walkers: {
        type: Number,
        min: 0,
        default: 0
    },
    cars: {
        type: Number,
        min: 0,
        default: 0
    },
    suvs: {
        type: Number,
        min: 0,
        default: 0
    },
    pickups: {
        quantity: {
            type: Number,
            min: 0,
            default: 0
        },
        brands: [{
            name: {
                type: String,
                required: function () {
                    return this.pickups;
                },
            }
        }]
    },
    trailer: {
        length: {
            type: Number,
            min: 0,
            max: 28,
            required: function () {
                return this.trailer && this.trailer.length > 0;
            }
        }
    },
    float: {
        length: {
            type: Number,
            min: 0,
            max: 28,
            required: function () {
                return this.float && this.float.length > 0;
            }
        },
        fireExtinguisher: {
            type: Boolean,
            default: false
        }
    },
    animals: {
        horses: {
            type: Number,
            min: 0,
            default: 0
        },
        dogs: {
            type: Number,
            min: 0,
            default: 0
        },
        others: {
            type: String,
            default: "",
        },
    },
    horseCertificateOfInsurance: {
        type: Boolean,
        default: false,
        required: function () {
            return this.animals && this.animals.horses;
        }
    },
    section: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "TO BE ACCEPTED",
    },
    group: {
        type: mongoose.Types.ObjectId,
        ref: "group"
    },
    rejectDate: {
        type: Date,
        default: null
    },
    acceptDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.models.application ||  mongoose.model('application', applicationSchema);

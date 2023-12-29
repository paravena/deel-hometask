"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = exports.Contract = exports.Profile = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
});
exports.sequelize = sequelize;
var Profile = /** @class */ (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Profile;
}(sequelize_1.Model));
exports.Profile = Profile;
Profile.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    profession: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2)
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('client', 'contractor')
    }
}, {
    sequelize: sequelize,
    modelName: 'Profile'
});
var Contract = /** @class */ (function (_super) {
    __extends(Contract, _super);
    function Contract() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Contract;
}(sequelize_1.Model));
exports.Contract = Contract;
Contract.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    terms: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('new', 'in_progress', 'terminated')
    }
}, {
    sequelize: sequelize,
    modelName: 'Contract'
});
var Job = /** @class */ (function (_super) {
    __extends(Job, _super);
    function Job() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Job;
}(sequelize_1.Model));
exports.Job = Job;
Job.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false
    },
    paid: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    paymentDate: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: sequelize,
    modelName: 'Job'
});
Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('equipments', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    DataProviderID: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    DataProvider: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    LocationTitle: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    AddressLine1: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    AddressLine2: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    Town: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    StateOrProvince: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    Postcode: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    Latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    ContactTelephone1: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ContactTelephone2: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ContactEmail: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    AccessComments: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    GeneralComments: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    RelatedURL: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    CountryID: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Country: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ISOCod: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    Usage: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    IsPayAtLocation: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    IsMembershipRequired: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    IsAccessKeyRequired: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    OperatorID: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    Operator: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    WebsiteURL: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    Comments: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    PhonePrimaryContact: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    PhoneSecondaryContact: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    IsPrivateIndividual: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    BookingURL: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    DataProviderURL: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    DataProviderComments: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    DataProvidersReference: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    OperatorsReference: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    NumberOfPoints: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    EquipmentGeneralComments: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    DatePlanned: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    DateLastConfirmed: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    DateLastStatusUpdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DataQualityLevel: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    DateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    SubmissionStatus: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    IsLive: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    EquipmentStatus: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    IsOperational: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    Connection1_Type: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    FormalName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Amps: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Voltage: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    PowerKW: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Quantity: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Expr1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    geom: {
      type: DataTypes.GEOMETRY('GEOMETRY', 0),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'equipments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "equipments_pkey",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
    ]
  });
};

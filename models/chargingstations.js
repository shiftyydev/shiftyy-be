module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chargingstations', {
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
      type: DataTypes.DOUBLE,
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
    Country: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ISOCode: {
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
      type: DataTypes.DOUBLE,
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
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DateLastStatusUpdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DataQualityLevel: {
      type: DataTypes.DOUBLE,
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
      type: DataTypes.DOUBLE,
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
    geom: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true
    },
    CompleteAddress: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chargingstations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chargingstations_geom_idx",
        fields: [
          { name: "geom" },
        ]
      },
      {
        name: "chargingstations_pkey",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
    ]
  });
};

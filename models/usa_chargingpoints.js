
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usa_chargingpoints', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    access_code: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    access_days_time: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    access_detail_code: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    cards_accepted: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    date_last_confirmed: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expected_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fuel_type_code: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    groups_with_access_code: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    id: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    open_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    owner_type_code: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    status_code: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    restricted_access: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    station_name: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    station_phone: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    facility_type: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    geocode_status: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    intersection_directions: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    plus4: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    street_address: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    bd_blends: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    cng_dispenser_num: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    cng_fill_type_code: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    cng_psi: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    cng_renewable_source: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    cng_total_compression: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    cng_total_storage: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    cng_vehicle_class: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    e85_blender_pump: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    e85_other_ethanol_blends: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ev_connector_types: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ev_dc_fast_num: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    ev_level1_evse_num: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    ev_level2_evse_num: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    ev_network: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ev_network_web: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ev_other_evse: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ev_pricing: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ev_renewable_source: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    hy_is_retail: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    hy_pressures: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    hy_standards: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    hy_status_link: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    lng_renewable_source: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    lng_vehicle_class: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    lpg_primary: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    lpg_nozzle_types: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ng_fill_type_code: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ng_psi: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ng_vehicle_class: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    access_days_time_fr: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    intersection_directions_fr: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    bd_blends_fr: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    groups_with_access_code_fr: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ev_pricing_fr: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    ev_network_ids: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    federal_agency: {
      type: DataTypes.STRING(254),
      allowNull: true
    },
    geom: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usa_chargingpoints',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usa_chargingpoints_geom_idx",
        fields: [
          { name: "geom" },
        ]
      },
      {
        name: "usa_chargingpoints_pkey",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
      
    ]
  });
};

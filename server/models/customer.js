module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'customer', 
        {
            customer_id: {
                type: DataTypes.STRING(50),
                allowNull: true,
                unique: true,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            last_name: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
        }
    )
};
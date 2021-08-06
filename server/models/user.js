module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'user', 
        {
            user_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            user_name: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            user_email: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            user_password: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            user_phone: {
                type: DataTypes.STRING(1000),
                allowNull: true
            },
            user_birthday: {
                type: DataTypes.STRING(1000),
                allowNull: true
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true,
        }
    )
};
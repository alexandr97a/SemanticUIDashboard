module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'table', 
        {
            table_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            table_title: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            table_autor: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            table_text: {
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
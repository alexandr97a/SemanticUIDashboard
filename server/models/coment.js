module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'coment', 
        {
            coment_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            coment_autor: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            coment_text: {
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
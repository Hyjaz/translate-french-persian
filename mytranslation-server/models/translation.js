export default (sequelize, DataTypes) => {
  const Translation = sequelize.define('Translation', {
    francais: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    perse: {
      type: DataTypes.STRING,
      allowNull: false,
    }},{
    indexes: [
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        unique: true,
        fields: ['francais', 'perse']
      }
    ]
  })
  return Translation;
};
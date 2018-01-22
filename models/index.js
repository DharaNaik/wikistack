const Sequelize = require('sequelize');
const { DATE, STRING, TEXT, ENUM, NOW } = Sequelize;
// var db = new Sequelize('postgres://localhost:5432/wikistack');

//disable logging
  var db = new Sequelize('postgres://localhost:5432/wikistack',{
    logging: false
});

const Page = db.define('page', {
    title: {
        type: STRING,
        allowNull: false
    },
    urlTitle : {
        type: STRING,
        allowNull: false
        //validate: {isUrl: true}
    },
    status: ENUM('closed', 'open'),
    content: {
        type: TEXT,
        allowNull: false
    },
    date: {
        type: DATE,
        defaultValue: NOW
   }
}, {
       getterMethods: {
                route: function(){
                    return '/wiki/' + this.urlTitle;
                }
            }
});

const User = db.define('user', {
    name: {type: STRING,
            allowNull: false},
    email : {type: STRING,
            allowNull: false,
            validate: {isEmail: true}
        }
  });

  module.exports = {db: db, User: User, Page: Page};

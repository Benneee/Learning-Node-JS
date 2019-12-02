var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;
var AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date }
});

//  Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  if (this.date_of_death && this.date_of_birth) {
    return (
      this.date_of_death.getYear() - this.date_of_birth.getYear()
    ).toString();
  } else {
    return '';
  }
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function() {
  return this.first_name + ', ' + this.family_name;
});

// Virtual for year of birth and death
AuthorSchema.virtual('dateofbirth').get(function() {
  return this.date_of_birth
    ? moment(this.date_of_birth).format('YYYY/MM/DD')
    : '';
});
AuthorSchema.virtual('dateofdeath').get(function() {
  return this.date_of_death
    ? moment(this.date_of_death).format('YYYY/MM/DD')
    : '';
});

//  Virtual for author's url
AuthorSchema.virtual('url').get(function() {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);

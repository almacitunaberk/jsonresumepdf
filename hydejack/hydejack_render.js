var fs = require("fs");
var path = require('path');
var Handlebars = require("handlebars");
var utils = require('jsonresume-themeutils');

var social = require('./social.json');
var countries = require('./countries.json');

utils.setConfig({
  date_format: 'MMM YYYY',
  gravatar: {
    s: '256',
    r: 'pg',
    d: 'mm'
  }
 });

Handlebars.registerHelper({
  switch: function(value, options) {
    this._switch_value_ = String(value).toLowerCase().replace(/\s/g,'');
    this._switch_break_ = false;
    var html = options.fn(this);
    delete this._switch_break_;
    delete this._switch_value_;
    return html;
  },
  case: function(value, options) {
    var args = Array.prototype.slice.call(arguments);
    var options    = args.pop();
    var caseValues = args;

    if (this._switch_break_ || caseValues.indexOf(this._switch_value_) === -1) {
      return '';
    } else {
      if (options.hash.break === true) {
        this._switch_break_ = true;
      }
      return options.fn(this);
    }
  },
  default: function(options) {
    if (!this._switch_break_) {
      return options.fn(this);
    }
  },
  lowerCase: function(s) {
    return String(s).toLowerCase();
  },
  stripWhiteSpace: function (s) {
    return s.replace(/\s/g, '');
  },
  formattedDate: function(d) {
    return utils.getFormattedDate(d);
  },
  urlForPicture: function(basics) {
    return utils.getUrlForPicture({ basics: basics })
  },
  socialIcon: function(network) {
    var nw = network.toLowerCase();
    return (social && social[nw] && social[nw].icon) || 'icon-link';
  },
  socialName: function(network) {
    var nw = network.toLowerCase();
    return (social && social[nw] && social[nw].name) || network;
  },
  countryName: function(code) {
    var cd = code.toUpperCase();
    var country = countries && countries.filter(function(c) { return c.code === cd })[0];
    return (country && country.name) || code;
  }
});

function render(resume) {
  var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
  var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
  var partialsDir = path.join(__dirname, 'partials');
  var filenames = fs.readdirSync(partialsDir);
  filenames.forEach(function (filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    var name = matches[1];
    var filepath = path.join(partialsDir, filename)
    var template = fs.readFileSync(filepath, 'utf8');

    Handlebars.registerPartial(name, template);
  });
  return Handlebars.compile(tpl)({
    css: css,
    resume: resume,
  });
}

module.exports = {
  render: render
};
